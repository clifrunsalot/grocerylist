
/*
* Panel view behavior
*
*/
var panelViewController = function(){

	var that = {};
	var foodGroupList = '';
	var nonfoodGroupList = [];

	that.populateSelectionList = function(lst){
	
		// Remove old selection references.
		$('#fieldItems').remove();

		// Now, rebuild it.
		var fieldSet = $('<fieldset>');
		fieldSet.attr({'id':'fieldItems'});
		
		var selectName = 'foodGroupsSelection';
		var label = $('<label>');
		label.attr({'for':selectName,'class':'select'});
		
		var select = $('<select>');
		select.attr({'name':selectName,'id':selectName});
		
		var foodType = 'Food';
		var optgroupFood = $('<optgroup>');
		optgroupFood.attr({'label':foodType});
		
		var nonfoodType = 'NonFood';
		var optgroupNonfood = $('<optgroup>');
		optgroupNonfood.attr({'label':nonfoodType});
		
		for(var i = 0; i < lst.length; i++){
		
			var opt = $('<option>');
			if (lst[i].getType().toUpperCase() == foodType.toUpperCase()){
				opt.attr({'value': lst[i].getTitle()}).append(lst[i].getTitle()).appendTo(optgroupFood);
			} else if (lst[i].getType().toUpperCase() == nonfoodType.toUpperCase()){
				opt.attr({'value': lst[i].getTitle()}).append(lst[i].getTitle()).appendTo(optgroupNonfood);
			}
		}
		optgroupFood.appendTo(select);
		optgroupNonfood.appendTo(select);
		select.appendTo(fieldSet);
		label.appendTo(fieldSet);
		fieldSet.appendTo($('#selectItems'));
		fieldSet.trigger('change');
	
	};
	
	that.resetSelectionPanel = function(fds, nonfds){
	
		// populate new item panel
		var _items = [];
		for(var i=0; i<fds.length; i++){
			_items.push(fds[i]);
		}
		
		for(var j=0; j<nonfds.length; j++){
			_items.push(nonfds[j]);
		}
		
		that.populateSelectionList(_items);
	};
	
	return that;
};

