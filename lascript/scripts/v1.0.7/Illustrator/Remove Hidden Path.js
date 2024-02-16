var docs = [app.activeDocument];


// --lascripts-event-start="r"

    docs = app.documents;

// --lascripts-event-end="r"

var i = docs.length;
while (i--) docs[i].getHiddenPath().remove();