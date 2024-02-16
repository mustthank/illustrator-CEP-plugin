var direction = 'top';

// --lascripts-event-start="r"

     direction = 'bottom';

// --lascripts-event-end="r"

selection.align(direction, {
    bounds: 'visible',
    object: {
        node: selection[0],
        bounds: 'visible',
        offset: 'outline'
    }
});