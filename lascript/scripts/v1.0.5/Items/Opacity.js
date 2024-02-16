/*
    Object.Opacity( value );

    value =>
        undefined: object get value of the opacity - selection[0].Opacity() = return value of the opacity
        number: set value of the opacity
        string - 'random': set random value of the opacity
*/

if (selection.length) {
    lascripts.log(selection.Opacity().toString());
    selection.Opacity('random')[0].Opacity(50);
    lascripts.append('Modified: ' + selection.Opacity().toString());
}
    else {
        alert('No such elements!');
    }