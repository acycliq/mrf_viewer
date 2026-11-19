'use strict';

/**
 * The class list, the run picker, the caption and the fade from one picture
 * to the next. Zooming is in zoomPan.js and the drawer's own controls are in
 * drawer.js; the data comes from data.js. See index.html for the load order.
 */

const DATA = window.BETA_VIEWER_DATA;

// The entry at the top of the list that shows every class together. It has the
// same shape as a class entry of data.js, so the rest of the code treats it as one.
const ALL_CLASSES = {
    name: 'All classes',
    file: DATA.allClassesFile,
    colour: null,
    cells: DATA.totalCells,
    hasPicture: Object.fromEntries(DATA.runs.map(run => [run.id, true])),
};
const ENTRIES = [ALL_CLASSES, ...DATA.classes];

// What the page shows now. choices holds the option picked in every row of the
// run picker, also in the rows hidden for the other method, so going back to a
// method finds its options as they were left.
const selection = {
    entry: ALL_CLASSES,
    run: DATA.runs[0],
    choices: firstChoices(),
};

const stage = document.getElementById('stage');
// The pictures go inside the viewport, the element that zooms and moves (zoomPan.js).
const viewport = document.getElementById('viewport');
const zoomPan = createZoomPan(stage, viewport, DATA.pictureSize);
const classList = document.getElementById('classList');
const classFilter = document.getElementById('classFilter');
const runControls = document.getElementById('runControls');

// Counts every picture change, so a picture that finishes loading after a newer
// one was asked for is dropped instead of shown.
let latestRequest = 0;


// ---------------------------------------------------------------- the picture

function pictureUrl(entry, run) {
    if (!entry.hasPicture[run.id]) return null;
    // the pictures are in a public bucket, a run's pictures under the run's id;
    // a run with a base of its own has them there instead (local_images/)
    return `${run.base || DATA.pictureBase}/${run.id}/${entry.file}`;
}

function fadeDurationMs() {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--fade-duration');
    return parseFloat(value) || 0;
}

/**
 * Put a new layer on top of the others and fade it in. The layers underneath
 * stay as they are until the new one covers them, so the picture never dips
 * to black in between, and a quick run of changes simply stacks up.
 */
function fadeInLayer(layer) {
    const layersBelow = Array.from(viewport.querySelectorAll('.layer'));
    viewport.appendChild(layer);
    // Read the layout once so the browser registers opacity 0 before it changes;
    // without this there is nothing to transition from.
    layer.getBoundingClientRect();
    layer.classList.add('shown');
    setTimeout(() => layersBelow.forEach(old => old.remove()), fadeDurationMs() + 50);
}

function messageLayer(text) {
    const layer = document.createElement('div');
    layer.className = 'layer message';
    layer.textContent = text;
    return layer;
}

async function showSelectedPicture() {
    const request = ++latestRequest;
    const { entry, run } = selection;
    const url = pictureUrl(entry, run);

    if (url === null) {
        fadeInLayer(messageLayer(`No cells of class ${entry.name} in ${run.label}`));
        return;
    }

    const image = new Image();
    image.className = 'layer';
    image.alt = `${entry.name}, ${run.label}`;
    image.draggable = false;      // dragging moves the picture, it does not pick the image up
    image.src = url;
    // Wait until the picture is ready to paint, so the fade never shows a
    // half-loaded image.
    const loaded = await image.decode().then(() => true, () => false);
    if (request !== latestRequest) return;

    if (!loaded) {
        fadeInLayer(messageLayer(`Could not load ${url}`));
        return;
    }
    fadeInLayer(image);
}

/**
 * Load the selected class of the other runs of this data set in the background,
 * so switching run finds the picture already in the browser's cache. The other
 * data sets are left alone: a picture is about 1 MB and there are many runs.
 */
function preloadOtherRuns() {
    for (const run of DATA.runs) {
        if (run === selection.run || run.choices.Dataset !== selection.run.choices.Dataset) continue;
        const url = pictureUrl(selection.entry, run);
        if (url !== null) new Image().src = url;
    }
}


// ---------------------------------------------------------------- the regions

// Shown or not, for every data set alike; off at the start.
let regionsShown = false;
const SVG_NS = 'http://www.w3.org/2000/svg';
// one colour per region name, so the two pieces of DG match
const REGION_COLOURS = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'];
// in the image's pixels, so the names grow with the zoom
const LABEL_FONT_SIZE = 220;
// the names of the cortical layers are lined up at this x, as a share of the image's width
const LAYER_LABEL_X = 0.09;

