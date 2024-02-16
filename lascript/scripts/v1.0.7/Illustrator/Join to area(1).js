var value = false;

// --lascripts-event-start="r"

    value = true;

// --lascripts-event-end="r"


selection.joinText({
    frame: 'area',
    reverse: value,
    separator: '\n'
});