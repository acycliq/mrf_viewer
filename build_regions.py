"""Build regions_data.js for the regions page (regions.html).

The regions page checks the cell typing against anatomy: an excitatory cell has a
home region (a CA1 pyramidal cell sits in CA1, an L6 cell in L6), so the region a
cell is in says which class it should be. For every run and every region this
script counts the cells of each class, and the page works out the rest from those
counts.

A cell is in a region if the centre of its mask (X0, Y0 of pciSeq's cellData.tsv,
in the image's pixels like the geojson) is inside the region's outline, so a cell
is in the same region in every run. A cell inside no outline
goes under 'outside'. The outlines do not overlap, so a cell is in one region at most.

Only the data sets with outlines (build_data.REGIONS) are done. Run it again when
the outlines or the runs change, after build_data.py, since the class colours are
read from data.js:
    python3 build_regions.py
"""
import csv
import json
import os
import sys
from collections import Counter

import numpy as np
from matplotlib.path import Path

import build_data
from build_data import (HERE, CELL_FILTERS, MARKER_NAMES, class_of_cell, keep_cell,
                        pciseq_run, mapmycells_run, regions_of)

# The runs compared, per data set: pciSeq at Inefficiency 0.1 and every mrf_beta, and
# MapMyCells with both marker lists.
PCISEQ = [('0.1', beta) for beta in build_data.MRF_BETAS]
MARKERS = build_data.MARKERS
# The cell filters the page can switch between, the same as on the classes page. A
# reads filter goes on every run alike, so the runs are compared on the same cells. A
# corr filter needs MapMyCells' Corr, so it goes on the MapMyCells runs only and the
# pciSeq runs keep every cell; the page says so next to their names.
FILTERS = list(CELL_FILTERS)

# The classes a region's excitatory cells should be. Strict: L4/5 IT in L5 is wrong,
# and L5 IT in L4/5 is wrong too.
EXPECTED = {
    'CA1': ['016 CA1-ProS Glut'],
    'CA2': ['025 CA2-FC-IG Glut'],
    'CA3': ['017 CA3 Glut'],
    'DG': ['037 DG Glut'],
    'L2/3': ['007 L2/3 IT CTX Glut'],
    'L4/5': ['006 L4/5 IT CTX Glut'],
    'L5': ['005 L5 IT CTX Glut', '022 L5 ET CTX Glut', '032 L5 NP CTX Glut'],
    'L6': ['004 L6 IT CTX Glut', '030 L6 CT CTX Glut', '029 L6b CTX Glut'],
}
OUTSIDE = 'outside'


def group_of(class_name):
    """Which kind of class it is, for the page's colours and columns."""
    if class_name == 'Zero':
        return 'Zero'
    if 'Glut' in class_name:
        return 'Glut'
    if 'Gaba' in class_name:
        return 'Gaba'
    if class_name.endswith(' NN'):
        return 'NN'
    return 'other'   # the immature neurons (IMN)


def region_paths(dataset):
    """One matplotlib Path per outline, with its region's name. DG is two outlines."""
    return [(region['name'], Path(np.array(region['points'])))
            for region in regions_of(dataset)['regions']]


def cells_of(run, paths):
    """Every cell of a run: its region, its class and the rows keep_cell needs.

    The region comes from the centre of the cell's mask: pciSeq's X, Y move a
    little from run to run, X0, Y0 do not, and MapMyCells' X, Y are the same as X0, Y0.
    """
    rows, xy = [], []
    csv.field_size_limit(sys.maxsize)
    with open(run['cellData'], newline='') as handle:
        for row in csv.DictReader(handle, delimiter='\t'):
            x, y = (row['X0'], row['Y0']) if 'X0' in row else (row['X'], row['Y'])
            xy.append((float(x), float(y)))
            # keep only what keep_cell reads, the rest of the row is large
            rows.append({'class': class_of_cell(row, run['pick']), 'CellGeneCount': row['CellGeneCount'],
                         'Corr': row.get('Corr')})
    region = np.full(len(rows), OUTSIDE, dtype=object)
    for name, path in paths:
        region[path.contains_points(np.array(xy))] = name
    for row, where in zip(rows, region):
        row['region'] = where
    return rows


def filter_applies(run, cell_filter):
    """A corr filter needs MapMyCells' Corr column, so it does not apply to pciSeq."""
    return cell_filter is None or not cell_filter.startswith('corr') or run['choices']['Method'] == 'MapMyCells'


def counts_of(cells, cell_filter):
    """region -> class -> number of cells, for one run and one cell filter."""
    counts = {}
    for cell in cells:
        if cell_filter is None or keep_cell(cell, cell_filter):
            counts.setdefault(cell['region'], Counter())[cell['class']] += 1
    return {where: dict(by_class) for where, by_class in counts.items()}


def runs_of(dataset):
    """The runs of the page for one data set, made the same way as for data.js."""
    runs = [pciseq_run(dataset, inefficiency, beta) for inefficiency, beta in PCISEQ]
    runs += [mapmycells_run(dataset, markers, None) for markers in MARKERS]
    for run in runs:
        method = run['choices']['Method']
        run['short'] = (f"pciSeq, mrf_beta {run['choices']['mrf_beta']}" if method == 'pciSeq'
                        else f"MapMyCells, {MARKER_NAMES[run['id'].split('/')[2]]}")
    return runs


def class_colours():
    """The class colours of data.js, so both pages draw a class in the same colour."""
    with open(os.path.join(HERE, 'data.js')) as handle:
        text = handle.read()
    data = json.loads(text[text.index('{'):text.rindex('}') + 1])
    return {entry['name']: entry['colour'] for entry in data['classes']}


def main():
    colours = class_colours()
    datasets = {}
    for dataset in build_data.REGIONS:
        paths = region_paths(dataset)
        regions = list(dict.fromkeys(name for name, _ in paths))
        runs = []
        for run in runs_of(dataset):
            print(run['id'])
            cells = cells_of(run, paths)
            applies = {CELL_FILTERS[f]['value']: filter_applies(run, f) for f in FILTERS}
            runs.append({
                'id': run['id'], 'label': run['label'], 'short': run['short'],
                'method': run['choices']['Method'],
                'counts': {CELL_FILTERS[f]['value']: counts_of(cells, f if applies[CELL_FILTERS[f]['value']] else None)
                           for f in FILTERS},
                'filterApplies': applies,
            })
        datasets[dataset] = {'regions': regions, 'runs': runs}

    all_classes = sorted({name for d in datasets.values() for run in d['runs']
                          for counts in run['counts'].values() for by_class in counts.values()
                          for name in by_class})
    data = {
        'datasets': datasets,
        'expected': EXPECTED,
        'outside': OUTSIDE,
        'filters': [{'value': CELL_FILTERS[f]['value'], 'group': CELL_FILTERS[f]['group'],
                     'text': CELL_FILTERS[f]['text'], 'title': build_data.filter_title(f)} for f in FILTERS],
        'classes': [{'name': name, 'group': group_of(name), 'colour': colours.get(name, '#888888')}
                    for name in all_classes],
    }
    with open(os.path.join(HERE, 'regions_data.js'), 'w') as handle:
        handle.write('// Written by build_regions.py. Do not edit by hand.\n')
        handle.write('window.REGIONS_DATA = ' + json.dumps(data) + ';\n')


if __name__ == '__main__':
    main()
