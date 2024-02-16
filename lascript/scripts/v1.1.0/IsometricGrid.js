var space = parseInt(prompt('Please enter the number of space between of the lines', '50')),
    doc     = activeDocument,
    deg     = 60,
    size    = 400,
    rect    = doc.artboards[ doc.artboards.getActiveArtboardIndex() ].artboardRect,
    artWidth = Math.round((rect[2] - rect[0])),
    columns = Math.round( artWidth / space + 1) * 4,
    left    = rect[0] - (space * (columns - 1) / 2) + artWidth / 2;

while (columns--) {
    var $line = activeDocument.pathItems.add();
    $line.setEntirePath([
        [left + (space * columns), rect[1]],
        [left + (space * columns), rect[3]],
    ]);
    $line.resize(size, size);
    $line.guides = true;

    var $line_45 = $line.duplicate();
    $line_45.rotate(deg);
    $line_45.resize(size, size);

    var $line_r45 = $line.duplicate();
    $line_r45.rotate(-deg);
    $line_r45.resize(size, size);
}