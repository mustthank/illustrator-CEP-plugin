if (documents.length) {
    activeDocument.replaceColor({
        find : {
            type : 'hex',
            values : '#e6282d'
        },
        replace : {
            type : 'hex',
            values : '#00c8ff'
        },
        fill : true,
        stroke : true,
        text : 'ranges' // or 'frames'
    });
}
    else {
        alert('Documents not found!');
    }