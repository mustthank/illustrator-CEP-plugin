if (selection.length) {
    var mode = 'fill',
        color = selection.getColor(mode),
        values = color.getColorValues().toString();

    lascripts.log(color.typename + ' - ' + values);
}
    else {
        alert('No such elements!');
    }