function pointInRing(x, y, points) {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const [xi, yi] = points[i];
        const [xj, yj] = points[j];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
}

function distanceToRing(x, y, points) {
    let best = Infinity;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const [x1, y1] = points[j];
        const [x2, y2] = points[i];
        const dx = x2 - x1, dy = y2 - y1;
        const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy || 1)));
        best = Math.min(best, Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)));
    }
    return best;
}

/**
 * Where a region's name goes: the point of a grid over the region that is
 * furthest from its edge. The middle of the points would fall outside a curved
 * band like CA1.
 */
function labelPoint(points) {
    const xs = points.map(p => p[0]);
    const ys = points.map(p => p[1]);
    const [xMin, xMax, yMin, yMax] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const steps = 60;
    let best = { x: (xMin + xMax) / 2, y: (yMin + yMax) / 2, d: -1 };
    for (let i = 0; i <= steps; i++) {
        for (let j = 0; j <= steps; j++) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = yMin + (yMax - yMin) * j / steps;
            if (!pointInRing(x, y, points)) continue;
            const d = distanceToRing(x, y, points);
            if (d > best.d) best = { x, y, d };
        }
    }
    return best;
}

/** Where a layer's name goes: at the given x, halfway down the layer there. */
function layerLabelPoint(points, x) {
    const ys = points.map(p => p[1]);
    const [yMin, yMax] = [Math.min(...ys), Math.max(...ys)];
    const steps = 400;
    const inside = [];
    for (let j = 0; j <= steps; j++) {
        const y = yMin + (yMax - yMin) * j / steps;
        if (pointInRing(x, y, points)) inside.push(y);
    }
    if (inside.length === 0) return labelPoint(points);
    return { x, y: (inside[0] + inside[inside.length - 1]) / 2 };
}

/**
 * The outlines of a data set's regions as an svg in the image's pixels. It
 * fills the viewport like the pictures do, and xMidYMid meet places it the same
 * way object-fit: contain places a picture, so the outlines sit on the cells.
 */
