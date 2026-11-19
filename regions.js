'use strict';

/**
 * The regions page: region accuracy, class placement and the heatmap, all worked
 * out here from the counts in regions_data.js (region -> class -> cells, per run
 * and cell filter). See regions.html.
 */

const RD = window.REGIONS_DATA;
const GROUP_OF = Object.fromEntries(RD.classes.map(c => [c.name, c.group]));
const COLOUR_OF = Object.fromEntries(RD.classes.map(c => [c.name, c.colour]));

// The parts of an accuracy bar, in order.
const PARTS = [
    { key: 'right', text: 'right class', colour: '#22c55e' },
    { key: 'wrong', text: 'other excitatory class', colour: '#ef4444' },
    { key: 'Gaba', text: 'inhibitory', colour: '#3b82f6' },
    { key: 'NN', text: 'non-neuronal', colour: '#9aa0a6' },
    { key: 'other', text: 'immature neurons', colour: '#a855f7' },
    { key: 'Zero', text: 'Zero', colour: '#3f3f46' },
];
const GROUP_ORDER = ['Glut', 'Gaba', 'NN', 'other', 'Zero'];

const state = {
    dataset: Object.keys(RD.datasets)[0],
    filter: RD.filters[0].value,
    left: 0,
    right: null,
};

const sum = values => values.reduce((a, b) => a + b, 0);
const percent = (part, whole) => (whole > 0 ? Math.round(100 * part / whole) : 0);
const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
};

function dataset() { return RD.datasets[state.dataset]; }

/** The run's name, saying so when the filter picked does not apply to it (corr on pciSeq). */
function runName(run) {
    return run.filterApplies[state.filter] ? run.short : `${run.short} (every cell)`;
}
function countsOf(run) { return run.counts[state.filter]; }

/** The cells of one region of one run, split into the parts of the accuracy bar. */
function partsOf(run, region) {
    const byClass = countsOf(run)[region] || {};
    const expected = RD.expected[region] || [];
    const parts = Object.fromEntries(PARTS.map(p => [p.key, 0]));
    for (const [name, n] of Object.entries(byClass)) {
        const group = GROUP_OF[name];
        if (group === 'Glut') parts[expected.includes(name) ? 'right' : 'wrong'] += n;
        else parts[group] += n;
    }
    return parts;
}


// ---------------------------------------------------------------- region accuracy

function drawLegend() {
    const legend = document.getElementById('accuracyLegend');
    legend.replaceChildren();
    for (const part of PARTS) {
        const item = el('span');
        const swatch = el('i');
        swatch.style.background = part.colour;
        item.append(swatch, part.text);
        legend.appendChild(item);
    }
}

function drawAccuracy() {
    const chart = document.getElementById('accuracyChart');
    chart.replaceChildren();
    const { regions, runs } = dataset();
    for (const region of regions) {
        const block = el('div', 'accuracy-region');
        const title = el('h3', null, region);
        // every cell of the region, whatever the filter; each bar's own count is in its tooltip
        const cells = sum(Object.values(runs[0].counts[RD.filters[0].value][region] || {}));
        title.appendChild(el('small', null, `${cells.toLocaleString('en-GB')} cells, expected ${RD.expected[region].join(', ')}`));
        block.appendChild(title);

        for (const run of runs) {
            const parts = partsOf(run, region);
            const total = sum(Object.values(parts));
            const row = el('div', 'accuracy-row');
            row.appendChild(el('span', 'run-name', runName(run)));
            const stack = el('div', 'stack');
            for (const part of PARTS) {
                if (!parts[part.key]) continue;
                const piece = el('div');
                piece.style.width = `${100 * parts[part.key] / total}%`;
                piece.style.background = part.colour;
                piece.title = `${part.text}: ${parts[part.key].toLocaleString('en-GB')} cells, ${percent(parts[part.key], total)}% of the region`;
                stack.appendChild(piece);
            }
            row.appendChild(stack);
            stack.title = `${total.toLocaleString('en-GB')} cells left by the filter`;
            const excitatory = parts.right + parts.wrong;
            const score = el('span', 'score', `${percent(parts.right, excitatory)}%`);
            score.title = `${parts.right} of ${excitatory} cells called excitatory have the right class`;
            row.appendChild(score);
            block.appendChild(row);
        }
        chart.appendChild(block);
    }
}


// ---------------------------------------------------------------- class placement

