try {
    var docs = [app.activeDocument], pathProp = 'closed';
    
    function _callback (item, property) {
        if (!item.closed) item[property] = true;
    }
    
    // --lascripts-event-start="r"
    
         selection = null;
         pathProp = 'selected';
    
    // --lascripts-event-end="r"
    
    // --lascripts-event-start="s$"
    
         selection = null;
         docs = app.documents;
         pathProp = 'selected';
    
    // --lascripts-event-end="s$"
    
    // --lascripts-event-start="c$"
    
        docs = app.documents;
    
    // --lascripts-event-end="c$"
    
    var i = docs.length;
    
    while (i--) {
        var paths = docs[i].pathItems, j = paths.length;
        while (j--) _callback(paths[j], pathProp);
    }

}
    catch (e) {
        alert(e);
    }