describe('Item Class: Happy Path',function(){

	var milk = {};
	var title = 'MILK';
	var qty = 2;
	var price = 1.00;
	var selected = true;

	beforeAll(function(){
		milk = item({title: title, 
					quantity: qty, 
					pricePerUnit: price,
					selected: selected});
	});

	it('Milk title equals ' + title,function(){
		expect(milk.getTitle().toUpperCase()).toEqual(title.toUpperCase());
	});

	it('Milk quantity equals ' + qty,function(){
		expect(milk.getQuantity()).toEqual(qty);
	});

	it('Milk price per unit equals ' + price,function(){
		expect(milk.getPricePerUnit()).toEqual(price);
	});

	it('Milk selected equals ' + selected,function(){
		expect(milk.isSelected()).toEqual(selected);
	});

	it('Set milk quantity as expected',function(){
		milk.setQuantity(5);
		expect(milk.getQuantity()).toEqual(5);
	});

	it('Set milk price per unit as expected',function(){
		milk.setPricePerUnit(9.99);
		expect(milk.getPricePerUnit()).toEqual(9.99);
	});

	it('Set milk selected as expected',function(){
		milk.setSelected(false);
		expect(milk.isSelected()).toEqual(false);
	});

});

describe('Item Class: Sad Path', function(){

	var milk = {};
	
	beforeEach(
		function(){
			milk = undefined;
		}
	);
	
	it('Milk is not undefined.', function(){
		expect(
			function(){
				milk = item({title: '', quantity: 1, pricePerUnit: 1.00, selected: true});
			}
		).not.toBeUndefined();
	});

	it('Setting title = "" throws exception', function(){
		expect(
			function(){
				milk = item({title: '', quantity: 1, pricePerUnit: 1.00, selected: true});
			}
		).toThrowError(TypeError, 'Title must not be an empty string.');
	});

	it('Setting title = undefined throws exception', function(){
		expect(
			function(){
				milk = item({title: undefined, quantity: 1, pricePerUnit: 1.00, selected: true});
			}
		).toThrowError(TypeError, 'Title must not be an empty string.');
	});

	it('Setting quantity = 0 throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', quantity: 0, pricePerUnit: 1.00, selected: true});
			}
		).toThrowError(TypeError, 'Quantity must be a NUMBER and greater than 0.');
	});

	it('Setting quantity = a throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', quantity: 0, pricePerUnit: 1.00, selected: true});
			}
		).toThrowError(TypeError, 'Quantity must be a NUMBER and greater than 0.');
	});
	
	it('Setting quantity = undefined throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', quantity: undefined, pricePerUnit: 1.00, selected: true});
			}
		).toThrowError(TypeError, 'Quantity must be a NUMBER and greater than 0.');
	});
	
	it('Setting pricePerUnit = 0 throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', quantity: 1, pricePerUnit: 0, selected: true});
			}
		).toThrowError(TypeError, 'Price Per Unit must be a NUMBER and greater than 0.');
	});

	it('Setting pricePerUnit = a throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', quantity: 1, pricePerUnit: 'a', selected: true});
			}
		).toThrowError(TypeError, 'Price Per Unit must be a NUMBER and greater than 0.');
	});
	
	it('Setting pricePerUnit = undefined throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', quantity: 1, pricePerUnit: undefined, selected: true});
			}
		).toThrowError(TypeError, 'Price Per Unit must be a NUMBER and greater than 0.');
	});
	
	it('Creating item without title property throws exception', function(){
		expect(
			function(){
				milk = item({quantity: 1, pricePerUnit: 1.00, selected: true});
			}
		).toThrowError(TypeError, '"title" property missing.');
	});
	
	it('Creating item without quantity property throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', pricePerUnit: 1.00, selected: true});
			}
		).toThrowError(TypeError, '"quantity" property missing.');
	});
	
	it('Creating item without pricePerUnit property throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', quantity: 1, selected: true});
			}
		).toThrowError(TypeError, '"pricePerUnit" property missing.');
	});
	
	it('Creating item without selected property throws exception', function(){
		expect(
			function(){
				milk = item({title: 'milk', pricePerUnit: 1.00, quantity: 1});
			}
		).toThrowError(TypeError, '"selected" property missing.');
	});
	
});

