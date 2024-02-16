/*
    Object.zIndex( index - String, Number );

    index => {
        String || Number: set ZOrderMethod position
        undefined: get position in layer
*/

if (selection.length) {
    var value = 'up', /*
            <=>'front',
            'down' <=> 'back',
            'first' <=> 'top',
            'last' <=> 'bottom',
            2 - Number
        */
        node = activeDocument.layers[0].pageItems[2];
    if (!node) alert('No such element!');
        else {
            lascripts.log('zIndex: ' + node.zIndex());
            node.zIndex('up');
            lascripts.append('NEW zIndex: ' + node.zIndex());
        }
}
    else {
        alert('No such elements!');
    }