var art = activeDocument.getActiveArtboard(),
    aw = art.Width(),
    ah = art.Height();
selection
    .Width(aw, {
        anchor: 'center'
    })
    .Height(ah, {
        anchor: 'center'
    });