/*
*
* Food item test.
*
*/
describe('Food Item Class: Happy Path',function(){

	var milk = {};
	var title = 'MILK';
	var qty = 2;
	var price = 1.00;
	var selected = false;

	beforeAll(function(){
		milk = food({title: title, 
			quantity: qty, 
			pricePerUnit: price,
			selected: selected});
	});
	
	it('Milk item is a food object', function(){
		expect(typeof milk == 'object' && milk.getType()).toBe('food');
	});
	
	it('Milk item is not a nonfood object', function(){
		expect(typeof milk == 'object' && milk.getType()).not.toBe('nonfood');
	});

	it('Milk title equals ' + title,function(){
		expect(milk.getTitle().toUpperCase()).toEqual(title.toUpperCase());
	});

	it('Milk quantity equals ' + qty,function(){
		expect(milk.getQuantity()).toEqual(qty);
	});

	it('Milk price per unit equals ' + price,function(){
		expect(milk.getPricePerUnit()).toEqual(price);
	});

	it('Milk selected equals ' + selected,function(){
		expect(milk.isSelected()).toEqual(selected);
	});

	it('Set milk quantity as expected',function(){
		milk.setQuantity(5);
		expect(milk.getQuantity()).toEqual(5);
	});

	it('Set milk price per unit as expected',function(){
		milk.setPricePerUnit(9.99);
		expect(milk.getPricePerUnit()).toEqual(9.99);
	});

	it('Set milk selected as expected',function(){
		milk.setSelected(false);
		expect(milk.isSelected()).toEqual(false);
	});

});
	
describe('Non-food Item Class: Happy Path',function(){

	var paper = {};
	var title = 'PAPER';
	var qty = 2;
	var price = 1.00;
	var selected = true;

	beforeAll(function(){
		paper= nonfood({title: title, 
			quantity: qty, 
			pricePerUnit: price,
			selected: selected});
	});
	
	it('Paper item is a nonfood object', function(){
		expect(typeof paper == 'object' && paper.getType()).toBe('nonfood');
	});
	
	it('Paper item is not a food object', function(){
		expect(typeof paper == 'object' && paper.getType()).not.toBe('food');
	});

	it('Paper title equals ' + title,function(){
		expect(paper.getTitle().toUpperCase()).toEqual(title.toUpperCase());
	});

	it('Paper quantity equals ' + qty,function(){
		expect(paper.getQuantity()).toEqual(qty);
	});

	it('Paper price per unit equals ' + price,function(){
		expect(paper.getPricePerUnit()).toEqual(price);
	});

	it('Paper selected equals ' + selected,function(){
		expect(paper.isSelected()).toEqual(selected);
	});

	it('Set paper quantity as expected',function(){
		paper.setQuantity(5);
		expect(paper.getQuantity()).toEqual(5);
	});

	it('Set paper price per unit as expected',function(){
		paper.setPricePerUnit(9.99);
		expect(paper.getPricePerUnit()).toEqual(9.99);
	});

	it('Set paper selected as expected',function(){
		paper.setSelected(false);
		expect(paper.isSelected()).toEqual(false);
	});

});

