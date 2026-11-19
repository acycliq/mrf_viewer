"""Build data.js for the run comparison viewer (index.html).

For every run it counts the cells of each class and notes which class pictures
exist, and it reads each class's colour off its picture. The result is
written as a JavaScript file, not JSON, so index.html can load it with a plain
<script> tag when opened straight from the disk.

The pictures are not in this repo. The page loads them from a public Google
Cloud bucket (PICTURE_BASE), where a run's pictures sit under the run's id.
This script reads the same pictures from the disk they were exported to, so
that disk has to be there when it runs. To put new pictures in the bucket:
    gcloud storage rsync -r <dataset>/class_pictures gs://mrf_viewer/<dataset>/pciseq

Run it again whenever the pictures or the runs change:
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
# where the page gets the pictures from: PICTURE_BASE/<run id>/<class>.webp
PICTURE_BASE = 'https://storage.googleapis.com/mrf_viewer'
# the pciSeq runs and their pictures, one folder per data set
PCISEQ_RUNS = '/run/media/dimitris/Sabrent4TB/users/Izzie/pciseq_runs'
DATASETS = ['aang', 'katara', 'sokka', 'toph']
# MapMyCells, redone 19 Nov 2026 for the four data sets (aang_mapmycells/map_dataset.py),
# mapped from the pciSeq run Inefficiency 0.1, mrf_beta 0.0, on the 38 classes, once with
# Allen's marker list and once with every panel gene as a marker. Per data set and marker
# list the cellData.tsv is in MAPMYCELLS/<dataset>/<markers>/ and the pictures in
# MAPMYCELLS/<dataset>/class_pictures/<markers>/<filter>/, one folder per cell filter
# ('all' for no filter, then 'n1', 'corr0', ...). In the bucket they go under
# <dataset>/mapmycells/<markers>/<filter>/:
#     gcloud storage rsync -r <dataset>/class_pictures gs://mrf_viewer/<dataset>/mapmycells
MAPMYCELLS = '/run/media/dimitris/Sabrent4TB/users/Izzie/MapMyCells'
# Region and layer boundaries drawn by hand in pciSeq Viewer and saved from there as
# geojson, in the image's pixels. image is the size of the whole image in pixels
# (width, height), the masks are (planes, height, width): the pictures cover exactly
# that, so the page can lay the outlines over them. A data set not in here has no
# Regions row on the page.
REGIONS = {
    'aang': {'geojson': os.path.join(HERE, 'regions', 'aang.geojson'), 'image': (6432, 8545)},
}
MARKERS = ['allen', 'panel']
MARKER_NAMES = {'allen': 'Allen', 'panel': 'panel'}


def pciseq_folder(inefficiency, beta):
    return os.path.join('inefficiency_' + inefficiency, 'mrf_beta_' + beta)


# The runs. id is also the folder of the run's pictures in the bucket. choices
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
CONTROLS = ['Dataset', 'Method', 'Inefficiency', 'mrf_beta', 'Markers', 'Filter']
INEFFICIENCIES = ['0.1', '0.5']
MRF_BETAS = ['0.0', '0.5', '1.0', '1.5']
# Drawn as a slider instead of radio buttons: a whole control (mrf_beta) or one group of the
# Filter row (reads, corr). The rest are radio buttons.
SLIDERS = ['mrf_beta', 'reads ≥', 'corr >']
# MapMyCells is the run with the seed and worker count its website uses (11235 and 32), on
# the same 38 classes. Seed 42 was on the page until 12 Nov 2026 with a Seed row of buttons;
# taken off to keep it simple, the seed barely changes the totals and the agreement with pciSeq
# (aang_mapmycells/sweep.py).
# cell filter -> its option in the Filter row: value names the run's choice (and goes in its
# label), group is the short name in front of the options of the same kind, text is what the
# option shows. Only one option of the row is picked at a time, the groups only sort them.
# No filter is reads >= 0, the left end of the reads slider (SLIDERS).
READ_CUTS = [1, 3, 5, 7, 10]
CORR_CUTS = ['0', '0.4']
CELL_FILTERS = {None: {'value': 'none', 'group': 'reads ≥', 'text': '0'}}
for n in READ_CUTS:
    CELL_FILTERS[f'n{n}'] = {'value': f'reads ≥ {n}', 'group': 'reads ≥', 'text': str(n)}
for cut in CORR_CUTS:
    CELL_FILTERS['corr' + cut] = {'value': f'corr > {cut}', 'group': 'corr >', 'text': cut}


def filter_title(cell_filter):
    """The tooltip of a Filter button, in plain words.

    How many cells a filter leaves out differs per data set, so it is not in
    here; the last row of the class list shows it for the run picked.
    """
    if cell_filter is None:
        return 'every cell, none left out'
    if cell_filter.startswith('n'):
        n = int(cell_filter[1:])
        return f'only cells with at least {n} read' + ('' if n == 1 else 's')
    if cell_filter == 'corr0':
        return 'only cells MapMyCells could match, correlation above 0; the others got its default call'
    return f'only cells MapMyCells matched well, correlation above {cell_filter[4:]}, the cut Allen uses'


def pciseq_run(dataset, inefficiency, beta):
    folder = pciseq_folder(inefficiency, beta)
    return {'id': f'{dataset}/pciseq/{folder}', 'dataset': dataset,
            'label': f'{dataset}, pciSeq, Inefficiency {inefficiency}, mrf_beta {beta}',
            'choices': {'Dataset': dataset, 'Method': 'pciSeq', 'Inefficiency': inefficiency, 'mrf_beta': beta},
            'cellData': os.path.join(PCISEQ_RUNS, dataset, folder, 'pciSeq', 'data', 'tsv', 'cellData.tsv'),
            'pictures': os.path.join(PCISEQ_RUNS, dataset, 'class_pictures', folder),
            'pick': 'most_likely'}


def mapmycells_run(dataset, markers, cell_filter):
    """MapMyCells with one marker list (MARKERS) and one cell filter."""
    folder = cell_filter or 'all'
    value = CELL_FILTERS[cell_filter]['value']
    return {'id': f'{dataset}/mapmycells/{markers}/{folder}', 'dataset': dataset,
            'label': f'{dataset}, MapMyCells, {MARKER_NAMES[markers]} markers' +
                     ('' if cell_filter is None else ', ' + value),
            'choices': {'Dataset': dataset, 'Method': 'MapMyCells', 'Markers': MARKER_NAMES[markers],
                        'Filter': value},
            'cellData': os.path.join(MAPMYCELLS, dataset, markers, 'cellData.tsv'),
            'pictures': os.path.join(MAPMYCELLS, dataset, 'class_pictures', markers, folder),
            'pick': 'first', 'cell_filter': cell_filter}


# Per data set: the pciSeq runs, then MapMyCells. The first run of a data set
# keeps every cell; the filtered runs are counted against it.
RUNS = []
for dataset in DATASETS:
    RUNS += [pciseq_run(dataset, inefficiency, beta) for inefficiency in INEFFICIENCIES for beta in MRF_BETAS]
    RUNS += [mapmycells_run(dataset, markers, cell_filter) for markers in MARKERS for cell_filter in CELL_FILTERS]
RUN_IDS = [run['id'] for run in RUNS]


def check_every_combination():
    """Within a data set, every mix of a method's buttons must be a run.

    A data set may lack a method (no MapMyCells yet); the page then moves to
    the nearest run it does have. A hole inside a method would be a mistake here.
    """
    for dataset, method in {(run['dataset'], run['choices']['Method']) for run in RUNS}:
        runs = [run for run in RUNS if run['dataset'] == dataset and run['choices']['Method'] == method]
        controls = [control for control in CONTROLS if control in runs[0]['choices']]
        combinations = {tuple(run['choices'][control] for control in controls) for run in runs}
        expected = 1
        for control in controls:
            expected *= len({run['choices'][control] for run in runs})
        if len(combinations) != expected or len(runs) != expected:
            raise ValueError(f'{dataset}, {method}: {len(runs)} runs, but its buttons make {expected} combinations')
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


def filter_buttons():
    """Group, text and tooltip of each Filter button, keyed by the run's choice."""
    buttons = {}
    for run in RUNS:
        if 'Filter' not in run['choices']:
            continue
        cell_filter = run['cell_filter']
        button = dict(CELL_FILTERS[cell_filter])
        button['title'] = filter_title(cell_filter)
        buttons[button.pop('value')] = button
    return buttons


