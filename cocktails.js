(function() {
	var app = angular.module('cocktailApp', []);

	app.controller('FormController', ['$scope', function($scope){
		this.inds = ingredients;
		this.type = {0: ingredients["Liquer"], 1: ingredients["Vermouth"]};
		this.ingredient = {0: this.type[0]['Campari'], 1: this.type[1]['Carpano']};
		this.spiritAmount = {0: 1};
		this.spiritABV = {0: 40};
		this.ingredientAmount = {0: 1, 1: 1};
		this.dilution = 'stirred';
		this.numSpirits = 1;
		this.numIngredients = 2;
		$scope.range = function(n){
			return new Array(n)
		};
		this.ing = ingredients[this.type[0]];
		$scope.calculate = function(formCtrl) {
			var total = 0;
			var abv = 0;
			var sugar = 0;
			var acid = 0;
			for (var i = 0; i<formCtrl.numSpirits; i++) {
				total += formCtrl.spiritAmount[i];
				abv += formCtrl.spiritABV[i];
			}
			for (var i = 0; i<formCtrl.numIngredients; i++) {
				var amount = formCtrl.ingredientAmount[i];
				total += amount;
				abv += formCtrl.ingredient[i]['abv']*amount;
				sugar += formCtrl.ingredient[i]['sugar']*amount;
				acid += formCtrl.ingredient[i]['acid']*amount;
			}
			var dilution = 1;
			if (formCtrl.dilution == 'stirred') { 
				dilution = dil = -1.092*((abv/100)*(abv/100)) + 1.224*(abv/100) + 1.15;
			}
			else if (formCtrl.dilution == 'shaken') {
				dilution = -4.678*((abv/100)*(abv/100)) + 3.266*(abv/100) + 1.134;
			}
			dilutedTotal = total*dilution;
			abv = abv/dilutedTotal;
			sugar = sugar/dilutedTotal;
			acid = acid/dilutedTotal;
			return {"ABV": abv, "Sugar": sugar, "Acid": acid, 
			"mixVolume": total, "finalVolume": dilutedTotal};
		};
	}]);
})();

