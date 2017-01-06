/*
 * Panel view behavior
 *
 */
var panelViewController = function () {

    'use strict';

    var that = {};
    var foodGroupList = '';
    var nonfoodGroupList = [];

    that.populateSelectionList = function (lst) {

        // Remove old selection references.
        $('#fieldItems').remove();

        // Now, rebuild it.
        var fieldSet = $('<fieldset>');
        fieldSet.attr({
            'id': 'fieldItems'
        });

        var selectName = 'foodGroupsSelection';
        var label = $('<label>');
        label.attr({
            'for': selectName,
            'class': 'select'
        });

        var select = $('<select>');
        select.attr({
            'name': selectName,
            'id': selectName
        });

        var foodType = 'Food';
        var optgroupFood = $('<optgroup>');
        optgroupFood.attr({
            'label': foodType
        });

        var nonfoodType = 'NonFood';
        var optgroupNonfood = $('<optgroup>');
        optgroupNonfood.attr({
            'label': nonfoodType
        });

        for (var i = 0; i < lst.length; i++) {

            var opt = $('<option>');
            if (lst[i].getType().toUpperCase() === foodType.toUpperCase()) {
                opt.attr({
                    'value': lst[i].getTitle()
                }).append(lst[i].getTitle()).appendTo(optgroupFood);
            } else if (lst[i].getType().toUpperCase() === nonfoodType.toUpperCase()) {
                opt.attr({
                    'value': lst[i].getTitle()
                }).append(lst[i].getTitle()).appendTo(optgroupNonfood);
            }
        }
        optgroupFood.appendTo(select);
        optgroupNonfood.appendTo(select);
        select.appendTo(fieldSet);
        label.appendTo(fieldSet);
        fieldSet.appendTo($('#selectItems'));
        fieldSet.trigger('change');

    };

    that.resetSelectionPanel = function (fds, nonfds) {

        // populate new item panel
        var _items = [];
        for (var i = 0; i < fds.length; i++) {
            _items.push(fds[i]);
        }

        for (var j = 0; j < nonfds.length; j++) {
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
var groceryListViewController = function () {

    'use strict';

    var that = {};

    that.loadItems = function (divId, lstId, lst) {

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
        $('<ul>').attr({
            'id': lstId,
            'data-role': 'listview',
            'data-inset': 'true',
            'data-filter': 'true',
            'data-input': '#myFilter'
        }).appendTo('#' + divId);

        // Assemble each il tag and append to ul tag.
        for (var i = 0; i < lst.length; i++) {
            if (lst[i].isSelected()) {

                itmName = lst[i].getTitle();
                lstName = (itmName + 'lst').replace(' ', '');
                choiceName = (itmName + 'choice').replace(' ', '');

                ref = $('<a>').attr({
                    'id': lstName,
                    'href': '#',
                    'onclick': 'showChoices(' + choiceName + ');',
                    'class': 'ui-btn ui-btn-icon-right ui-icon-plus'
                }).css({
                    'background': '#ABEBC6',
                    'text-shadow': 'none'
                });

                $(ref).append(itmName);

                toggleRef = $("<a href=\"#\" onclick=\"toggle(\'" + lstName + "\',\'" + itmType + "\');\"><p><h2 style=\"padding: 10px 10px 10px 10px\">Toggle</h2></a></p>");

                editRef = $("<a href=\"#\" onclick=\"editItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Edit</h2></a>");

                deleteRef = $("<a href=\"#\" onclick=\"deleteItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Delete</h2></a>");

                divBlk = $('<div>').attr('id', choiceName).css({
                    'display': 'none',
                    'text-align': 'center',
                    'padding': '10px 10px 10px 10px',
                    'background': '#D5DBDB'
                }).append($(editRef)).append($(deleteRef)).append($(toggleRef));

                $('<li>').append($(ref)).append($(divBlk)).appendTo('#' + lstId);

            } else {

                itmName = lst[i].getTitle();
                lstName = (itmName + 'lst').replace(' ', '');
                choiceName = (itmName + 'choice').replace(' ', '');

                ref = $('<a>').attr({
                    'id': lstName,
                    'href': '#',
                    'onclick': 'showChoices(' + choiceName + ');',
                    'class': 'ui-btn ui-btn-icon-right ui-icon-minus'
                }).css({
                    'background': '#F9E79F',
                    'text-shadow': 'none'
                });

                $(ref).append(itmName);

                toggleRef = $("<a href=\"#\" onclick=\"toggle(\'" + lstName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Toggle</h2></a>");

                editRef = $("<a href=\"#\" onclick=\"editItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Edit</h2></a>");

                deleteRef = $("<a href=\"#\" onclick=\"deleteItem(\'" + itmName + "\',\'" + itmType + "\');\"><h2 style=\"padding: 10px 10px 10px 10px\">Delete</h2></a>");

                divBlk = $('<div>').attr('id', choiceName).css({
                    'display': 'none',
                    'text-align': 'center',
                    'padding': '10px 10px 10px 10px',
                    'background': '#D5DBDB'
                }).append($(editRef)).append($(deleteRef)).append($(toggleRef));

                $('<li>').append($(ref)).append($(divBlk)).appendTo('#' + lstId);
            }

        }

        // Refresh the view.
        $('#' + lstId).listview().listview('refresh');

    };

    that.clearList = function (divId, lstId) {

        $('#' + lstId).remove();
        // Assemble ul tag and append to div tag.
        $('<ul>').attr({
            'id': lstId,
            'data-role': 'listview',
            'data-split-icon': 'gear',
            'data-split-theme': 'a',
            'data-inset': 'true',
            'data-filter': 'true',
            'data-input': '#myFilter'
        }).appendTo('#' + divId);

        $('<li data-icon=\"false\">').append('<a href=\"#\">Empty</a></li>').appendTo('#' + lstId);

        $('#' + lstId).listview().listview('refresh');

    };

    that.resetList = function (divId, lstId, lst) {
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
var controller = function () {

    'use strict';

    var that = {};
    var panelViewCntl = panelViewController();
    var groceryViewCntl = groceryListViewController();
    var groceries = {};
    var emailCntl = emailController();
    var defaultList = '';
    var foods = '';
    var nonfoods = '';

    /****************************
     *
     * grocerylist management
     *
     ***************************/

    that.clear = function (lstId) {
        groceryViewCntl.clearList('foodDiv', 'foodItems');
        groceryViewCntl.clearList('nonfoodDiv', 'nonfoodItems');
        foods = groceries.getFoodItems;
        nonfoods = groceries.getNonfoodItems;
        that.setGroceries(grocerylist());
    };

    that.getGroceries = function () {
        return groceries;
    };

    that.setGroceries = function (groceryList) {
        groceries = groceryList;
    };

    that.reloadGroceries = function () {
        that.preloadData();
        foods = groceries.getFoodItems();
        nonfoods = groceries.getNonfoodItems();
        groceryViewCntl.resetList('foodDiv', 'foodItems', foods);
        groceryViewCntl.resetList('nonfoodDiv', 'nonfoodItems', nonfoods);
    };

    that.setSelection = function (itemName, itemType, isSelected) {

        var itm = null;
        var found = null;
        if (itemType.trim().toUpperCase() === 'food'.toUpperCase()) {
            itm = food({
                title: itemName,
                quantity: 1,
                pricePerUnit: 1.00,
                selected: false
            });
            found = that.getGroceries().getItem(itm);
            if (found !== null) {
                found.setSelected(isSelected);
            }
        } else if (itemType.trim().toUpperCase() === 'nonfood'.toUpperCase()) {
            itm = nonfood({
                title: itemName,
                quantity: 1,
                pricePerUnit: 1.00,
                selected: false
            });
            found = that.getGroceries().getItem(itm);
            if (found !== null) {
                found.setSelected(isSelected);
            }
        }
    };

    /****************************
     *
     * List item dropdown menu
     *
     *****************************/

    that.showChoices = function (e) {

        if ($(e).css('display') === 'none') {
            $(e).slideDown('fast');
        } else {
            $(e).slideUp('fast');
        }
    };

    that.toggle = function (id, itmType) {

        var elemId = id.replace('lst', '');
        id = ('#' + id).replace(' ', '');
        var choice = ('#' + elemId + 'choice').replace(' ', '');

        if ($(id).hasClass('ui-icon-plus')) {

            $(id).removeClass('ui-icon-plus').addClass('ui-icon-minus');
            $(id).css({
                'background': '#F9E79F',
                'text-shadow': 'none'
            });
            that.setSelection(elemId, itmType, false);
            $(choice).slideUp('fast');

        } else if ($(id).hasClass('ui-icon-minus')) {

            $(id).addClass('ui-icon-plus').removeClass('ui-icon-minus');
            $(id).css({
                'background': '#ABEBC6',
                'text-shadow': 'none'
            });
            that.setSelection(elemId, itmType, true);
            $(choice).slideUp('fast');

        }
    };

    /*******************
     *
     * Item manipulation
     *
     ********************/

    that.getTempItem = function (name, type) {
        if (type.toUpperCase() === 'food'.toUpperCase()) {
            return food({
                title: name,
                quantity: 1,
                pricePerUnit: 1,
                selected: false
            });
        } else if (type.toUpperCase() === 'nonfood'.toUpperCase()) {
            return nonfood({
                title: name,
                quantity: 1,
                pricePerUnit: 1,
                selected: false
            });
        }
    };

    that.addDefaultItemToList = function () {

        var lst = that.getGroceries();
        var newItem = $('#foodGroupsSelection').val();
        var type = $(':selected', '#foodGroupsSelection').parent().attr('label');
        if (type.trim().toUpperCase() === 'food'.toUpperCase()) {
            if (lst.addFoodItem(newItem, 1, 1.00, false)) {
                that.updateList();
            } else {
                alert("Item exists on the list");
            }
        } else if (type.trim().toUpperCase() === 'nonfood'.toUpperCase()) {
            if (lst.addNonfoodItem(newItem, 1, 1.00, false)) {
                that.updateList();
            } else {
                alert("Item exists on the list");
            }
        } else {
            alert('Application error. Call for help.');
        }
    };

    that.addNewItemToList = function () {

        var lst = that.getGroceries();
        var newItem = $('#itemName').val();
        var newType = $('#typeSelection').val();
        var newQty = parseInt($('#itemQty').val(), 10);
        var newPricePerUnit = parseFloat($('#itemPricePerUnit').val());

        if (newItem.trim() !== '') {

            if (newType.trim().toUpperCase() === 'food'.toUpperCase()) {
                if (lst.addFoodItem(newItem, newQty, newPricePerUnit, false)) {
                    that.updateList();
                } else {
                    alert("Item exists on the list");
                }
            } else if (newType.trim().toUpperCase() === 'nonfood'.toUpperCase()) {
                if (lst.addNonfoodItem(newItem, newQty, newPricePerUnit, false)) {
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

    that.deleteItem = function (itmName, itmType) {

        // create default item with name and type for query.
        var tmpItem = that.getTempItem(itmName, itmType);

        // retrieve DB item and put attributes in panel.
        var item = that.getGroceries().getItem(tmpItem);

        try {

            if (item.getType().toUpperCase() === 'food'.toUpperCase()) {
                that.getGroceries().removeFoodItem(item);
            } else if (item.getType().toUpperCase() === 'nonfood'.toUpperCase()) {
                that.getGroceries().removeNonfoodItem(item);
            }

            if (!that.getGroceries().exists(item)) {
                that.updateList();

            } else {
                that.updateList();
                alert('Failed to delete item');
            }

        } catch (e) {
            alert(e.message);
        }

        var choice = ('#' + itmName + 'choice').replace(' ', '').replace('lst', '');
        $(choice).slideUp('fast');
    };

    that.spawnEditPanel = function (itmName, itmType) {

        // create default item with name and type for query.
        var tmpItem = that.getTempItem(itmName, itmType);

        // retrieve DB item and put attributes in panel.
        var item = that.getGroceries().getItem(tmpItem);
        var editItem = item.getTitle();
        var editType = item.getType();
        var editQty = parseInt(item.getQuantity());
        var editPricePerUnit = parseFloat(item.getPricePerUnit());
        var editSelected = item.isSelected();

        $('#editAnItem').panel('open');
        $('#editName').val(editItem);
        $('#editType').val(editType);
        $('#editQty').val(editQty);
        $('#editPricePerUnit').val(editPricePerUnit);
        $('#editSelected').prop('checked', editSelected).checkboxradio('refresh');

    };

    that.saveItemChanges = function () {

        try {

            var editName = $('#editName').val();
            var editType = $('#editType').val();
            var editQty = parseInt($('#editQty').val(), 10);
            var editPricePerUnit = parseFloat($('#editPricePerUnit').val());
            var editSelected = $('#editSelected').prop('checked');

            var itm = that.getTempItem(editName, editType);
            var found = that.getGroceries().getItem(itm);

            found.setQuantity(editQty);
            found.setPricePerUnit(editPricePerUnit);
            found.setSelected(editSelected);

            itm = that.getGroceries().getItem(itm);

            if (found.getTitle().toUpperCase() === editName.toUpperCase() &&
                found.getType().toUpperCase() === editType.toUpperCase() &&
                found.getQuantity() === editQty &&
                found.getPricePerUnit() === editPricePerUnit &&
                found.isSelected() === editSelected) {

                $('#editAnItem').panel('close');
                that.updateList();

            } else {

                alert("Changes not saved");
                $('#editAnItem').panel('close');
                that.updateList();
            }

        } catch (e) {

            alert(e.message);

        }
    };

    /***************************
     *
     * List manipulation
     *
     ****************************/

    that.updateList = function () {
        foods = groceries.getFoodItems();
        nonfoods = groceries.getNonfoodItems();
        groceryViewCntl.resetList('foodDiv', 'foodItems', foods);
        groceryViewCntl.resetList('nonfoodDiv', 'nonfoodItems', nonfoods);
    };

    /*
     * Use this to load the default data.
     *
     */
    that.preloadData = function () {

        try {

            // Load default data
            defaultList = sourceData();
            defaultList.build();

            groceries = grocerylist();
            groceries.replaceFoodItems(defaultList.getFoods());
            groceries.replaceNonfoodItems(defaultList.getNonfoods());

            foods = groceries.getFoodItems();
            nonfoods = groceries.getNonfoodItems();
            panelViewCntl.resetSelectionPanel(foods, nonfoods);

        } catch (e) {

            alert(e.message);

        }

    };

    /*
     * Send email via ipad client.
     *
     */
    that.sendList = function () {

        try {
            var msg = emailCntl.constructBody(foods, nonfoods);
            emailCntl.sendList(msg);
        } catch (e) {
            alert(e.message);
        }
    };

    return that;
};

var emailController = function () {

    'use strict';

    var that;
    var body;
    var msg;

    try {

        that = {};
        body = '';
        msg = '';
        console.log("before construction");

        that.constructBody = function (foods, nonfoods) {

            console.log("constructing email");

            var style = 'style=\"border:1px solid black;\"';

            var msg = '<table ' + style + '>';
            msg += '<tr><th ' + style + '>Food</th></tr>';
            for (var i = 0; i < foods.length; i++) {
                msg += '<tr><td ' + style + '>' + '<input type=\'checkbox\'>' + foods[i].getTitle() + '</td></tr>';
            }
            msg += '</table><br><br>';

            msg += '<table ' + style + '>';
            msg += '<tr><th ' + style + '>Nonfood</th></tr>';
            for (var i = 0; i < nonfoods.length; i++) {
                msg += '<tr><td ' + style + '>' + '<input type=\'checkbox\'>' + nonfoods[i].getTitle() + '</td></tr>';
            }
            msg += '</table>';

            console.log("msg created: " + msg);

            return msg;

        };

        that.sendList = function (msg) {

            console.log("inside emailController.sendList");

            var link = "mailto:clifrunsalot@yahoo.com" + "?cc=" + "&subject=" + "Grocery List" + "&body=" + msg;

            window.location.href = link;

        };

    } catch (e) {
        alert(e.message);
    }

    return that;
};

/*
 *
 * Public functions available to webpage upon display.
 *
 */
function showChoices(itemName) {
    cntl.showChoices(itemName);
}

function toggle(itemName, itemType) {
    cntl.toggle(itemName, itemType);
}

function editItem(itemName, itemType) {
    cntl.spawnEditPanel(itemName, itemType);
}

function deleteItem(itemName, itemType) {
    cntl.deleteItem(itemName, itemType);
}