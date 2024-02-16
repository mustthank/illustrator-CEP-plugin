// --lascripts-event-start="l"

    app.quit();

// --lascripts-event-end="l"



// --lascripts-event-start="r"

    app.forceQuit();

// --lascripts-event-end="r"



// --lascripts-event-start="a$"

    $.documents.closeOther('save');
    app.forceQuit();

// --lascripts-event-end="a$"