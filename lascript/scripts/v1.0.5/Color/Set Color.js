var rgb  = $.color('rgb', [100,100,0]),
    cmyk = $.color('cmyk', [100,100,0,0]),
    gray = $.color('gray', 30),
    hex  = $.toHex(rgb, true),
    random = $.color('rgb', 'random');

lascripts.append( rgb.typename );
lascripts.append( rgb.getColorValues().toString(), ' - ' );
lascripts.append( cmyk.typename );
lascripts.append( cmyk.getColorValues().toString(), ' - ' );
lascripts.append( gray.typename );
lascripts.append( gray.getColorValues().toString(), ' - ' );
lascripts.append( 'hex' );
lascripts.append( hex, ' - ' );
lascripts.append( random.typename + ' random' );
lascripts.append( random.getColorValues().toString(), ' - ' );