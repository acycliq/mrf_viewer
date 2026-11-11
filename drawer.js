'use strict';

/**
 * The drawer's two controls, both taken from pciSeq Viewer:
 *   - the rail on its edge opens and hides the drawer, and Escape hides it;
 *   - the handle under the class list makes the list taller or shorter.
 *
 * Used by app.js:
 *   setupDrawerToggle(drawer, rail)
 *   setupResizableList(list, handle)
 *
 * Neither knows anything about classes or pictures.
 */

const MIN_LIST_HEIGHT = 100;
const MAX_LIST_HEIGHT = 1600;
// Where the browser remembers the list height between visits.
const LIST_HEIGHT_STORAGE_KEY = 'betaViewer.classListHeight';

/**
 * Open or hide the drawer when the rail is clicked (or Enter or Space is
 * pressed on it), and hide it when Escape is pressed anywhere on the page.
 * The drawer lies over the picture, so the picture stays where
 * it is. The body gets a class too, so the caption can step out from under the
 * drawer (see .caption in styles.css).
 */
function setupDrawerToggle(drawer, rail) {
    function setCollapsed(collapsed) {
        drawer.classList.toggle('collapsed', collapsed);
        document.body.classList.toggle('drawer-collapsed', collapsed);
        rail.title = collapsed ? 'Open the drawer' : 'Hide the drawer';
    }

    function toggle() {
        setCollapsed(!drawer.classList.contains('collapsed'));
    }

    rail.addEventListener('click', toggle);
    rail.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggle();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setCollapsed(true);
    });
}

/**
 * The browser's storage can be switched off (private windows, strict settings),
 * and then reading or writing it throws. The list height is a convenience, so
 * a failure here only means the height is not remembered.
 */
function readSavedListHeight() {
    try {
        return Number(localStorage.getItem(LIST_HEIGHT_STORAGE_KEY)) || null;
    } catch (error) {
        return null;
    }
}

function saveListHeight(height) {
    try {
        localStorage.setItem(LIST_HEIGHT_STORAGE_KEY, String(height));
    } catch (error) {
        // Not remembered; nothing else depends on it.
    }
}

/** Drag the handle up or down to change how tall the list is. */
function setupResizableList(list, handle) {
    const savedHeight = readSavedListHeight();
    if (savedHeight !== null) list.style.maxHeight = savedHeight + 'px';

    // Where the pointer and the list height were when a drag started; null between drags.
    let drag = null;

    handle.addEventListener('pointerdown', event => {
        drag = { pointerY: event.clientY, height: list.offsetHeight };
        handle.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    handle.addEventListener('pointermove', event => {
        if (drag === null) return;
        const wanted = drag.height + (event.clientY - drag.pointerY);
        const height = Math.min(MAX_LIST_HEIGHT, Math.max(MIN_LIST_HEIGHT, wanted));
        list.style.maxHeight = height + 'px';
    });

    handle.addEventListener('pointerup', () => {
        if (drag === null) return;
        drag = null;
        saveListHeight(parseInt(list.style.maxHeight, 10));
    });
}
