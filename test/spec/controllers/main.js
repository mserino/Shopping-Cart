'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('shoppingCartApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  describe('Product List', function(){
    it('should attach a list of products to the scope', function () {
      expect(scope.items.length).toBe(13);
    });
  });

  describe('Shopping Cart', function(){
    it('should have an empty cart', function(){
      expect(scope.cart.length).toBe(0)
    });

    it('can add items', function(){
      var item = {name: "name", category: "shoes", price: 5.00, quantity: 3}
      scope.addItem(item);
      expect(scope.cart.length).toBe(1);
    });

    it('checks if an item is already in the cart', function(){
      var item = {name: "name", category: "shoes", price: 5.00, quantity: 3}
      scope.addItem(item);
      expect(scope.containsObject(item, scope.cart)).toBe(true);
    });

    it('can remove items', function(){
      var item = {name: "name", category: "shoes", price: 5.00, quantity: 3}
      scope.addItem(item);
      expect(scope.cart.length).toBe(1);
      scope.removeItem(item);
      expect(scope.cart.length).toBe(0);
    });

    it('can calculate the total', function(){
      var jimmychoo = {name: "Jimmy Choo", category: "shoes", price: 5.00, quantity: 3}
      var prada = {name: "Prada", category: "shoes", price: 5.00, quantity: 3}
      jimmychoo.desiredQuantity = 1;
      prada.desiredQuantity = 1;
      scope.addItem(jimmychoo);
      scope.addItem(prada);
      expect(scope.total()).toBe(10);
    });
  });

  describe('Vouchers', function(){

    beforeEach(function(){
      var jimmychoo = {name: "Jimmy Choo", category: "women shoes", price: 5.00, quantity: 3}
      jimmychoo.desiredQuantity = 1;
      scope.addItem(jimmychoo);
    });

    it('should attach a list of vouchers to the scope', function () {
      expect(scope.vouchers.length).toBe(3);
    });

    it('£5 voucher takes 5 pounds from the total', function(){
      expect(scope.total()).toBe(5)
      var voucher = {value: 5, spending_requirement: 0, clothing_required: " ", description: "£5 off"};
      scope.selectVoucher(voucher);
      expect(scope.total()).toBe(0)
    });

    it('can check the clothing requirement', function(){
      var voucher = {value: 5, spending_requirement: 0, clothing_required: "shoes", description: "£5 off"}
      expect(scope.clothingRequirement(voucher, scope.cart)).toBe(true);
    });

    it('can check the clothing requirement with an empty string', function(){
      var voucher = {value: 5, spending_requirement: 0, clothing_required: " ", description: "£5 off"}
      expect(scope.clothingRequirement(voucher, scope.cart)).toBe(true);
    });
  });

});
