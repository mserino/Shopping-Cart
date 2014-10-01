'use strict';

/**
 * @ngdoc function
 * @name shoppingCartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingCartApp
 */

angular.module('shoppingCartApp')

	.controller('MainCtrl', ['$scope', '$http',
		function ($scope, $http) {

    $http.get('containers/products.json').success(function(data) {
      $scope.items = data;
    });

    // $http.get('containers/vouchers.json').success(function(data) {
    //   $scope.vouchers = data;
    // });

		$scope.cart = [];

		$scope.vouchers = [
			{value: 5, spending_requirement: 0, clothing_required: " ", description: "£5 off"},
			{value: 10, spending_requirement: 50, clothing_required: " ", description: "£10 off if you spend £50"},
			{value: 15, spending_requirement: 75, clothing_required: "Footwear", description: "£15 off if you spend £75 and buy one footwear"}
		];

		$scope.selectedVouchers = [];

		// $scope.reset = function(item) {
		// 	$scope.items.item = angular.copy($scope.items);
  //   };

  // 	$scope.orig = function(item){
  // 		angular.copy(item)
  // 	};

		// $scope.reset = function(item) {
  //      // Example with 1 argument
  //     $sc
		// 	$scope.item = $scope.orig(item)
		// };

		$scope.isEmpty = function() {
			return $scope.cart.length === 0
		};

    $scope.outOfStock = function(item){
    	if(item.quantity === 0){
    		return true;
    	}
    	return false;
    };

		$scope.addItem = function (item) {
      if ($scope.containsObject(item)) {
      	item.desiredQuantity += 1;
      } else {
      	$scope.cart.push(item);
      };
      item.quantity -= 1;
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
  }]);