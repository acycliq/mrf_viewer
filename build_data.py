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
PCISEQ_RUNS = os.path.expanduser('~/pciseq_runs/aang')
MAPMYCELLS_RUNS = os.path.expanduser('~/dev/python/aang_mapmycells/runs')


def mapmycells_cell_data(folder):
    return os.path.join(MAPMYCELLS_RUNS, 'yao38', folder, 'cellData.tsv')


def pciseq_cell_data(beta):
    return os.path.join(PCISEQ_RUNS, 'mrf_beta_' + beta, 'pciSeq', 'data', 'tsv', 'cellData.tsv')


# The runs. id is also the folder of the run's pictures, images/<id>/. choices
# places the run in the picker: one row of buttons per control (CONTROLS), and a
# row shows only for the method whose runs have that control. pick says which
# class of a cell's ClassName list is the cell's class: pciSeq lists them in no
# set order, so it is the most likely one; MapMyCells puts the tool's own pick
# first, and its shares are along the path down the tree, so the biggest share
# is not always the pick. cell_filter leaves cells out, the same filters as
# aang_mapmycells/export_viewer.py so the counts match the pictures: corr<X> =
# only cells whose Corr in MapMyCells' cellData is above X (0 drops exactly the
# tool's default calls, 0.4 is the cut Allen's notebooks use), n<N> = only cells
# with at least N reads.
CONTROLS = ['Method', 'mrf_beta', 'Seed', 'Cells']
MRF_BETAS = ['0.0', '0.5', '1.0', '1.5']
# seed shown -> (run folder, id suffix); website is the seed and worker count the
# MapMyCells website uses (11235 and 32), on the same 38 classes
MAPMYCELLS_SEEDS = {'42': ('hard', ''), 'website': ('hard_seed11235_p32', '_seed11235')}
# cell filter -> the button's text
CELL_FILTERS = {None: 'all', 'n1': 'N ≥ 1', 'n3': 'N ≥ 3',
                'n5': 'N ≥ 5', 'n7': 'N ≥ 7', 'n10': 'N ≥ 10', 'corr0': 'corr > 0', 'corr0.4': 'corr > 0.4'}


def pciseq_run(beta):
    return {'id': 'mrf_beta_' + beta, 'label': 'pciSeq, mrf_beta ' + beta,
            'choices': {'Method': 'pciSeq', 'mrf_beta': beta},
            'cellData': pciseq_cell_data(beta), 'pick': 'most_likely'}


# markers -> the Method button. allen = Allen's marker list, panel = every panel gene at every
# step of the tree (aang_mapmycells/make_panel_markers.py), its runs are in hard_panel* folders
MAPMYCELLS_MARKERS = {'allen': 'MapMyCells, Allen markers', 'panel': 'MapMyCells, panel markers'}


def mapmycells_run(markers, seed, cell_filter):
    folder, suffix = MAPMYCELLS_SEEDS[seed]
    if markers == 'panel':
        folder = folder.replace('hard', 'hard_panel')
        suffix = '_panel' + suffix
    method = MAPMYCELLS_MARKERS[markers]
    cells = CELL_FILTERS[cell_filter]
    return {'id': 'mapmycells_yao38_hard' + suffix + ('_' + cell_filter if cell_filter else ''),
            'label': method + ', yao38 hard, ' + ('seed 42' if seed == '42' else 'website seed') +
                     ('' if cell_filter is None else ', ' + cells),
            'choices': {'Method': method, 'Seed': seed, 'Cells': cells},
            'cellData': mapmycells_cell_data(folder), 'pick': 'first', 'cell_filter': cell_filter}


RUNS = ([pciseq_run(beta) for beta in MRF_BETAS] +
        [mapmycells_run(markers, seed, cell_filter)
         for markers in MAPMYCELLS_MARKERS for cell_filter in CELL_FILTERS for seed in MAPMYCELLS_SEEDS])
RUN_IDS = [run['id'] for run in RUNS]


