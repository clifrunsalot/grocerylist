/*
* Returns true if checkThis value is valid.
*
* checkThis - Value to validate
* errType - Name of error type
* errMsg - Error message
*
*/
function isValidString(checkThis, errMsg){

	if (checkThis !== '' && typeof checkThis == 'string'){
		return true;
	} else {
		throw new TypeError(errMsg);
	}
}

/*
* Returns true if checkThis value is valid.
*
* checkThis - Value to validate
* errType - Name of error type
* errMsg - Error message
*
*/
function isValidNumber(checkThis, errMsg){

	if ( checkThis > 0 && typeof checkThis == 'number' && isFinite(checkThis)){
		return true;
	} else {
		throw new TypeError(errMsg);
	}
}

/*
* Returns value with first letter capitalized, empty string
* if empty or invalid, or digit.
*
* str - Value to convert.
*
*/
function titleCase(str){
	var output = '';
	if (str.trim().length > 0 && isValidString(str.trim())){
		var tmp = str.trim();
		var len = tmp.length;
		output = tmp[0].toUpperCase() + tmp.substring(1, len);
	} else if(str == /\d+/){
		output = str;
	} else {
		output = '';
	}
	return output;
}

/*
* Item class
*
* Defines basic attributes of an item.
*
*/
var item = function(spec){

	var that = {};
	var title = '';
	var quantity = 0;
	var pricePerUnit = 0.00;
	var selected = false;
	
	try {
	
		if (!spec.hasOwnProperty('title')) throw new TypeError('"title" property missing.');

		if (!spec.hasOwnProperty('quantity')) throw new TypeError('"quantity" property missing.');

		if (!spec.hasOwnProperty('pricePerUnit')) throw new TypeError('"pricePerUnit" property missing.');

		if (!spec.hasOwnProperty('selected')) throw new TypeError('"selected" property missing.');
		
		if (isValidString(spec.title, 'Title must not be an empty string.') &&
			isValidNumber(spec.quantity, 'Quantity must be a NUMBER and greater than 0.') &&
			isValidNumber(spec.pricePerUnit, 'Price Per Unit must be a NUMBER and greater than 0.')){
			
			title = spec.title.toLowerCase().split(' ').map(titleCase).join(' ');
			quantity = spec.quantity;
			pricePerUnit = spec.pricePerUnit;
			selected = spec.selected;

		}

	} catch(e){
		throw(e);
	}

	that.getTitle = function(){
		return title;
	};

	that.getQuantity = function(){
		return quantity;
	};

	that.getPricePerUnit = function(){
		return pricePerUnit;
	};
	
	that.isSelected = function(){
		return selected || false;
	};

	that.setQuantity = function(qty){
		quantity = qty;
	};

	that.setPricePerUnit = function(price){
		pricePerUnit = price;
	};
	
	that.setSelected = function(isSelected){
		selected = isSelected;
	};

	return that;
};

/*
*
* Food child class.
*
*/
var food = function(spec){

	try {
	
		var that = item({title: spec.title, 
						quantity: spec.quantity, 
						pricePerUnit: spec.pricePerUnit,
						selected: spec.selected});
	
		that.getType = function(){
			return 'food';
		};
		
	} catch(e) {
	
		alert('Error: ' + e.message +
		  '\n\nTitle: ' + spec.title +
		 '\nQuantity: ' + spec.quantity +
		    '\nPrice: ' + spec.pricePerUnit +
		   '\nSelect: ' + spec.selected);

		throw(e);
	
	}
	
	return that;
};

/*
*
* Non-food child class.
*
*/
var nonfood = function(spec){

	try{
	
		var that = item({title: spec.title,
						quantity: spec.quantity,
						pricePerUnit: spec.pricePerUnit,
						selected: spec.selected});
	
		that.getType = function(){
			return 'nonfood';
		};

	} catch(e) {
	
		alert('Error: ' + e.message +
		  '\n\nTitle: ' + spec.title +
		 '\nQuantity: ' + spec.quantity +
		    '\nPrice: ' + spec.pricePerUnit +
		   '\nSelect: ' + spec.selected);

		throw(e);
	
	}
	
	return that;
};

