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
  
});