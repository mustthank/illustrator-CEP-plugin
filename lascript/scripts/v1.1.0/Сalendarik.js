if (calendarik instanceof Function) {

// dialog window
    var window = new Window('dialog','Calendarik', undefined),
        panel = window.add('panel'),

        // panel title
            panelTitle = panel.add('statictext', [0, 0, 220, 15], 'Calendarik'),

        // year
            groupYear = panel.add('group'),
            yearTitle = groupYear.add('statictext', [0, 0, 60, 15], 'Year:'),
            yearInput = groupYear.add('edittext', [0, 0, 160, 30], new Date().getFullYear()),

        // preset
            groupPreset = panel.add('group'),
            presetTitle = groupPreset.add('statictext', [0, 0, 60, 15], 'Preset:'),
            presetList  = groupPreset.add('dropdownlist', [0, 0, 160, 30], [
                '3x4',
                '4x3',
                '6x2-top',
                '6x2-bottom',
                '6|6',
                'left-bottom',
                'top-right',
                'full-top',
                'full-bottom',
                'circle',
                'circle-compact'
            ]),

        // language
            groupLanguage = panel.add('group'),
            languageTitle = groupLanguage.add('statictext', [0, 0, 60, 15], 'Language:'),
            languageList  = groupLanguage.add('dropdownlist', [0, 0, 160, 30], [
                'ru',
                'en_us',
                'en_uk',
                'en_cd',
                'de',
                'fr',
                'es',
                'it',
                'dt',
                'uk',
                'ru_en_month_with_year',
            ]),

        // names
            groupNames  = panel.add('group'),
            _monthsNames = groupNames.add('checkbox', [0, 0, 100, 15],'Title months'),
            _daysNames   = groupNames.add('checkbox', [0, 0, 100, 15],'Title days'),
            _weeksNames  = panel.add('checkbox', [0, 0, 210, 15],'Week numbers');

        // buttons
            buttonsGroup = window.add('group'),
            applyButton = buttonsGroup.add('button', [0, 0, 100, 30], 'Apply', { name: 'OK' } ),
            closeButton = buttonsGroup.add('button', [0, 0, 100, 30], 'Close', { name: 'Cancel' } );

        // set values
            presetList.selection = 0;
            languageList.selection = 0;
            _monthsNames.value = true;
            _daysNames.value = true;
            _weeksNames.value = true;

        // year events
            function yearInputKeydownHandler (val) {
                yearInput.text = (parseInt(yearInput.text) + val) || new Date().getFullYear();
            }
            yearInput.addEventListener('keydown', function (e) {
                var val = false;
                if (e.keyName === 'Down') val = -1;
                if (e.keyName === 'Up') val = 1;
                if (val) yearInputKeydownHandler(val);
            });

        // run
            applyButton.onClick = function () {
                calendarik({
                    preset: presetList.selection.text || '3x4',
                    startYear: parseInt(yearInput.text) || new Date().getFullYear(),
                    endYear: parseInt(yearInput.text) || new Date().getFullYear(),
                    frameWidth:  'fitartboard',
                    frameHeight: 'fitartboard',
                    gutter_x:    10,
                    gutter_y:    10,
                    daysFormat:  'fullWord',
                    language:    languageList.selection.text || 'ru',
                    enableFrames: {
                        day: _daysNames.value,
                        week: _weeksNames.value,
                        month: _monthsNames.value,
                    },
                    // linkFrames:  false,
                    // margin: {
                    //     top:    10,
                    //     right:  10,
                    //     left:   10,
                    //     bottom: 10
                    // }
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
        alert('Please enable library - "AI_PS_library.js"');
    }