def check_every_combination():
    """Every mix of a method's buttons must be a run, or a click on the page finds none."""
    for method in {run['choices']['Method'] for run in RUNS}:
        runs = [run for run in RUNS if run['choices']['Method'] == method]
        controls = [control for control in CONTROLS if control in runs[0]['choices']]
        combinations = {tuple(run['choices'][control] for control in controls) for run in runs}
        expected = 1
        for control in controls:
            expected *= len({run['choices'][control] for run in runs})
        if len(combinations) != expected or len(runs) != expected:
            raise ValueError(f'{method}: {len(runs)} runs, but its buttons make {expected} combinations')
ALL_CLASSES_FILE = 'All_classes.webp'
# Two class pictures share the same DAPI background, so the pixels where they
# differ by more than this (summed over red, green and blue) are cells.
MIN_PIXEL_DIFFERENCE = 60
# The class list's name for the cells a filter left out (see unclassified_entry).
UNCLASSIFIED = 'Unclassified (filtered out)'
FALLBACK_COLOUR = '#000000'


def picture_name(class_name):
    """The file name the viewer's exporter gives a class (sanitiseFilename)."""
    cleaned = re.sub(r'[^a-zA-Z0-9._-]+', '_', class_name).strip('_')
    # the viewer exports .png, to_webp.py turns them into .webp
    return (cleaned or 'unknown') + '.webp'


def class_of_cell(row, pick):
    """The class a cell is counted under, by the run's pick rule (see RUNS)."""
    names = ast.literal_eval(row['ClassName'])
    if pick == 'first':
        return names[0]
    probabilities = ast.literal_eval(row['Prob'])
    return names[probabilities.index(max(probabilities))]


def keep_cell(row, cell_filter):
    """Whether a cell stays in the run, by its cell_filter (see RUNS)."""
    if cell_filter is None:
        return True
    if cell_filter.startswith('corr'):
        return float(row['Corr']) > float(cell_filter[len('corr'):])
    return sum(ast.literal_eval(row['CellGeneCount'])) >= int(cell_filter[1:])


def cells_per_class(run):
    """How many cells of the run each class has."""
    counts = Counter()
    csv.field_size_limit(sys.maxsize)
    with open(run['cellData'], newline='') as handle:
        for row in csv.DictReader(handle, delimiter='\t'):
            if not keep_cell(row, run.get('cell_filter')):
                continue
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


def unclassified_entry(counts, picture_path):
    """The cells a run's cell_filter left out, as one more row of the class list.

    The viewer draws a mask it has no cell row for as class Unknown, so a
    filtered run's export has Unknown.png with exactly these cells. The first
    run keeps every cell, the others are counted against it.
    """
    all_cells = sum(counts[RUN_IDS[0]].values())
    cells = {run_id: all_cells - sum(counts[run_id].values()) for run_id in RUN_IDS}
    file_name = picture_name('Unknown')
    # The colour comes off the first run that has the picture, against the
    # smallest class that run still has.
    colour_run = next(run_id for run_id in RUN_IDS if cells[run_id] > 0)
    present = [name for name, count in counts[colour_run].items() if count > 0]
    reference = picture_name(min(present, key=lambda name: counts[colour_run][name]))
    return {
        'name': UNCLASSIFIED,
        'file': file_name,
        'colour': colour_of_picture(picture_path(colour_run, file_name), picture_path(colour_run, reference)),
        'cells': cells,
        'hasPicture': {run_id: os.path.exists(picture_path(run_id, file_name)) for run_id in RUN_IDS},
    }


def main():
    check_every_combination()
    counts = {run['id']: cells_per_class(run) for run in RUNS}
    # Biggest class first in the first run; classes with the same count go by
    # name, so the order is the same every time the script runs.
    class_names = sorted(set().union(*counts.values()),
                         key=lambda name: (-counts[RUN_IDS[0]][name], name))

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
    classes.append(unclassified_entry(counts, picture_path))

    # Every picture has the same size; the page needs it to fit the picture to the window.
    picture_width, picture_height = Image.open(picture_path(RUN_IDS[0], ALL_CLASSES_FILE)).size

    data = {
        'controls': CONTROLS,
        'runs': [{'id': run['id'], 'label': run['label'], 'choices': run['choices']} for run in RUNS],
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