def unclassified_entry(counts, picture_path):
    """The cells a run's cell_filter left out, as one more row of the class list.

    The viewer draws a mask it has no cell row for as class Unknown, so a
    filtered run's export has Unknown.png with exactly these cells. The first
    run of a data set keeps every cell, its other runs are counted against it.
    Returns None when no run leaves a cell out, so the row is not shown.
    """
    all_cells = {}
    for run in RUNS:
        all_cells.setdefault(run['dataset'], sum(counts[run['id']].values()))
    cells = {run['id']: all_cells[run['dataset']] - sum(counts[run['id']].values()) for run in RUNS}
    file_name = picture_name('Unknown')
    # The colour comes off the first run that has the picture, against the
    # smallest class that run still has.
    colour_run = next((run for run in RUNS if cells[run['id']] > 0), None)
    if colour_run is None:
        return None
    present = [name for name, count in counts[colour_run['id']].items() if count > 0]
    reference = picture_name(min(present, key=lambda name: counts[colour_run['id']][name]))
    return {
        'name': UNCLASSIFIED,
        # not a class: the page keeps it at the end of the list whatever its count
        'keepLast': True,
        'file': file_name,
        'colour': colour_of_picture(picture_path(colour_run, file_name), picture_path(colour_run, reference)),
        'cells': cells,
        'hasPicture': {run['id']: os.path.exists(picture_path(run, file_name)) for run in RUNS},
    }