describe('Grocery Food List Class: Happy Path', function(){

	var list = {};
	
	beforeAll(function(){
		list = grocerylist();
	});
	
	it('Food List is empty', function(){
		expect(list.getFoodItems().length).toBe(0);
	});
	
	it('Added pickles, 1, 1.00, false', function(){
	
		list.addFoodItem('pickles',1,1.00,false);
		expect(list.getFoodItems().length).toBe(1);
		expect(list.getFoodItems()[0].getTitle().toUpperCase()).toBe('pickles'.toUpperCase());
		expect(list.getFoodItems()[0].getQuantity()).toBe(1);
		expect(list.getFoodItems()[0].getPricePerUnit()).toBe(1.00);
		expect(list.getFoodItems()[0].isSelected()).toBe(false);
		list.removeFoodItem(food({title:'pickles',quantity:1,pricePerUnit:1.00,selected:false}));
		expect(list.getFoodItems().length).toBe(0);
	
	});
	
	it('Added milk; Food List size = 1', function(){
		list.addFoodItem('milk',1,1.50,true);
		expect(list.getFoodItems().length).toBe(1);
	});

	it('Added onion; Food List size = 2', function(){
		list.addFoodItem('onion',2,2.50,true);
		expect(list.getFoodItems().length).toBe(2);
	});

	it('Removed milk; Food List size = 1', function(){
		list.removeFoodItem(food({title:'milk',quantity:1,pricePerUnit:1.00,selected:true}));
		expect(list.getFoodItems().length).toBe(1);
	});

	it('Removed onion; Food List size = 0', function(){
		list.removeFoodItem(food({title:'onion',quantity:1,pricePerUnit:1.00,selected:true}));
		expect(list.getFoodItems().length).toBe(0);
	});
	
	it('Replaced list with single element', function(){
		var newList = [];
		var title = 'MEAT';
		var qty = 3;
		var price = 3.50;
		var selected = true;

		expect(newList).toBeDefined();
		var meat = food({title: title, 
						quantity: qty, 
						pricePerUnit: price,
						selected: true});
		newList.push(meat);
		list.replaceFoodItems(newList);
		expect(list.getFoodItems().length).toBe(1);
		expect(list.getFoodItems()[0].getTitle().toUpperCase()).toBe(title.toUpperCase());
		expect(list.getFoodItems()[0].getQuantity()).toBe(qty);
		expect(list.getFoodItems()[0].getPricePerUnit()).toBe(price);
		expect(list.getFoodItems()[0].isSelected()).toBe(true);
	});
	
	describe('Test adding existing items', function(){

		var foods = [];
		var nonfoods = [];
		var groceries = {};
		var cntl = {};
		var origSize = 0;
		
		var foodtitle = 'milk';
		var nonfoodtitle = 'paper';
		var qty = 1;
		var price = 1.00;
		var selected = true;
		var fooditm = null;
		var nonfooditm = null;
			
		beforeEach(function(){

			cntl = controller();
			groceries = grocerylist();
			
			fooditm = food({title: foodtitle, 
								quantity: qty, 
								pricePerUnit: price, 
								selected: selected});
			
			foods.push(fooditm);
			groceries.replaceFoodItems(foods);
							
			nonfooditm = nonfood({title: nonfoodtitle, 
										quantity: qty, 
										pricePerUnit: price, 
										selected: selected});
			
			nonfoods.push(nonfooditm);
			groceries.replaceNonfoodItems(nonfoods);
	
			cntl.setGroceries(groceries);
		});
		
		it('Adding existing items failed as expected',function(){
			expect(cntl.getGroceries().getFoodItems().length).toBe(1);
			expect(cntl.getGroceries().getNonfoodItems().length).toBe(1);
			
			expect(cntl.getGroceries().exists(fooditm)).toBe(true);
			expect(cntl.getGroceries().exists(nonfooditm)).toBe(true);
		});
	
		it('Checking existing items passed as expected',function(){
			expect(cntl.getGroceries().exists(fooditm)).not.toBe(false);
			expect(cntl.getGroceries().exists(nonfooditm)).not.toBe(false);
		});
		
		it('Found existing food item as expected',function(){
			expect(cntl.getGroceries().getItem(fooditm).getTitle()).toBe(fooditm.getTitle());
			expect(cntl.getGroceries().getItem(fooditm).getQuantity()).toBe(fooditm.getQuantity());
			expect(cntl.getGroceries().getItem(fooditm).getPricePerUnit()).toBe(fooditm.getPricePerUnit());
			expect(cntl.getGroceries().getItem(fooditm).isSelected()).toBe(fooditm.isSelected());
		});
		
		it('Found existing nonfood item as expected',function(){
			expect(cntl.getGroceries().getItem(nonfooditm).getTitle()).toBe(nonfooditm.getTitle());
			expect(cntl.getGroceries().getItem(nonfooditm).getQuantity()).toBe(nonfooditm.getQuantity());
			expect(cntl.getGroceries().getItem(nonfooditm).getPricePerUnit()).toBe(nonfooditm.getPricePerUnit());
			expect(cntl.getGroceries().getItem(nonfooditm).isSelected()).toBe(nonfooditm.isSelected());
		});
		
	});
	
});
	
