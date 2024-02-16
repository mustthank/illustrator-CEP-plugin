/* 
    Object.stroke( strokeWidth, colorType, colorValues );

    * width : String or Boolean
    * type : String
    * values : Array

    * Example: activeDocument.pathItems.stroke( '10 mm', 'hex', '00c8ff' );
    * return the same items and replace the color of the stroke and replace stroke width

    * Example: activeDocument.pathItems.stroke( 'hex', '00c8ff' )
    * return the same items and replace the color

    * Example: activeDocument.pathItems.stroke( '10 mm' )
    * the same items and replace stroke width

    * Example: activeDocument.pathItems.stroke( false, 'hex', '00c8ff' );
    * return the same items and replace the color and stoked = false

    * Example: activeDocument.pathItems.stroke( 'random' );
    * return the same items and replace the color and stokedWidth

*/

if (selection.length) {
    selection.stroke('random');
}
    else {
        alert('No such elements!');
    }
