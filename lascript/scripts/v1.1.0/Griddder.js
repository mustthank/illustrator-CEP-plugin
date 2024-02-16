if (app.griddder instanceof Function) {
    if (selection.length) {

        // dialog window
            var window = new Window('dialog','Calendarik', undefined),
                panel = window.add('panel'),

                // panel title
                    panelTitle = panel.add('statictext', [0, 0, 55, 15], 'Griddder'),

                // rows & columns
                    // rows & columns titles
                        groupFieldTitles = panel.add('group'),
                        titleColumns = groupFieldTitles.add('statictext', [0, 0, 60, 15], 'Columns:'),
                        titleRows = groupFieldTitles.add('statictext', [0, 0, 60, 15], 'Rows:'),

                    // rows & columns inputs
                        groupFieldInputs = panel.add('group'),
                        inputColumns = groupFieldInputs.add('edittext', [0, 0, 60, 30], '2'),
                        inputRows = groupFieldInputs.add('edittext', [0, 0, 60, 30], '2'),

                // gutter rows & columns
                    // gutter rows & columns titles
                        groupGutterTitles = panel.add('group'),
                        titleColumns = groupGutterTitles.add('statictext', [0, 0, 60, 15], 'Gutter columns:'),
                        titleRows = groupGutterTitles.add('statictext', [0, 0, 60, 15], 'Gutter rows:'),

                    // gutter rows & columns inputs
                        groupGutterInputs = panel.add('group'),
                        inputGutterColumns = groupGutterInputs.add('edittext', [0, 0, 60, 30], '0'),
                        inputGutterRows = groupGutterInputs.add('edittext', [0, 0, 60, 30], '0'),

                // buttons
                    buttonsGroup = window.add('group'),
                    applyButton = buttonsGroup.add('button', [0, 0, 100, 30], 'Apply', { name: 'OK' } ),
                    closeButton = buttonsGroup.add('button', [0, 0, 100, 30], 'Close', { name: 'Cancel' } );

                // year events
                    function numberInputKeydownHandler (e, item) {
                        var val = false;
                        if (e.keyName === 'Down') val = -1;
                        if (e.keyName === 'Up') val = 1;
                        if (val) item.text = (parseInt(item.text) + val) || new Date().getFullYear();
                    }
                    inputColumns.addEventListener('keydown', function (e) {
                        numberInputKeydownHandler(e, this);
                    });
                    inputRows.addEventListener('keydown', function (e) {
                        numberInputKeydownHandler(e, this);
                    });
                    inputGutterColumns.addEventListener('keydown', function (e) {
                        numberInputKeydownHandler(e, this);
                    });
                    inputGutterRows.addEventListener('keydown', function (e) {
                        numberInputKeydownHandler(e, this);
                    });

                // run
                    applyButton.onClick = function () {
                        selection.griddder({
                            rows:    parseInt(inputRows.text),
                            columns: parseInt(inputColumns.text),
                            gutter:{
                                rows:    parseInt(inputGutterRows.text),
                                columns: parseInt(inputGutterColumns.text),
                            }
                        });

                        window.hide();
                    };

                // close window
                    closeButton.onClick = function () {
                        window.hide();
                    };

            // auto show
                window.show();
    }
        else {
            alert('Please select object!');
        }
}
    else {
        alert('Please enable library - "AI_PS_library.js"');
    }