function drawPlacement() {
    const { runs } = dataset();
    const home = {};
    for (const [region, classes] of Object.entries(RD.expected)) for (const name of classes) home[name] = region;

    const table = el('table', 'regions-table');
    const head = el('tr');
    head.appendChild(el('th', null, 'Class'));
    head.appendChild(el('th', null, 'Home region'));
    for (const run of runs) head.appendChild(el('th', null, runName(run)));
    table.appendChild(head);

    for (const [name, region] of Object.entries(home)) {
        const row = el('tr');
        const label = el('td');
        const dot = el('span', 'class-dot');
        dot.style.background = COLOUR_OF[name] || '#888888';
        label.append(dot, name);
        row.appendChild(label);
        row.appendChild(el('td', null, region));
        for (const run of runs) {
            const counts = countsOf(run);
            const all = sum(Object.values(counts).map(byClass => byClass[name] || 0));
            const inHome = (counts[region] || {})[name] || 0;
            const outside = (counts[RD.outside] || {})[name] || 0;
            const cell = el('td', null, all ? `${percent(inHome, all)}%` : '-');
            cell.appendChild(el('small', null, `of ${all.toLocaleString('en-GB')}`));
            cell.title = `${inHome} in ${region}, ${outside} outside every outline, ${all - inHome - outside} in another region`;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    const scroll = el('div', 'table-scroll');
    scroll.appendChild(table);
    document.getElementById('placementTable').replaceChildren(scroll);
}


// ---------------------------------------------------------------- heatmap

/** The classes with at least one cell in any run, grouped excitatory first, Zero last. */
function heatmapClasses() {
    const seen = new Set();
    for (const run of dataset().runs) {
        for (const byClass of Object.values(countsOf(run))) for (const name of Object.keys(byClass)) seen.add(name);
    }
    return RD.classes
        .filter(c => seen.has(c.name))
        .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || a.name.localeCompare(b.name));
}

function heatColour(share) {
    // dark for none, bright yellow for all; the square root lifts the small shares
    return `rgba(250, 204, 21, ${Math.sqrt(share).toFixed(3)})`;
}

function drawHeatmap(run, target) {
    const classes = heatmapClasses();
    const { regions } = dataset();
    const rows = [...regions, RD.outside];
    const counts = countsOf(run);

    const table = el('table', 'heatmap');
    const head = el('tr');
    head.appendChild(el('th'));
    classes.forEach((c, i) => {
        const th = el('th', 'col');
        if (i > 0 && classes[i - 1].group !== c.group) th.classList.add('group-start');
        th.appendChild(el('span', null, c.name));
        head.appendChild(th);
    });
    table.appendChild(head);

    for (const region of rows) {
        const byClass = counts[region] || {};
        const total = sum(Object.values(byClass));
        const tr = el('tr');
        const name = el('th', 'row', region === RD.outside ? 'outside every outline' : region);
        name.title = `${total.toLocaleString('en-GB')} cells`;
        tr.appendChild(name);
        classes.forEach((c, i) => {
            const n = byClass[c.name] || 0;
            const share = total ? n / total : 0;
            const td = el('td');
            if (i > 0 && classes[i - 1].group !== c.group) td.classList.add('group-start');
            if ((RD.expected[region] || []).includes(c.name)) td.classList.add('expected');
            td.style.background = heatColour(share);
            if (share >= 0.05) td.textContent = Math.round(100 * share);
            td.style.color = share > 0.3 ? '#000000' : '#e5e5e5';
            td.title = `${region}, ${c.name}: ${n} cells, ${percent(n, total)}% of the region`;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    }
    const scroll = el('div', 'table-scroll');
    scroll.appendChild(table);
    target.replaceChildren(scroll);
}

function fillRunPicker(select, picked) {
    select.replaceChildren();
    dataset().runs.forEach((run, i) => {
        const option = el('option', null, runName(run));
        option.value = i;
        option.selected = i === picked;
        select.appendChild(option);
    });
}

function drawHeatmaps() {
    const runs = dataset().runs;
    if (state.right === null) state.right = runs.findIndex(run => run.method === 'MapMyCells');
    drawHeatmap(runs[state.left], document.getElementById('heatmapLeftTable'));
    drawHeatmap(runs[state.right], document.getElementById('heatmapRightTable'));
}


// ---------------------------------------------------------------- controls

function buildControls() {
    const datasetPicker = document.getElementById('datasetPicker');
    for (const name of Object.keys(RD.datasets)) {
        const option = el('option', null, name);
        option.value = name;
        datasetPicker.appendChild(option);
    }
    datasetPicker.addEventListener('change', () => {
        state.dataset = datasetPicker.value;
        state.left = 0;
        state.right = null;
        drawEverything();
    });

    // one line per group of filters (reads, corr), one radio button each; one is picked at a time
    const filterPicker = document.getElementById('filterPicker');
    const groups = [...new Set(RD.filters.map(filter => filter.group))];
    for (const group of groups) {
        const line = el('span', 'filter-group');
        line.appendChild(el('span', 'filter-group-name', group));
        for (const filter of RD.filters.filter(f => f.group === group)) {
            const label = el('label');
            label.title = filter.title;
            const radio = el('input');
            radio.type = 'radio';
            radio.name = 'filter';
            radio.checked = filter.value === state.filter;
            radio.addEventListener('change', () => { state.filter = filter.value; drawEverything(); });
            label.append(radio, filter.text);
            line.appendChild(label);
        }
        filterPicker.appendChild(line);
    }

    for (const [id, side] of [['heatmapLeft', 'left'], ['heatmapRight', 'right']]) {
        document.getElementById(id).addEventListener('change', event => {
            state[side] = Number(event.target.value);
            drawHeatmaps();
        });
    }
}

function drawEverything() {
    drawLegend();
    drawAccuracy();
    drawPlacement();
    drawHeatmaps();
    fillRunPicker(document.getElementById('heatmapLeft'), state.left);
    fillRunPicker(document.getElementById('heatmapRight'), state.right);
}

buildControls();
drawEverything();