describe('Modified item as expected',function(){
	
	var foods = [];
	var nonfoods = [];
	var groceries = {};
	var cntl = {};
	var origSize = 0;
	
	var foodtitle = 'milk';
	var nonfoodtitle = 'paper';
	var qty = 1;
	var price = 1.00;
	var selected = true;
	var fooditm = null;
	var nonfooditm = null;
		
	beforeEach(function(){

		cntl = controller();
		groceries = grocerylist();
		
		fooditm = food({title: foodtitle, 
							quantity: qty, 
							pricePerUnit: price, 
							selected: selected});
		
		foods.push(fooditm);
		groceries.replaceFoodItems(foods);
						
		nonfooditm = nonfood({title: nonfoodtitle, 
									quantity: qty, 
									pricePerUnit: price, 
									selected: selected});
		
		nonfoods.push(nonfooditm);
		groceries.replaceNonfoodItems(nonfoods);

		cntl.setGroceries(groceries);
	});
	

	it('Modified food item as expected',function(){
	
		_itm = cntl.getGroceries().getItem(fooditm);
		cntl.setSelection(_itm.getTitle(),'food',false);
		
		expect(_itm.getTitle()).toBe(fooditm.getTitle());

		_itm.setQuantity(6);
		expect(_itm.getQuantity()).toBe(6);

		_itm.setPricePerUnit(9.99);
		expect(_itm.getPricePerUnit()).toBe(9.99);
		
		_itm.setSelected(true);
		expect(_itm.isSelected()).toBe(fooditm.isSelected());

	});

	it('Modified nonfood item as expected',function(){
	
		_itm = cntl.getGroceries().getItem(nonfooditm);
		cntl.setSelection(_itm.getTitle(),'nonfood',false);
		
		expect(_itm.getTitle()).toBe(nonfooditm.getTitle());

		_itm.setQuantity(6);
		expect(_itm.getQuantity()).toBe(6);

		_itm.setPricePerUnit(9.99);
		expect(_itm.getPricePerUnit()).toBe(9.99);
		
		_itm.setSelected(true);
		expect(_itm.isSelected()).toBe(nonfooditm.isSelected());

	});

});

