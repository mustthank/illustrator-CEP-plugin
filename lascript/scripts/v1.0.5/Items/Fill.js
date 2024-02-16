/* 
    Object.fill( type or filled, color type );

   * argument[0] =>
        * Boolean: false or true - filled = argument[0];
        * String: Type Color - fill( ['hex', 'rgb', 'cmyk', 'gray'] )
        * String: 'random' - set fillColor = random color

   * argument[1] =>
        * String or Array or [Grayscale color] - Number:
            - fill('hex', '#000');
            - fill('rgb', [255,0,0] or 'random');
            - fill('cmyk', [0,100,100,0] or 'random');
            - fill('gray', 40 or 'random');

*/

if (selection.length) {
    selection.fill('hex', 'random');
}
    else {
        alert('No such elements!');
    }
