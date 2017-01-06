/*
 *
 * Class for managing list model content.
 *
 */
var grocerylist = function () {

    'use strict';

    var that = {};
    var foodItems = [];
    var nonfoodItems = [];

    that.getFoodItems = function () {
        return foodItems;
    };

    that.getNonfoodItems = function () {
        return nonfoodItems;
    };

    that.replaceFoodItems = function (inList) {
        foodItems = null;
        foodItems = inList;
    };

    that.replaceNonfoodItems = function (inList) {
        nonfoodItems = null;
        nonfoodItems = inList;
    };

    that.existsInFoods = function (itm) {
        var foodItems = that.getFoodItems();
        var _itm;
        for (var i = 0; i < foodItems.length; i++) {
            _itm = foodItems[i];
            if ((_itm.getTitle().toUpperCase() == itm.getTitle().toUpperCase()) &&
                (_itm.getType().toUpperCase() == itm.getType().toUpperCase())) {
                return true;
            }
        }
        return false;
    };

    that.existsInNonfoods = function (itm) {
        var nonfoodItems = that.getNonfoodItems();
        var _itm;
        for (var i = 0; i < nonfoodItems.length; i++) {
            _itm = nonfoodItems[i];
            if ((_itm.getTitle().toUpperCase() == itm.getTitle().toUpperCase()) &&
                (_itm.getType().toUpperCase() == itm.getType().toUpperCase())) {
                return true;
            }
        }
        return false;
    };

    that.exists = function (itm) {
        return (that.existsInFoods(itm) || that.existsInNonfoods(itm));
    };

    that.getFoodItem = function (itm) {
        var foodItems = that.getFoodItems();
        var _itm;
        for (var i = 0; i < foodItems.length; i++) {
            _itm = foodItems[i];
            if ((_itm.getTitle().toUpperCase() == itm.getTitle().toUpperCase()) &&
                (_itm.getType().toUpperCase() == itm.getType().toUpperCase())) {
                return _itm;
            }
        }
        return null;
    };

    that.getNonfoodItem = function (itm) {
        var nonfoodItems = that.getNonfoodItems();
        var _itm;
        for (var i = 0; i < nonfoodItems.length; i++) {
            _itm = nonfoodItems[i];
            if ((_itm.getTitle().toUpperCase() == itm.getTitle().toUpperCase()) &&
                (_itm.getType().toUpperCase() == itm.getType().toUpperCase())) {
                return _itm;
            }
        }
        return null;
    };

    that.getItem = function (itm) {
        return (that.getFoodItem(itm) || that.getNonfoodItem(itm));
    };

    that.addFoodItem = function (nm, qty, prPerUnit, selected) {

        var name = nm;
        var amt = qty;
        var price = prPerUnit;
        var select = selected;

        var itm = food({
            title: name,
            quantity: amt,
            pricePerUnit: price,
            select: select
        });

        if (!that.exists(itm)) {

            foodItems.push(itm);
            return that.exists(itm);
        }

        return false;

    };

    that.addNonfoodItem = function (nm, qty, prPerUnit, selected) {

        var name = nm;
        var amt = qty;
        var price = prPerUnit;
        var select = selected;

        var itm = nonfood({
            title: name,
            quantity: amt,
            pricePerUnit: price,
            select: select
        });

        if (!that.exists(itm)) {

            nonfoodItems.push(itm);
            return that.exists(itm);
        }

        return false;

    };

    that.removeFoodItem = function (nm) {

        var foods = that.getFoodItems();
        var itm;
        for (var i = 0; i < foods.length; i++) {
            itm = foods[i];
            if (itm.getTitle().toUpperCase() == nm.getTitle().toUpperCase()) {
                foods.splice(i, 1);
            }
        }
    };

    that.removeNonfoodItem = function (nm) {

        var nonfoods = that.getNonfoodItems();
        var itm;
        for (var i = 0; i < nonfoods.length; i++) {
            itm = nonfoods[i];
            if (itm.getTitle().toUpperCase() == nm.getTitle().toUpperCase()) {
                nonfoods.splice(i, 1);
            }
        }

    };

    return that;
};