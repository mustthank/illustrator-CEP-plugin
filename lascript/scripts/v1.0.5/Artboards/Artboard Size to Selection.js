if (selection.length) {
    activeDocument.getActiveArtboard().artboardRect = $.selectionBounds('visibleBounds');
}
    else {
        lascripts.log('Selection is empty!');
    }