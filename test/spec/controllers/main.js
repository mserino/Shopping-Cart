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
      scope.addItem(jimmychoo);
      scope.addItem(prada);
      expect(scope.total()).toBe(10.00);
    });
  });

});
