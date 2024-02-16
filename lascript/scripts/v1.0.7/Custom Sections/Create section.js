// --lascripts-extension-engine-start


    try {

        var sSection = new $sections.addSection({
                name: 'customSection', // name - find to $sections[.name], example: $sections.customSection.node = [jQuery object]
                selector: '.customSection', // selector (for HMTL DOM)
                html: '', // html code
                tools: { // tools in the toolbar
                    count: 6, // number of tools in the toolbar of the section 
                    name: [ // names of tools in the toolbar of the section
                        'back',
                        'run',
                        'undo',
                        'redo',
                        'bootstrap'
                    ]
                }
            }, function (section, self) {

                section.append('<div class="button button_full-width" style="text-align: center">Button created</div>');

            });

    }
        catch (e) {
            alert(e);
        }


// --lascripts-extension-engine-end