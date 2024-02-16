function CHECK_SELECTION() 
{
	// есть ли открытые документы
	if( app.documents.length < 1 ) 
	{
		alert( "There are no open documents!");
		return false;
	};// if
	// активный документ
	AD = app.activeDocument;
	// активный слой
	AL = AD.activeLayer;
	// выделение в активном документе
	the_sel = AD.selection;
	// количество объектов в активном документе
	N_sel = the_sel.length;
	// выбранный слой
	SL = AL;
	// количество слоев в активном документе
	AD_LL = AD.layers.length;
	//получаем размеры выделения
	SELECTION_DIM();
	// выход если направляющие в выделении
	if( exit_if_guide ) 
	{
		var TF_guides_STR = TF_guides ? "\nand/or text frames with text path converted to guide" : "";
		alert("There are some selected guides" + TF_guides_STR +"!\n"+"Can not process that!");
		return false;
	};// if
	// выход если выделение непригодно для операции
	if( exit_if_bad_sel )
	{
		alert("Can not process the selection!");
		return false;
	};// if
	// получаем единицы измерения в документе
	UNITS_INDEX = GET_DOC_UNITS_INDEX(); // индекс
	UNITS_TEXT = UNITS_LIST[ UNITS_INDEX ]; // текстовое значение
	// дополняем опцию для каждого объекта в выделении
	EACH_OBJ_OPTION = EACH_OBJ_OPTION +" ("+N_sel+" objects)";
	// дополняем опцию для артборда
	try
	{
		// если версия программы позволяет создавать артборды
		if( AD.hasOwnProperty("artboards") )
		{
			// количество артбордов в активном документе
			N_AB = AD.artboards.length;
			// если в активном документе больше 1 артборда
			if( N_AB > 1 )
			{
				// получаем индекс активного артборда
				var AA_INDEX = AD.artboards.getActiveArtboardIndex();
				// получаем активный артборд
				AA = AD.artboards[ AA_INDEX ];
				// добавляем имя артборда к опции для артборда
				AB_OPTION = "Active artboard";
				// если у активного артборда есть имя
				if( AA.hasOwnProperty("name") )
				{
					// добавляем имя активного артборда
					AB_OPTION = AB_OPTION +" ("+ unescape( AA.name ) + ")";
				}
				// если у активного артборда нет имени
				else
				{
					// добавляем номер активного артборда 
					AB_OPTION = AB_OPTION +" (Artboard "+ ( AA_INDEX +1 ).toString() + ")";
				};// if-else
				// дополняем опцию для всех артбордов
				EACH_AB_OPTION = EACH_AB_OPTION + " ("+N_AB+" items)";
			};// if
		};// if
	} catch ( error ) {};// try-catch
	// заполняем массив имен свотчей
	// самая первая опция Registration Auto 
	SWATCHES.push( "Registration (Auto)" );
	// цикл по свотчам документа
	for( var i = 0; i < AD.swatches.length; i++) 
	{
		// заполняем массив свотчей
		SWATCHES.push( AD.swatches[i].name );
	};// for i
	return true;
};