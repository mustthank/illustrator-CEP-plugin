var s = selection;
if (s.length) {
    var value = prompt('Length shadow:', '100px') || '100px';
    selection.longShadow(value);
}
    else {
        alert('No such element!');
    }