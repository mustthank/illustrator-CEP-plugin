// --lascripts-extension-engine-start


    try {

        if (typeof $sections.customSection === 'object') {
            setActiveSection($sections.customSection.selector);
        }
            else {
                alert( 'Section "customSection" not created!' );
            }

    }
        catch (e) {
            alert(e);
        }


// --lascripts-extension-engine-end