/*
* List view behavior
*
*/
var groceryListViewController = function(){

	var that = {};
	
	that.loadItems = function(divId, lstId, lst){
		
		var itmName;
		var choiceName;
		var ref;
		var divBlk;
		var editRef;
		var toggleRef;
		var deleteRef;
		var lstName;
		var itmType = (divId.match(/nonfood/)) ? 'nonfood' : 'food';

		// Assemble ul tag and append to div tag.
		$('<ul>').attr({'id':lstId,'data-role':'listview','data-inset':'true','data-filter':'true','data-input':'#myFilter'}).appendTo('#' + divId);
		
		// Assemble each il tag and append to ul tag.
		for(var i = 0; i < lst.length; i++){
			if (lst[i].isSelected()){

				itmName = lst[i].getTitle();
				lstName = (itmName + 'lst').replace(' ','');
				choiceName = (itmName + 'choice').replace(' ','');

				ref = $('<a>').attr({'id':lstName,'href':'#','onclick':'showChoices(' + choiceName + ');','class':'ui-btn ui-btn-icon-right ui-icon-plus'}).css({'background':'#ABEBC6','text-shadow':'none'});
				
				$(ref).append(itmName);
				
				toggleRef = $("<a href=\"#\" onclick=\"toggle(\'" + lstName + "\',\'" + itmType + "\');\"><p><h2 style=\"padding: 10px 10px 10px 10px\">Toggle</h2></a></p>");
				
				editRef = $("<a href=\"#\" onclick=\"editItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Edit</h2></a>");
				
				deleteRef = $("<a href=\"#\" onclick=\"deleteItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Delete</h2></a>");
				
				divBlk = $('<div>').attr('id',choiceName).css({'display':'none','text-align':'center','padding':'10px 10px 10px 10px','background':'#D5DBDB'}).append($(editRef)).append($(deleteRef)).append($(toggleRef));

				$('<li>').append($(ref)).append($(divBlk)).appendTo('#' + lstId);
				
			} else {

				itmName = lst[i].getTitle();
				lstName = (itmName + 'lst').replace(' ','');
				choiceName = (itmName + 'choice').replace(' ','');

				ref = $('<a>').attr({'id':lstName,'href':'#','onclick':'showChoices(' + choiceName + ');','class':'ui-btn ui-btn-icon-right ui-icon-minus'}).css({'background':'#F9E79F','text-shadow':'none'});
				
				$(ref).append(itmName);
				
				toggleRef = $("<a href=\"#\" onclick=\"toggle(\'" + lstName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Toggle</h2></a>");
				
  				editRef = $("<a href=\"#\" onclick=\"editItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Edit</h2></a>");
				
				deleteRef = $("<a href=\"#\" onclick=\"deleteItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Delete</h2></a>");
				
				divBlk = $('<div>').attr('id',choiceName).css({'display':'none','text-align':'center','padding':'10px 10px 10px 10px','background':'#D5DBDB'}).append($(editRef)).append($(deleteRef)).append($(toggleRef));

				$('<li>').append($(ref)).append($(divBlk)).appendTo('#' + lstId);
			}

	  	}
	  	
	    // Refresh the view.
	    $('#' + lstId).listview().listview('refresh');

	};
	
	that.clearList = function(divId, lstId){
	
		$('#' + lstId).remove();
		// Assemble ul tag and append to div tag.
		$('<ul>').attr({'id':lstId,'data-role':'listview','data-split-icon':'gear','data-split-theme':'a','data-inset':'true','data-filter':'true','data-input':'#myFilter'}).appendTo('#' + divId);
		
	    $('<li data-icon=\"false\">').append('<a href=\"#\">Empty</a></li>').appendTo('#' + lstId);
	
	    $('#' + lstId).listview().listview('refresh');
	    
	};
	
	that.resetList = function(divId, lstId, lst){
		$('#' + lstId).remove();
		that.loadItems(divId, lstId, lst);
	};
	
	return that;

};

/*
* Controller component.
*
* Use this to manage behavior of application.
*
*/
var controller = function(){

	var that = {};
	var panelViewCntl = panelViewController();
	var groceryViewCntl = groceryListViewController();
	var groceries = {}; 
	
	/****************************
	*
	* grocerylist management
	*
	***************************/

	that.clear = function(lstId){
		groceryViewCntl.clearList('foodDiv','foodItems');
		groceryViewCntl.clearList('nonfoodDiv','nonfoodItems');
		foods = groceries.getFoodItems();
		nonfoods = groceries.getNonfoodItems();
		that.setGroceries(grocerylist());
	};
	
	that.getGroceries = function(){
		return groceries;
	};
	
	that.setGroceries = function(groceryList){
		groceries = groceryList;
	};
	
	that.reloadGroceries = function(){
		that.preloadData();
		foods = groceries.getFoodItems();
		nonfoods = groceries.getNonfoodItems();
		groceryViewCntl.resetList('foodDiv','foodItems',foods);
		groceryViewCntl.resetList('nonfoodDiv','nonfoodItems',nonfoods);
	};
	
	that.setSelection = function(itemName, itemType, isSelected){

		var itm = null;
		var found = null;
		if(itemType.trim().toUpperCase() == 'food'.toUpperCase()){
			itm = food({title: itemName, quantity:1, pricePerUnit:1.00, selected:false});
			found = that.getGroceries().getItem(itm);
			if (found != null){
				found.setSelected(isSelected);
			}
		} else if(itemType.trim().toUpperCase() == 'nonfood'.toUpperCase()){
			itm = nonfood({title: itemName, quantity:1, pricePerUnit:1.00, selected:false});
			found = that.getGroceries().getItem(itm);
			if (found != null){
				found.setSelected(isSelected);
			}
		}
	
	};
	
	/****************************
	*
	* List item dropdown menu
	*
	*****************************/
	
	that.showChoices = function(e){
	
	    if ($(e).css('display') == 'none') {
	        $(e).slideDown('fast');
	    } else {
	        $(e).slideUp('fast');
	    }
	}
	
	that.toggle = function(id,itmType){
	
		var elemId = id.replace('lst','');
		id = ('#' + id).replace(' ','');
		var choice = ('#' + elemId + 'choice').replace(' ','');
	
		if ($(id).hasClass('ui-icon-plus')){
		
			$(id).removeClass('ui-icon-plus').addClass('ui-icon-minus');
			$(id).css({'background':'#F9E79F','text-shadow':'none'});
			that.setSelection(elemId,itmType,false);
			$(choice).slideUp('fast');
			
		} else if ($(id).hasClass('ui-icon-minus')){
	
			$(id).addClass('ui-icon-plus').removeClass('ui-icon-minus');
			$(id).css({'background':'#ABEBC6','text-shadow':'none'});
			that.setSelection(elemId,itmType,true);
			$(choice).slideUp('fast');
	
		}
	}
	
	/*******************
	*
	* Item manipulation
	*
	********************/
	
	that.addDefaultItemToList = function(){

		var lst = that.getGroceries();
		var newItem = $('#foodGroupsSelection').val();
		var type = $(':selected','#foodGroupsSelection').parent().attr('label');
		if(type.trim().toUpperCase() == 'food'.toUpperCase()){
			if(lst.addFoodItem(newItem,1,1.00,false)){
				that.updateList();
			} else {
				alert("Item exists on the list");
			}
		} else if (type.trim().toUpperCase() == 'nonfood'.toUpperCase()){
			if(lst.addNonfoodItem(newItem,1,1.00,false)){
				that.updateList();
			} else {
				alert("Item exists on the list");
			}
		} else {
			alert('Application error. Call for help.');
		}
	};
	
	that.addNewItemToList = function(){
	
		var lst = that.getGroceries();
		var newItem = $('#itemName').val();
		var newType = $('#typeSelection').val();

		if (newItem.trim() != ''){

			if (newType.trim().toUpperCase() == 'food'.toUpperCase()){
				if(lst.addFoodItem(newItem,1,1.00,false)){
					that.updateList();
				} else {
					alert("Item exists on the list");
				}
			} else if (newType.trim().toUpperCase() == 'nonfood'.toUpperCase()){
				if(lst.addNonfoodItem(newItem,1,1.00,false)){
					that.updateList();
				} else {
					alert("Item exists on the list");
				}
			} else {
				alert('Application error. Call for help.');
			}
		
		} else {
			alert("Please enter a name.");
		}
	};
	
	that.deleteItem = function(itmName,itmType){
		alert('deleteItem: \n' + itmName + '\n' + itmType);
		var choice = ('#' + itmName + 'choice').replace(' ','').replace('lst','');
		$(choice).slideUp('fast');
	}
	
	that.editItem = function(itmName,itmType){
	
		var itm;
		if (itmType.toUpperCase() == 'food'.toUpperCase()){
			itm = food({title: itmName, quantity:1, pricePerUnit:1.00, selected:false});
		} else if(itmType.toUpperCase() == 'nonfood'.toUpperCase()){
			itm = nonfood({title: itmName, quantity:1, pricePerUnit:1.00, selected:false});
		}
	
		var edt = that.getGroceries().getItem(itm);
		if (typeof edt == 'object'){
			alert('found: \n' + edt.getTitle() + '\n' + edt.getType() + '\n' + edt.getQuantity() + '\n' + edt.getPricePerUnit() + '\n' + edt.isSelected());
		} else {
			alert('not found: ' + itmName);
		} 
		var choice = ('#' + itmName + 'choice').replace(' ','').replace('lst','');
		$(choice).slideUp('fast');
	}
	
	/***************************
	*
	* List manipulation
	*
	****************************/
	
	that.updateList = function(){
		foods = groceries.getFoodItems();
		nonfoods = groceries.getNonfoodItems();
		groceryViewCntl.resetList('foodDiv','foodItems',foods);
		groceryViewCntl.resetList('nonfoodDiv','nonfoodItems',nonfoods);
	};
	
	/*
	* Use this to load the default data.
	*
	*/
	that.preloadData = function(){
	
		// Load default data
		defaultList = sourceData();
		defaultList.build();

		groceries = grocerylist();
		groceries.replaceFoodItems(defaultList.getFoods());
		groceries.replaceNonfoodItems(defaultList.getNonfoods());
		
		foods = groceries.getFoodItems();
		nonfoods = groceries.getNonfoodItems();
		panelViewCntl.resetSelectionPanel(foods, nonfoods);
		
	};
	
	return that;
};

/*
*
* Public functions available to webpage upon display.
*
*/
function showChoices(itemName){
	cntl.showChoices(itemName);
}

function toggle(itemName,itemType){
	cntl.toggle(itemName,itemType);
}

function editItem(itemName,itemType){
	cntl.editItem(itemName,itemType);
}

function deleteItem(itemName,itemType){
	cntl.deleteItem(itemName,itemType);
}