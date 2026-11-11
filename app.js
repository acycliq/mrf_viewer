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

// What the page shows now.
const selection = {
    entry: ALL_CLASSES,
    run: DATA.runs[0],
};

const stage = document.getElementById('stage');
// The pictures go inside the viewport, the element that zooms and moves (zoomPan.js).
const viewport = document.getElementById('viewport');
const zoomPan = createZoomPan(stage, viewport, DATA.pictureSize);
const classList = document.getElementById('classList');
const classFilter = document.getElementById('classFilter');
const runOptions = document.getElementById('runOptions');

// Counts every picture change, so a picture that finishes loading after a newer
// one was asked for is dropped instead of shown.
let latestRequest = 0;


// ---------------------------------------------------------------- the picture

function pictureUrl(entry, run) {
    if (!entry.hasPicture[run.id]) return null;
    return `images/${run.id}/${entry.file}`;
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
 * Load the selected class of every run in the background, so switching run
 * finds the picture already in the browser's cache.
 */
function preloadOtherRuns() {
    for (const run of DATA.runs) {
        const url = pictureUrl(selection.entry, run);
        if (url !== null && run !== selection.run) new Image().src = url;
    }
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
function refreshClassRows() {
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

function buildRunOptions() {
    for (const run of DATA.runs) {
        const option = document.createElement('label');
        option.className = 'run-option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'run';
        radio.value = run.id;
        radio.checked = run === selection.run;
        radio.addEventListener('change', () => selectRun(run));

        const text = document.createElement('span');
        text.textContent = run.label;

        option.append(radio, text);
        runOptions.appendChild(option);
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
    refreshClassRows();
    refreshCaption();
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
    const radio = runOptions.querySelector(`input[value="${run.id}"]`);
    radio.checked = true;
    refreshEverything();
}

/** Move the class selection up or down the rows the filter leaves visible. */
function selectNeighbourEntry(step) {
    const visible = ENTRIES.filter(entry => !entry.itemElement.hidden);
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
 * Keyboard: up and down walk through the classes, left and right (or the run's
 * number in the list, 1 to 5) change run, + and - zoom, 0 goes back to the
 * starting view. Keys typed into the filter box are left alone.
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
buildRunOptions();
setupZoomButtons();
setupDrawerToggle(document.getElementById('drawer'), document.getElementById('drawerRail'));
setupResizableList(classList, document.getElementById('classListResizeHandle'));
classFilter.addEventListener('input', applyClassFilter);
document.addEventListener('keydown', handleKey);
refreshEverything();
