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