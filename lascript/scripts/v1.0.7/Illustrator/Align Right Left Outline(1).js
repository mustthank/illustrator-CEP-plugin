var direction = 'left';

// --lascripts-event-start="r"

     direction = 'right';

// --lascripts-event-end="r"

selection.align(direction, {
    bounds: 'visible',
    object: {
        node: selection[0],
        bounds: 'visible',
        offset: 'outline'
    }
});