def regions_of(dataset):
    """The outlines of a data set's regions: each region's name and the points of
    its outer ring. A region in two pieces (DG) is two entries with the same name."""
    with open(REGIONS[dataset]['geojson']) as handle:
        features = json.load(handle)['features']
    regions = []
    for feature in features:
        geometry = feature['geometry']
        polygons = [geometry['coordinates']] if geometry['type'] == 'Polygon' else geometry['coordinates']
        for polygon in polygons:
            points = [[round(x, 1), round(y, 1)] for x, y in polygon[0]]
            regions.append({'name': feature['properties']['name'], 'points': points})
    width, height = REGIONS[dataset]['image']
    return {'width': width, 'height': height, 'regions': regions}


def main():
    check_every_combination()
    counts = {run['id']: cells_per_class(run) for run in RUNS}
    # Biggest class first in the first run; classes with the same count go by
    # name, so the order is the same every time the script runs.
    class_names = sorted(set().union(*counts.values()),
                         key=lambda name: (-counts[RUN_IDS[0]][name], name))

    def picture_path(run, file_name):
        return os.path.join(run['pictures'], file_name)

    # The colours are read off the first run, where every class has a picture.
    # Each class is compared with the smallest class, and the smallest class
    # with the one before it.
    colour_run = RUNS[0]
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
            'hasPicture': {run['id']: os.path.exists(picture_path(run, file_name)) for run in RUNS},
        })
    unclassified = unclassified_entry(counts, picture_path)
    if unclassified is not None:
        classes.append(unclassified)

    # The page fits the picture to the window with this size. The data sets differ by a few
    # pixels (1430 to 1438 wide); the page keeps each picture's own shape inside this one.
    picture_width, picture_height = Image.open(picture_path(RUNS[0], ALL_CLASSES_FILE)).size

    data = {
        'pictureBase': PICTURE_BASE,
        'controls': CONTROLS,
        'buttons': {'Filter': filter_buttons()},
        'sliders': SLIDERS,
        # base only for the runs whose pictures are not in the bucket
        'runs': [{'id': run['id'], 'label': run['label'], 'choices': run['choices'],
                  **({'base': run['base']} if run.get('base') else {})} for run in RUNS],
        'pictureSize': {'width': picture_width, 'height': picture_height},
        'allClassesFile': ALL_CLASSES_FILE,
        'totalCells': {run_id: sum(counts[run_id].values()) for run_id in RUN_IDS},
        'classes': classes,
        'regions': {dataset: regions_of(dataset) for dataset in REGIONS},
    }
    with open(os.path.join(HERE, 'data.js'), 'w') as handle:
        handle.write('// Written by build_data.py. Do not edit by hand.\n')
        handle.write('window.BETA_VIEWER_DATA = ' + json.dumps(data, indent=1) + ';\n')

    for run_id in RUN_IDS:
        mismatched = [c['name'] for c in classes if (c['cells'][run_id] > 0) != c['hasPicture'][run_id]]
        print('%s: %d cells, classes whose count and picture disagree: %s'
              % (run_id, data['totalCells'][run_id], mismatched or 'none'))


if __name__ == '__main__':
    main()
