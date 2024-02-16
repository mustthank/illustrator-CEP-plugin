var doc = activeDocument,
    backup = {
        sel: selection,
        art: doc.getActiveArtboard()
    };

selection = null;
LA(backup.sel, function (obj, i) {
    obj.selected = true;
    var art = doc.artboards.add( $.selectionBounds('visibleBounds') );
    selection = null;
});
selection = backup.sel;
