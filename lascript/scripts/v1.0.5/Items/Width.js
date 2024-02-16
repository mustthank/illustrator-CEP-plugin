/* 
    Object.Width( size, { anchor: String, constrain: Boolean } || anchor || constrain, anchor || constrain );

   * argument[0] =>
        * String || Number: value of the size

   * argument[1] =>
        * Object: {
            constrain: Boolean,
            anchor: String =>
                'topleft'
                'topcenter'
                'topright'
                'middleright'
                'bottomright'
                'bottomcenter'
                'bottomleft'
                'middleleft'
                'center'
        }
        * Boolean
        * String
    * arguments[2] =>
        * Boolean
        * String

*/


    if (documents.length) $.activeArtboard().Width('-100px', {
        constrain: true,
        anchor: 'center'
    });

// short arguments
    // $.activeArtboard().Width('-100px' /* size */, 'center' /* anchor */, true /* constrain */);
