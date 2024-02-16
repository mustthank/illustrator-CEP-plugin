LA(selection, function (item) {
    if (item.typename === 'TextFrame') {
        item.convertPointObjectToAreaObject();
    }
});