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
		{name: "Almond Toe Court Shoes, Patent Black", category: "Women’s Footwear", price: 99.00, quantity: 5},
		{name: "Suede Shoes, Blue", category: "Women’s Footwear", price: 42.00, quantity: 4},
		{name: "Leather Driver Saddle Loafers, Tan", category: "Men’s Footwear", price: 34.00, quantity: 12},
		{name: "Flip Flops, Red", category: "Men’s Footwear", price: 19.00, quantity: 6},
		{name: "Flip Flops, Blue", category: "Men’s Footwear", price: 19.00, quantity: 0},
		{name: "Gold Button Cardigan, Black", category: "Women’s Casualwear", price: 167.00, quantity: 6},
		{name: "Cotton Shorts, Medium Red", category: "Women’s Casualwear", price: 30.00, quantity: 5},
		{name: "Fine Stripe Short Sleeve Shirt, Grey", category: "Men’s Casualwear", price: 49.00, quantity: 9},
		{name: "Fine Stripe Short Sleeve Shirt, Green", category: "Men’s Casualwear", price: 39.99, quantity: 3}, // sale! 49.99
		{name: "Sharkskin Waistcoat, Charcoal", category: "Men’s Formalwear", price: 75.00, quantity: 2},
		{name: "Lightweight Patch Pocket Blazer, Deer", category: "Men’s Formalwear", price: 175.50, quantity: 1},
		{name: "Bird Print Dress, Black", category: "Women’s Formalwear", price: 270.00, quantity: 10},
		{name: "Mid Twist Cut-Out Dress, Pink", category: "Women’s Formalwear", price: 540.00, quantity: 5}
		];

		$scope.isEmpty = function() {
			return $scope.cart.length === 0
		};

		$scope.addItem = function (item) {
			// item.bla = "hello"
      	$scope.cart.push(item);
      // console.log($scope.cart)
      // $scope.items.splice(index, 1);
    };
  });
