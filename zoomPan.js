'use strict';

/**
 * Zooming and dragging the picture, the way a map is zoomed and dragged.
 *
 * The pictures live inside one element, the viewport. This file gives the
 * viewport the shape of the pictures, as large as fits the stage, and from
 * then on only changes its CSS transform. So the zoom and the position stay
 * the same when the picture underneath changes: zoom into the hippocampus
 * once, then step through the classes and the mrf_beta values.
 *
 * Used by app.js:
 *   const zoomPan = createZoomPan(stage, viewport, pictureSize);
 *   zoomPan.zoomBy(factor)   zoom in or out around the middle of the stage
 *   zoomPan.reset()          back to the starting view
 *
 * Mouse: the wheel zooms around the pointer, dragging moves the picture, and a
 * double-click goes back to the starting view.
 */

// Zoom is measured against the fitted picture: at zoom 1 the whole picture is as
// large as fits the stage.
const HOME_ZOOM = 0.55;  // the starting view: a little over half of that, with room around the picture
const MIN_ZOOM = 0.2;    // as far out as the zoom goes
const MAX_ZOOM = 12;     // the pictures are about 1000 pixels wide; beyond this there is nothing more to see
// How much one notch of the wheel zooms. A wheel event's deltaY is about 100 per notch.
const WHEEL_ZOOM_SPEED = 0.0015;

/**
 * @param {HTMLElement} stage        The area the picture is shown in.
 * @param {HTMLElement} viewport     The element inside the stage that holds the pictures.
 * @param {Object}      pictureSize  {width, height} of the pictures, in pixels.
 */
function createZoomPan(stage, viewport, pictureSize) {
    // The viewport is drawn `zoom` times its fitted size, with its top left
    // corner at (x, y) of the stage.
    const view = { zoom: HOME_ZOOM, x: 0, y: 0 };

    // The size of the viewport at zoom 1: the whole picture, fitted to the stage.
    const fitted = { width: 0, height: 0 };

    // True until the user zooms or drags, and again after reset(). While it is
    // true the picture is kept at the starting view when the window changes size.
    let atHomeView = true;

    // Where the pointer and the picture were when a drag started; null between drags.
    let drag = null;

    function fitViewportToStage() {
        const scale = Math.min(stage.clientWidth / pictureSize.width,
                               stage.clientHeight / pictureSize.height);
        fitted.width = pictureSize.width * scale;
        fitted.height = pictureSize.height * scale;
        viewport.style.width = fitted.width + 'px';
        viewport.style.height = fitted.height + 'px';
    }

    /**
     * The picture can be dragged anywhere, like a map, as long as its centre
     * stays on the stage. That way it can never be lost off screen.
     */
    function positionWithCentreOnStage(position, pictureLength, stageLength) {
        const half = pictureLength / 2;
        return Math.min(stageLength - half, Math.max(-half, position));
    }

    function keepCentreOnStage() {
        view.x = positionWithCentreOnStage(view.x, fitted.width * view.zoom, stage.clientWidth);
        view.y = positionWithCentreOnStage(view.y, fitted.height * view.zoom, stage.clientHeight);
    }

    function apply() {
        viewport.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`;
    }

    /**
     * Zoom by a factor, keeping the point (stageX, stageY) of the stage still,
     * so the picture grows or shrinks around it.
     */
    function zoomAround(stageX, stageY, factor) {
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, view.zoom * factor));
        const change = newZoom / view.zoom;
        view.x = stageX - (stageX - view.x) * change;
        view.y = stageY - (stageY - view.y) * change;
        view.zoom = newZoom;
        atHomeView = false;
        keepCentreOnStage();
        apply();
    }

    function zoomBy(factor) {
        zoomAround(stage.clientWidth / 2, stage.clientHeight / 2, factor);
    }

    /** The starting view: the whole picture at HOME_ZOOM, in the middle of the stage. */
    function reset() {
        view.zoom = HOME_ZOOM;
        view.x = (stage.clientWidth - fitted.width * HOME_ZOOM) / 2;
        view.y = (stage.clientHeight - fitted.height * HOME_ZOOM) / 2;
        atHomeView = true;
        apply();
    }

    function onWheel(event) {
        event.preventDefault();
        const box = stage.getBoundingClientRect();
        const factor = Math.exp(-event.deltaY * WHEEL_ZOOM_SPEED);
        zoomAround(event.clientX - box.left, event.clientY - box.top, factor);
    }

    function onPointerDown(event) {
        if (event.button !== 0) return;
        drag = { pointerX: event.clientX, pointerY: event.clientY, viewX: view.x, viewY: view.y };
        viewport.classList.add('dragging');
        // Keep getting the pointer's moves even when it leaves the viewport.
        viewport.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event) {
        if (drag === null) return;
        view.x = drag.viewX + (event.clientX - drag.pointerX);
        view.y = drag.viewY + (event.clientY - drag.pointerY);
        atHomeView = false;
        keepCentreOnStage();
        apply();
    }

    function onPointerUp() {
        drag = null;
        viewport.classList.remove('dragging');
    }

    // The wheel is listened for on the whole stage, so it also works over the
    // black around a picture smaller than the stage.
    // passive: false, because the handler stops the page itself from scrolling.
    stage.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('dblclick', reset);

    // The stage changes size when the window does. The observer also runs once
    // when it starts, which draws the first view.
    new ResizeObserver(() => {
        fitViewportToStage();
        if (atHomeView) {
            reset();
            return;
        }
        keepCentreOnStage();
        apply();
    }).observe(stage);

    return { zoomBy, reset };
}
