if (selection.length) {
// init variables
    var art = activeDocument.getActiveArtboard(),
        sizes = [ parseFloat(art.Width()), parseFloat(art.Height()) ],
        bounds = art.artboardRect;

// create rectangle
    var rectangle = activeDocument.pathItems.rectangle(bounds[1], bounds[0], sizes[0], sizes[1]);

// create group and clipping mask
    var group = selection.group();
    rectangle.appendTo(group).zIndex('first').attr({
        clipping: true
    });
    group.attr({
        clipped: true
    });
}
    else {
        alert('No such element!');
    }