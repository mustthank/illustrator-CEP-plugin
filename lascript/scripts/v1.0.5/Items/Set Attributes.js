/*
    Object.attr( object );

    object => {
        node property: node property value
        ...
    }
*/

if (selection.length) {
    selection.attr({
        opacity: 50,
        locked: true
    });
}
    else {
        alert('No such elements!');
    }