describe('Deleted item as expected',function(){
	
	var foods = [];
	var nonfoods = [];
	var groceries = {};
	var cntl = {};
	var origSize = 0;
	
	var foodtitle = 'milk';
	var nonfoodtitle = 'paper';
	var qty = 1;
	var price = 1.00;
	var selected = true;
	var fooditm = null;
	var nonfooditm = null;
	var _itm = null;
		
	beforeAll(function(){

		cntl = controller();
		groceries = grocerylist();
		
		fooditm = food({title: foodtitle, 
							quantity: qty, 
							pricePerUnit: price, 
							selected: selected});
		
		foods.push(fooditm);
		groceries.replaceFoodItems(foods);
						
		nonfooditm = nonfood({title: nonfoodtitle, 
									quantity: qty, 
									pricePerUnit: price, 
									selected: selected});
		
		nonfoods.push(nonfooditm);
		groceries.replaceNonfoodItems(nonfoods);

		cntl.setGroceries(groceries);
	});
	

	it('Deleted food item as expected',function(){
	
		_itm = cntl.getGroceries().getItem(fooditm);
		expect(_itm.getTitle().toUpperCase()).toBe(foodtitle.toUpperCase());
		expect(foods.length).toBe(1);
		cntl.getGroceries().removeFoodItem(_itm);

		fooditm = food({title: foodtitle, 
							quantity: qty, 
							pricePerUnit: price, 
							selected: selected});
		
		expect(cntl.getGroceries().getItem(fooditm)).toBe(null);
		expect(foods.length).toBe(0);
		
	});

	it('Deleted nonfood item as expected',function(){
	
		_itm = cntl.getGroceries().getItem(nonfooditm);
		expect(_itm.getTitle().toUpperCase()).toBe(nonfoodtitle.toUpperCase());
		expect(nonfoods.length).toBe(1);
		cntl.getGroceries().removeNonfoodItem(_itm);

		nonfooditm = food({title: nonfoodtitle, 
							quantity: qty, 
							pricePerUnit: price, 
							selected: selected});
		
		expect(cntl.getGroceries().getItem(nonfooditm)).toBe(null);
		expect(nonfoods.length).toBe(0);

	});

});


describe('Grocery Nonfood List Class: Happy Path', function(){

	var list = {};
	
	beforeAll(function(){
		list = grocerylist();
	});
	
	it('Nonfood List is empty', function(){
		expect(list.getNonfoodItems().length).toBe(0);
	});
	
	it('Added pliers; Nonfood List size = 1', function(){
		list.addNonfoodItem('pliers',1,1.50);
		expect(list.getNonfoodItems().length).toBe(1);
	});

	it('Added paper; Nonfood List size = 2', function(){
		list.addNonfoodItem('paper',2,2.50);
		expect(list.getNonfoodItems().length).toBe(2);
	});

	it('Removed pliers; Nonfood List size = 1', function(){
		list.removeNonfoodItem(nonfood({title:'pliers',quantity:1,pricePerUnit:1.50,selected:true}));
		expect(list.getNonfoodItems().length).toBe(1);
	});

	it('Removed paper; Nonfood List size = 0', function(){
		list.removeNonfoodItem(nonfood({title:'paper',quantity:1,pricePerUnit:1.00,selected:true}));
		expect(list.getNonfoodItems().length).toBe(0);
	});
	
	it('Replaced list with single element', function(){
		var newList = [];
		var title = 'TIRE';
		var qty = 3;
		var price = 3.50;
		var selected = true;

		expect(newList).toBeDefined();
		var tire = nonfood({title: title, 
						quantity: qty, 
						pricePerUnit: price,
						selected: true});
		newList.push(tire);
		list.replaceNonfoodItems(newList);
		expect(list.getNonfoodItems().length).toBe(1);
		expect(list.getNonfoodItems()[0].getTitle().toUpperCase()).toBe(title.toUpperCase());
		expect(list.getNonfoodItems()[0].getQuantity()).toBe(qty);
		expect(list.getNonfoodItems()[0].getPricePerUnit()).toBe(price);
		expect(list.getNonfoodItems()[0].isSelected()).toBe(true);
		
	});

});

describe('Grocery List populated with data file contents', function(){

	var list = {};
	var localList = {};
	
	beforeAll(function(){
		list = sourceData();
		list.build();
		localList = grocerylist();
		localList.replaceFoodItems(list.getFoods());
		localList.replaceNonfoodItems(list.getNonfoods());
	});
	
	it('Food list populated with file content',function(){
		expect(localList.getFoodItems().length).toBeGreaterThan(1);
	});
	
	it('Nonfood list populated with file content', function(){
		expect(localList.getNonfoodItems().length).toBeGreaterThan(1);
	});

});


describe('Test string title case method works',function(){

	var uncased = 'one two three 1';
	var cased = 'One Two Three 1';
	
	it(uncased + ' = ' + cased, function(){
		var uncasedAry = uncased.split(' ');
		expect(uncasedAry.map(titleCase).join(' ')).toBe(cased);
	});
	
});