function buildRegionsOverlay(dataset) {
    const info = DATA.regions[dataset];
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'regions-overlay');
    svg.setAttribute('viewBox', `0 0 ${info.width} ${info.height}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    const names = [...new Set(info.regions.map(region => region.name))];
    const labels = [];
    for (const region of info.regions) {
        const colour = REGION_COLOURS[names.indexOf(region.name) % REGION_COLOURS.length];
        const outline = document.createElementNS(SVG_NS, 'polygon');
        outline.setAttribute('points', region.points.map(p => p.join(',')).join(' '));
        outline.setAttribute('stroke', colour);
        svg.appendChild(outline);

        labels.push({ name: region.name, colour, points: region.points });
    }
    // the names go on top of every outline
    for (const { name, points } of labels) {
        // the cortical layers are bands across the whole picture: their names all go
        // in a column near the left edge, so they read top to bottom
        const isLayer = /^L\d/.test(name);
        const where = isLayer ? layerLabelPoint(points, info.width * LAYER_LABEL_X) : labelPoint(points);
        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('class', 'region-label');
        text.setAttribute('x', where.x);
        text.setAttribute('y', where.y);
        text.setAttribute('font-size', LABEL_FONT_SIZE);
        text.textContent = name;
        svg.appendChild(text);
    }
    return svg;
}

/** Put the outlines of the picked data set over the picture, or take them away. */
function refreshRegions() {
    const dataset = selection.run.choices.Dataset;
    const has = dataset in DATA.regions;
    regionsRow.hidden = !has;
    for (const radio of regionsRow.querySelectorAll('input')) radio.checked = (radio.value === 'on') === regionsShown;

    const old = viewport.querySelector('.regions-overlay');
    const wanted = has && regionsShown;
    if (old && (!wanted || old.dataset.dataset !== dataset)) old.remove();
    if (wanted && !viewport.querySelector('.regions-overlay')) {
        const overlay = buildRegionsOverlay(dataset);
        overlay.dataset.dataset = dataset;
        viewport.appendChild(overlay);
    }
}

/** The Regions row of the run picker: Off or On. Not a run choice, it only draws over the picture. */
function buildRegionsRow() {
    const row = document.createElement('div');
    row.className = 'run-control';
    const name = document.createElement('span');
    name.className = 'run-control-name';
    name.textContent = 'Regions';
    row.appendChild(name);
    const options = [
        { value: 'off', text: 'Off', title: 'no region outlines' },
        { value: 'on', text: 'On', title: 'the region and layer outlines drawn by hand on this data set' },
    ];
    const radios = document.createElement('div');
    radios.className = 'run-control-options';
    for (const info of options) {
        const option = document.createElement('label');
        option.className = 'run-control-option';
        option.title = info.title;
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'Regions';
        radio.value = info.value;
        radio.addEventListener('change', () => { regionsShown = info.value === 'on'; refreshRegions(); });
        const text = document.createElement('span');
        text.textContent = info.text;
        option.append(radio, text);
        radios.appendChild(option);
    }
    row.appendChild(radios);
    runControls.appendChild(row);
    return row;
}


// ---------------------------------------------------------------- the drawer

function buildClassRow(entry) {
    const item = document.createElement('li');
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'class-row';
    row.title = entry.name;

    const colour = document.createElement('span');
    colour.className = 'class-colour';
    if (entry === ALL_CLASSES) colour.classList.add('all-classes');
    else colour.style.background = entry.colour;

    const name = document.createElement('span');
    name.className = 'class-name';
    name.textContent = entry.name;

    const count = document.createElement('span');
    count.className = 'class-count';

    row.append(colour, name, count);
    row.addEventListener('click', () => selectEntry(entry));
    item.appendChild(row);
    if (entry === ALL_CLASSES) item.classList.add('all-classes-row');

    // Kept on the entry so the rows can be updated without searching the DOM.
    entry.rowElement = row;
    entry.itemElement = item;
    entry.countElement = count;
    return item;
}

function buildClassList() {
    for (const entry of ENTRIES) classList.appendChild(buildClassRow(entry));

    const noMatch = document.createElement('li');
    noMatch.id = 'noMatch';
    noMatch.className = 'no-match';
    noMatch.textContent = 'No class matches the filter.';
    noMatch.hidden = true;
    classList.appendChild(noMatch);
}

/** Counts, dimming and the highlight, for the run and class picked. */
/**
 * The rows in the order shown: All classes first, then the classes by their
 * count in the picked run, biggest first (same count: by name), and last the
 * entries marked keepLast (the cells a filter left out).
 */
function orderedEntries() {
    const runId = selection.run.id;
    const classes = DATA.classes.filter(entry => !entry.keepLast);
    classes.sort((a, b) => b.cells[runId] - a.cells[runId] || a.name.localeCompare(b.name));
    return [ALL_CLASSES, ...classes, ...DATA.classes.filter(entry => entry.keepLast)];
}

/** Put the rows in the order of orderedEntries, the no-match note stays last. */
function sortClassRows() {
    const noMatch = document.getElementById('noMatch');
    for (const entry of orderedEntries()) classList.insertBefore(entry.itemElement, noMatch);
}

function refreshClassRows() {
    sortClassRows();
    for (const entry of ENTRIES) {
        const cells = entry.cells[selection.run.id];
        entry.countElement.textContent = cells.toLocaleString('en-GB');
        entry.rowElement.classList.toggle('empty', cells === 0);
        entry.rowElement.classList.toggle('selected', entry === selection.entry);
    }
}

function applyClassFilter() {
    const wanted = classFilter.value.trim().toLowerCase();
    let shown = 0;
    for (const entry of ENTRIES) {
        const matches = entry.name.toLowerCase().includes(wanted);
        entry.itemElement.hidden = !matches;
        if (matches) shown += 1;
    }
    document.getElementById('noMatch').hidden = shown > 0;
}


// ---------------------------------------------------------------- the run picker

/**
 * One row of radio buttons per control of DATA.controls (Dataset, Method,
 * Inefficiency, mrf_beta, Filter). Every run says which option it is in each
 * row (run.choices), and a row is shown only when the runs of the picked method
 * have it: pciSeq has Inefficiency and mrf_beta, MapMyCells has Filter.
 */

/** The values of one control, in the order of the runs that have it. */
function valuesOf(control) {
    const values = DATA.runs.map(run => run.choices[control]).filter(value => value !== undefined);
    return [...new Set(values)];
}

/** The first run's choices, plus the first value of each control it does not have. */
function firstChoices() {
    const choices = {};
    for (const control of DATA.controls) choices[control] = valuesOf(control)[0];
    return { ...choices, ...DATA.runs[0].choices };
}

/**
 * The run for the choices picked, after `control` was set to `value`. Mostly
 * that is the run whose every choice is the one picked. When there is none (a
 * data set without MapMyCells, say), it is the run with that value that keeps
 * the most of the other choices, the rows higher up counting for more.
 */
function runOf(choices, control, value) {
    const kept = run => DATA.controls.reduce(
        (score, name) => score * 2 + (run.choices[name] === choices[name] ? 1 : 0), 0);
    const candidates = DATA.runs.filter(run => run.choices[control] === value);
    return candidates.reduce((best, run) => (kept(run) > kept(best) ? run : best));
}

/** Text, tooltip and group of one option; data.js gives them for the Filter row only. */
function optionInfo(control, value) {
    const info = (DATA.buttons[control] || {})[value] || {};
    return { value, text: info.text || value, title: info.title || '', group: info.group || '' };
}

/** The options of a control in runs of options with the same group, in order. */
function groupsOf(control) {
    const groups = [];
    for (const value of valuesOf(control)) {
        const info = optionInfo(control, value);
        const last = groups[groups.length - 1];
        if (last && last.name === info.group) last.options.push(info);
        else groups.push({ name: info.group, options: [info] });
    }
    return groups;
}

/** One radio button with its text; the radios of a control share a name, so one is picked. */
function buildRadio(control, info) {
    const option = document.createElement('label');
    option.className = 'run-control-option';
    option.title = info.title;

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = control;
    radio.value = info.value;
    radio.addEventListener('change', () => selectChoice(control, info.value));

    const text = document.createElement('span');
    text.textContent = info.text;

    option.append(radio, text);
    return option;
}

function buildRadios(control, options) {
    const radios = document.createElement('div');
    radios.className = 'run-control-options';
    for (const info of options) radios.appendChild(buildRadio(control, info));
    return radios;
}

/**
 * A slider whose stops are the options, with their texts under it. Dragging it
 * picks the option under the knob; the stops are evenly spaced, whatever the
 * numbers on them.
 */
function buildSlider(control, options) {
    const box = document.createElement('div');
    box.className = 'run-control-slider';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = options.length - 1;
    slider.step = 1;
    slider.value = 0;    // the browser would start the knob in the middle
    slider.dataset.control = control;
    const pickUnderKnob = () => selectChoice(control, options[slider.value].value);
    slider.addEventListener('input', pickUnderKnob);
    // a click on a greyed slider picks the stop under its knob, even when the knob does not move
    slider.addEventListener('click', pickUnderKnob);

    const ticks = document.createElement('div');
    ticks.className = 'run-control-ticks';
    for (const info of options) {
        const tick = document.createElement('span');
        tick.textContent = info.text;
        ticks.appendChild(tick);
    }

    // kept on the element so refreshRunPicker can set the knob and the tooltip
    box.options = options;
    box.slider = slider;
    box.append(slider, ticks);
    return box;
}

/**
 * The control's name, then its options. Options of the same group (reads, corr)
 * stand on a line of their own with the group's name in front; a group or control named in
 * DATA.sliders is a slider, the others are radio buttons. It is still one row
 * where one option is picked.
 */
function buildControlRow(control) {
    const row = document.createElement('div');
    row.className = 'run-control';

    const name = document.createElement('span');
    name.className = 'run-control-name';
    name.textContent = control;
    row.appendChild(name);

    // each group on a line of its own, the lines under each other next to the name
    const lines = document.createElement('div');
    lines.className = 'run-control-lines';
    for (const group of groupsOf(control)) {
        const line = document.createElement('div');
        line.className = 'run-control-line';
        if (group.name) {
            const label = document.createElement('span');
            label.className = 'run-control-group';
            label.textContent = group.name;
            line.appendChild(label);
        }
        const isSlider = DATA.sliders.includes(group.name || control);
        line.appendChild(isSlider ? buildSlider(control, group.options) : buildRadios(control, group.options));
        lines.appendChild(line);
    }
    row.appendChild(lines);
    return row;
}

function buildRunPicker() {
    for (const control of DATA.controls) {
        const row = buildControlRow(control);
        row.dataset.control = control;
        runControls.appendChild(row);
    }
}

/** Which rows show and which button in each is lit, for the run picked. */
function refreshRunPicker() {
    for (const row of runControls.children) {
        const control = row.dataset.control;
        row.hidden = !(control in selection.run.choices);
        const picked = selection.choices[control];
        for (const radio of row.querySelectorAll('input[type=radio]')) {
            radio.checked = radio.value === picked;
        }
        // a slider whose options do not hold the pick (a corr filter is picked)
        // is greyed, its knob stays where it was
        for (const box of row.querySelectorAll('.run-control-slider')) {
            const index = box.options.findIndex(info => info.value === picked);
            box.classList.toggle('inactive', index < 0);
            if (index < 0) continue;
            box.slider.value = index;
            box.title = box.options[index].title;
            box.querySelectorAll('.run-control-ticks span').forEach((tick, i) => tick.classList.toggle('picked', i === index));
        }
    }
}


// ---------------------------------------------------------------- the caption

function refreshCaption() {
    const { entry, run } = selection;
    const colour = document.getElementById('captionColour');
    colour.classList.toggle('all-classes', entry === ALL_CLASSES);
    colour.style.background = entry === ALL_CLASSES ? '' : entry.colour;

    document.getElementById('captionName').textContent = entry.name;
    const cells = entry.cells[run.id].toLocaleString('en-GB');
    document.getElementById('captionDetail').textContent = `${cells} cells, ${run.label}`;
}


// ---------------------------------------------------------------- changing the selection

function refreshEverything() {
    refreshRunPicker();
    refreshClassRows();
    refreshCaption();
    refreshRegions();
    showSelectedPicture();
    preloadOtherRuns();
}

function selectEntry(entry) {
    if (entry === selection.entry) return;
    selection.entry = entry;
    refreshEverything();
}

function selectRun(run) {
    if (run === selection.run) return;
    selection.run = run;
    Object.assign(selection.choices, run.choices);
    refreshEverything();
}

/** A button of the run picker: change that one choice and keep the others. */
function selectChoice(control, value) {
    const choices = { ...selection.choices, [control]: value };
    selectRun(runOf(choices, control, value));
}

/** Move the class selection up or down the rows the filter leaves visible. */
function selectNeighbourEntry(step) {
    const visible = orderedEntries().filter(entry => !entry.itemElement.hidden);
    if (visible.length === 0) return;
    const current = visible.indexOf(selection.entry);
    const next = Math.min(visible.length - 1, Math.max(0, current + step));
    selectEntry(visible[next]);
    visible[next].rowElement.scrollIntoView({ block: 'nearest' });
}

// One press of + or - , or one click of the zoom buttons, zooms by this much.
const ZOOM_STEP = 1.5;

function setupZoomButtons() {
    document.getElementById('zoomInButton').addEventListener('click', () => zoomPan.zoomBy(ZOOM_STEP));
    document.getElementById('zoomOutButton').addEventListener('click', () => zoomPan.zoomBy(1 / ZOOM_STEP));
    document.getElementById('zoomResetButton').addEventListener('click', () => zoomPan.reset());
}

/**
 * Keyboard: up and down walk through the classes, left and right step through
 * the runs in the order of data.js (the number keys jump to the first nine),
 * + and - zoom, 0 goes back to the starting view. Keys typed into the filter
 * box are left alone.
 */
function handleKey(event) {
    if (event.target === classFilter) return;
    const runIndex = DATA.runs.indexOf(selection.run);

    if (event.key === 'ArrowDown') selectNeighbourEntry(1);
    else if (event.key === 'ArrowUp') selectNeighbourEntry(-1);
    else if (event.key === 'ArrowRight' && runIndex < DATA.runs.length - 1) selectRun(DATA.runs[runIndex + 1]);
    else if (event.key === 'ArrowLeft' && runIndex > 0) selectRun(DATA.runs[runIndex - 1]);
    else if (event.key === '+' || event.key === '=') zoomPan.zoomBy(ZOOM_STEP);
    else if (event.key === '-') zoomPan.zoomBy(1 / ZOOM_STEP);
    else if (event.key === '0') zoomPan.reset();
    else if (DATA.runs[Number(event.key) - 1] !== undefined) selectRun(DATA.runs[Number(event.key) - 1]);
    else return;

    event.preventDefault();
}


// ---------------------------------------------------------------- start

buildClassList();
buildRunPicker();
const regionsRow = buildRegionsRow();
setupZoomButtons();
setupDrawerToggle(document.getElementById('drawer'), document.getElementById('drawerRail'));
setupResizableList(classList, document.getElementById('classListResizeHandle'));
classFilter.addEventListener('input', applyClassFilter);
document.addEventListener('keydown', handleKey);
refreshEverything();
