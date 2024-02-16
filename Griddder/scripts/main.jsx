try {


    // global functions
        function jsonStringify (obj, startSeparator, type) {
            // obj = [ Object ]
            // Example:
                // obj = {
                //     one: true,
                //     two: false,
                //     three: {
                //         four: false,
                //         five: true
                //     }
                // }
            // result:
                // return "{"one":true,"two":false,"three":{"four":false,"five":true}}" => [ String ]

            startSeparator = startSeparator || ['{','}'];
            var str = startSeparator[0], separator = '';

            for (var i in obj) {
                if (obj[i] instanceof Object && typeof obj[i] === 'object') {
                    if (obj[i] instanceof Array) {
                        str += separator + '"' + i + '":' + jsonStringify(obj[i], ['[',']'], 'array');
                    }
                        else {
                            str += separator + '"' + i + '":' + jsonStringify(obj[i], null, 'object');
                        }
                }
                    else if (!(obj[i] instanceof Function)) {
                        if (type === 'array') {
                            str += separator + '"' + obj[i] + '"';
                        }
                            else {
                                str += separator + '"' + i + '":"' + obj[i] + '"';
                            }
                    }
                separator = ',';
            }

            return str + startSeparator[1];
        }

    // xLib
        function dispatchCepEvent ( eventType, message ) {
            try {
                var xLib = getXLib();
                if (xLib) {
                    var eventObj = new CSXSEvent();
                    eventObj.type = eventType;
                    eventObj.data = message;
                    eventObj.dispatch();
                }
            }
                catch (e) {
                    alert( 'dispatchCepEvent() - error: ' + e );
                }
        }
        function getXLib (path) {
            var xLib = null;
            try {
                var xLib = new ExternalObject('lib:\PlugPlugExternalObject');
                return xLib;
            }
                catch (e) {
                    return;
                }
        }

    // lascripts
        var lascripts = {
            log: function (message) {
                try {
                    if (!message) message = '';
                    dispatchCepEvent( lascripts.id + '.console.log', message.toString() );
                }
                    catch (e) {
                        alert( lascripts.id + '.log() - error: ' + e );
                    }
            },
            append: function (message, separator) {
                try {
                    message = message || '';
                    separator = separator || '<br>';
                    var message = {
                            message: message,
                            sep: separator
                        };
                    dispatchCepEvent( lascripts.id + '.console.append', jsonStringify(message) );
                }
                    catch (e) {
                        alert( lascripts.id + '.log() - error: ' + e );
                    }
            },
            openInProgram: function (userObj) {
                try {
                    var obj = {
                        file: {
                            path: '~/Desktop/script.js',
                            name: 'script.js'
                        },
                        program: 'Sublime Text 3'
                    };
                    dispatchCepEvent(lascripts.id + '.openInProgram', jsonStringify(userObj || {}));
                }
                    catch (e) {
                        alert( lascripts.id + '.openInProgram() - error: ' + e );
                    }
            },
            openInBrowser: function (url, message) {
                try {
                    var url = url || '',
                        appName = app.name.toLocaleLowerCase().replace('adobe ','');
                    switch ( url ) {
                        case 'search': lascripts.openInBrowser( 'search in google', message ); break;
                        case 'search in google': url = 'https://google.com/?#newwindow=1&q=' + message; break;
                        case 'search in yandex': url = 'https://yandex.ru/search/?text=' + message; break;
                        case 'forum adobe': url = 'https://forums.adobe.com/community/' + appName + '/' + appName + '_scripting'; break;
                        case 'documentation': url = 'http://ladygin.pro/extensions/' + lascripts.id + '/documentation'; break;
                    }
                    dispatchCepEvent( lascripts.id + '.openInBrowser', url );
                }
                    catch (e) {
                        alert( lascripts.id + '.openInBrowser() - error: ' + e );
                    }
            },
            openExtensions: function (id_extensions) {
                try {
                    if (id_extensions) dispatchCepEvent( lascripts.id + '.openExtensions', id_extensions.toString().replace(/ /g, '') );
                }
                    catch (e) {
                        alert( lascripts.id + '.openExtensions() - error: ' + e );
                    }
            },
            createButton: function (data) {
                dispatchCepEvent( lascripts.id + '.createButton', data || 'test createButton' );
            }
        };

    // set variables
        function setGlobalVariables (data) {
            try {
                lascripts.id = data.extID;
            }
                catch (e) {
                    alert( 'setGlobalVariables() - error: ' + e );
                }
        }



    // grid
        function makeGrid (data) {
            try {
                (function () {
                    if (documents.length && selection.length) {
                        #include './AI_PS_Library.js';
                        selection.griddder(data);
                    }
                        else if (documents.length) {
                            alert( 'Not selected items!' );
                        }
                } ());

                return 'Completed!';
            }
                catch (e) {
                    alert( 'makeGrid() - error: ' + e );
                }
        }
        function gridChooseColor (data) {
            try {
                #include './AI_PS_Library.js';
                var color = app.showColorPicker( $.color(data.type, data.values) ),
                    values = color.getColorValues();
                return jsonStringify({
                    values: values,
                    hex: '#' + $.convertColor(color, 'hex')
                });
            }
                catch (e) {
                    alert( 'gridChooseColor() - error: ' + e );
                }
        }
        function convertToHEXColor (data) {
            try {
                #include './AI_PS_Library.js';
                return '#' + $.convertColor($.color(data.type, data.values), 'hex');
            }
                catch (e) {
                    alert( 'convertToHEXColor() - error: ' + e );
                }
        }

    // setMaker
        function createSetMaker (data) {
            try {
                (function () {
                    if (documents.length && selection.length) {
                        #include './AI_PS_Library.js';
                        selection.setMaker(data);
                    }
                        else if (documents.length) {
                            alert( 'Not selected items!' );
                        }
                } ());

                return 'Completed!';
            }
                catch (e) {
                    alert( 'createSetMaker() - error: ' + e );
                }
        }

    // stepper
        function createStepper (data) {
            try {
                (function () {
                    if (documents.length && selection.length) {
                        #include './AI_PS_Library.js';
                        selection.stepArepeat(data);
                    }
                        else if (documents.length) {
                            alert( 'Not selected items!' );
                        }
                } ());

                return 'Completed!';
            }
                catch (e) {
                    alert( 'createStepper() - error: ' + e );
                }
        }


}
    catch (e) {
        alert( 'host - system error: ' + e);
    }