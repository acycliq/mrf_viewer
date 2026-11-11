"""Build data.js for the run comparison viewer (index.html).

For every run it counts the cells of each class and notes which class pictures
exist, and it reads each class's colour off its picture. The result is
written as a JavaScript file, not JSON, so index.html can load it with a plain
<script> tag when opened straight from the disk.

Run it again whenever the pictures in images/ or the runs change:
    python3 build_data.py
"""
import ast
import csv
import json
import os
import re
import sys
from collections import Counter

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
PCISEQ_RUNS = os.path.dirname(HERE)               # ~/pciseq_runs/aang
MAPMYCELLS_RUNS = os.path.expanduser('~/dev/python/aang_mapmycells/runs')


def pciseq_cell_data(beta):
    return os.path.join(PCISEQ_RUNS, 'mrf_beta_' + beta, 'pciSeq', 'data', 'tsv', 'cellData.tsv')


# The runs, in the order the picker lists them. id is also the folder of the
# run's pictures, images/<id>/. pick says which class of a cell's ClassName list
# is the cell's class: pciSeq lists them in no set order, so it is the most
# likely one; MapMyCells puts the tool's own pick first, and its shares are
# along the path down the tree, so the biggest share is not always the pick.
RUNS = [
    {'id': 'mrf_beta_0.0', 'label': 'pciSeq, mrf_beta 0.0', 'cellData': pciseq_cell_data('0.0'), 'pick': 'most_likely'},
    {'id': 'mrf_beta_0.5', 'label': 'pciSeq, mrf_beta 0.5', 'cellData': pciseq_cell_data('0.5'), 'pick': 'most_likely'},
    {'id': 'mrf_beta_1.0', 'label': 'pciSeq, mrf_beta 1.0', 'cellData': pciseq_cell_data('1.0'), 'pick': 'most_likely'},
    {'id': 'mrf_beta_1.5', 'label': 'pciSeq, mrf_beta 1.5', 'cellData': pciseq_cell_data('1.5'), 'pick': 'most_likely'},
    {'id': 'mapmycells_yao38_hard', 'label': 'MapMyCells, yao38 hard',
     'cellData': os.path.join(MAPMYCELLS_RUNS, 'yao38', 'hard', 'cellData.tsv'), 'pick': 'first'},
]
RUN_IDS = [run['id'] for run in RUNS]
ALL_CLASSES_FILE = 'All_classes.png'
# Two class pictures share the same DAPI background, so the pixels where they
# differ by more than this (summed over red, green and blue) are cells.
MIN_PIXEL_DIFFERENCE = 60
FALLBACK_COLOUR = '#000000'


def picture_name(class_name):
    """The file name the viewer's exporter gives a class (sanitiseFilename)."""
    cleaned = re.sub(r'[^a-zA-Z0-9._-]+', '_', class_name).strip('_')
    return (cleaned or 'unknown') + '.png'


def class_of_cell(row, pick):
    """The class a cell is counted under, by the run's pick rule (see RUNS)."""
    names = ast.literal_eval(row['ClassName'])
    if pick == 'first':
        return names[0]
    probabilities = ast.literal_eval(row['Prob'])
    return names[probabilities.index(max(probabilities))]


def cells_per_class(run):
    """How many cells of the run each class has."""
    counts = Counter()
    csv.field_size_limit(sys.maxsize)
    with open(run['cellData'], newline='') as handle:
        for row in csv.DictReader(handle, delimiter='\t'):
            counts[class_of_cell(row, run['pick'])] += 1
    return counts


def load_pixels(path):
    return np.asarray(Image.open(path).convert('RGB')).astype(np.int16)


def colour_of_picture(path, reference_path):
    """The colour the class is drawn in.

    The picture is compared with the picture of a class that has very few cells:
    where the two differ, this class has a cell, and the most common colour
    there is the colour of the class. Going by colourfulness instead would miss
    the classes drawn in grey or black.
    """
    pixels = load_pixels(path)
    reference = load_pixels(reference_path)
    is_cell = np.abs(pixels - reference).sum(axis=2) > MIN_PIXEL_DIFFERENCE
    cell_pixels = pixels[is_cell]
    if len(cell_pixels) == 0:
        return FALLBACK_COLOUR
    values, occurrences = np.unique(cell_pixels, axis=0, return_counts=True)
    red, green, blue = values[occurrences.argmax()]
    return '#%02x%02x%02x' % (red, green, blue)


def main():
    counts = {run['id']: cells_per_class(run) for run in RUNS}
    class_names = sorted(set().union(*counts.values()),
                         key=lambda name: -counts[RUN_IDS[0]][name])

    def picture_path(run_id, file_name):
        return os.path.join(HERE, 'images', run_id, file_name)

    # The colours are read off the first run, where every class has a picture.
    # Each class is compared with the smallest class, and the smallest class
    # with the one before it.
    colour_run = RUN_IDS[0]
    smallest = picture_name(class_names[-1])
    second_smallest = picture_name(class_names[-2])

    classes = []
    for name in class_names:
        file_name = picture_name(name)
        reference = second_smallest if file_name == smallest else smallest
        classes.append({
            'name': name,
            'file': file_name,
            'colour': colour_of_picture(picture_path(colour_run, file_name),
                                        picture_path(colour_run, reference)),
            'cells': {run_id: counts[run_id][name] for run_id in RUN_IDS},
            'hasPicture': {run_id: os.path.exists(picture_path(run_id, file_name)) for run_id in RUN_IDS},
        })

    # Every picture has the same size; the page needs it to fit the picture to the window.
    picture_width, picture_height = Image.open(picture_path(RUN_IDS[0], ALL_CLASSES_FILE)).size

    data = {
        'runs': [{'id': run['id'], 'label': run['label']} for run in RUNS],
        'pictureSize': {'width': picture_width, 'height': picture_height},
        'allClassesFile': ALL_CLASSES_FILE,
        'totalCells': {run_id: sum(counts[run_id].values()) for run_id in RUN_IDS},
        'classes': classes,
    }
    with open(os.path.join(HERE, 'data.js'), 'w') as handle:
        handle.write('// Written by build_data.py. Do not edit by hand.\n')
        handle.write('window.BETA_VIEWER_DATA = ' + json.dumps(data, indent=1) + ';\n')

    for entry in classes:
        print('%-28s %s  %s' % (entry['name'], entry['colour'],
                                '  '.join('%6d' % entry['cells'][run_id] for run_id in RUN_IDS)))
    for run_id in RUN_IDS:
        mismatched = [c['name'] for c in classes if (c['cells'][run_id] > 0) != c['hasPicture'][run_id]]
        print('%s: %d cells, classes whose count and picture disagree: %s'
              % (run_id, data['totalCells'][run_id], mismatched or 'none'))


if __name__ == '__main__':
    main()
