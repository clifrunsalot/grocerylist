/*
* Provides class for initializing data model.
*
*/
var sourceData = function (){

	var that = {};
	var foods = [];
	var nonfoods = [];
	var itm = null;
	
	/*
	* Use this function to populate the foods and nonfoods lists
	* based on the data from the msb_data.js file.
	*/
	that.build = function(){
	
		var foodItem = [];
		var nonfoodItem = [];
		var bigList = [];
		var uniqBigList = [];
		
		Array.prototype.contains = function(elem){
			for(var i = 0; i<this.length; i++){
				if(this[i].title.toUpperCase() == elem.title.toUpperCase() &&
					this[i].type.toUpperCase() == elem.type.toUpperCase()){
					return true;
				}
			}
			return false;
		};

		msb_data.forEach(function(val){
			if(!uniqBigList.contains(val)){
				uniqBigList.push(val);
			}
		});

		uniqBigList.forEach(function(itm){

			if(itm.type.toUpperCase() == 'food'.toUpperCase()){
				foodItem = food({title: itm.title, 
									quantity: itm.quantity, 
									pricePerUnit: itm.pricePerUnit, 
									selected: itm.selected});
									
				foods.push(foodItem);
				
			} else if (itm.type.toUpperCase() == 'nonfood'.toUpperCase()) {
				nonfoodItem = nonfood({title: itm.title, 
									quantity: itm.quantity, 
									pricePerUnit: itm.pricePerUnit, 
									selected: itm.selected});

				nonfoods.push(nonfoodItem);
			}
		});
	};
	
	that.getFoods = function(){
		return foods;
	};
	
	that.getNonfoods = function(){
		return nonfoods;
	};
	
	that.displayFoods = function(){
		foods.forEach(function(itm){
			document.write('title: ' + itm.title + ', ' +
							'type: ' + itm.type + ', ' +
							' qty: ' + itm.quantity + ', ' +
							' ppu: ' + itm.pricePerUnit + ', ' +
							' sel: ' + itm.selected + '<br>');
		});
	};
	
	that.displayNonfoods = function(){
		nonfoods.forEach(function(itm){
			document.write('title: ' + itm.title + ', ' +
							'type: ' + itm.type + ', ' +
							' qty: ' + itm.quantity + ', ' +
							' ppu: ' + itm.pricePerUnit + ', ' +
							' sel: ' + itm.selected + '<br>');
		});
	};

	return that;
};
