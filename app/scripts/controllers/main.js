'use strict';

/**
 * @ngdoc function
 * @name shoppingCartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingCartApp
 */
angular.module('shoppingCartApp')
  .controller('MainCtrl', function ($scope) {
		$scope.cart = [];

		$scope.items = [
			{name: 'Almond Toe Court Shoes, Patent Black', category: 'Women’s Footwear', price: 99.00, quantity: 5},
			{name: 'Suede Shoes, Blue', category: 'Women’s Footwear', price: 42.00, quantity: 4},
			{name: 'Leather Driver Saddle Loafers, Tan', category: 'Men’s Footwear', price: 34.00, quantity: 12},
			{name: 'Flip Flops, Red', category: 'Men’s Footwear', price: 19.00, quantity: 6},
			{name: 'Flip Flops, Blue', category: 'Men’s Footwear', price: 19.00, quantity: 0},
			{name: 'Gold Button Cardigan, Black', category: 'Women’s Casualwear', price: 167.00, quantity: 6},
			{name: 'Cotton Shorts, Medium Red', category: 'Women’s Casualwear', price: 30.00, quantity: 5},
			{name: 'Fine Stripe Short Sleeve Shirt, Grey', category: 'Men’s Casualwear', price: 49.00, quantity: 9},
			{name: 'Fine Stripe Short Sleeve Shirt, Green', category: 'Men’s Casualwear', price: 39.99, quantity: 3}, // sale! 49.99
			{name: 'Sharkskin Waistcoat, Charcoal', category: 'Men’s Formalwear', price: 75.00, quantity: 2},
			{name: 'Lightweight Patch Pocket Blazer, Deer', category: 'Men’s Formalwear', price: 175.50, quantity: 1},
			{name: 'Bird Print Dress, Black', category: 'Women’s Formalwear', price: 270.00, quantity: 10},
			{name: 'Mid Twist Cut-Out Dress, Pink', category: 'Women’s Formalwear', price: 540.00, quantity: 5}
		];

		$scope.vouchers = [
			{value: 5, spending_requirement: 0, clothing_required: " ", description: "£5 off"},
			{value: 10, spending_requirement: 50, clothing_required: " ", description: "£10 off if you spend £50"},
			{value: 15, spending_requirement: 75, clothing_required: "Footwear", description: "£15 off if you spend £75 and buy one footwear"}
		];

		$scope.selectedVouchers = [];

		$scope.isEmpty = function() {
			return $scope.cart.length === 0
		};

		$scope.addItem = function (item) {
      if ($scope.containsObject(item)) {
      	item.desiredQuantity += 1;
      } else {
      	$scope.cart.push(item);
      };
    };

    $scope.removeItem = function (item) {
    	var index = $scope.cart.indexOf(item)
    	$scope.cart.splice(index, 1)
    };

    $scope.total = function() {
			var total = 0;
			for (var i = 0; i < $scope.cart.length; i++) {
				total = total + ($scope.cart[i].price * $scope.cart[i].desiredQuantity);
			};
			for (var i = 0; i < $scope.selectedVouchers.length; i++) {
				total = total - ($scope.selectedVouchers[i].value)
			};
			return total;
    };

		$scope.containsObject = function (obj) {
		  for (var i = 0; i < $scope.cart.length; i++) {
		    if ($scope.cart[i] === obj) {
		      return true;
		    };
		  };
		  return false;
		};

		$scope.clothingRequirement = function(obj, cart) {
			for (var i = 0; i < cart.length; i++){
				if ( (cart[i].category).indexOf(obj.clothing_required) > -1 ) {
				  return true;
				};
			};
			return false;
		};

		$scope.selectVoucher = function(voucher) {
			$scope.buttonClicked = false;
			if(($scope.total() >= voucher.spending_requirement) && ($scope.clothingRequirement(voucher, $scope.cart))) {
					$scope.selectedVouchers.push(voucher);
					
					$scope.voucherMessage = "Your voucher has been accepted"
					$scope.buttonClicked = true;
					$scope.validVoucher = 'success';
			} else {
				$scope.voucherMessage = "Sorry, the voucher is invalid"
				$scope.validVoucher = 'danger';
			}
		};
  });