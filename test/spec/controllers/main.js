'use strict';

describe('Controller: MainCtrl', function (){
  var MainCtrl, scope, ctrl, $httpBackend, items;

  // load the controller's module
    beforeEach(module('shoppingCartApp'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      items = $httpBackend.expectGET('containers/products.json');

      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {$scope: scope});
    }));

    // it('should attach a list of products', function(){
    // 	expect(scope.items).toEqual(" ")
    // })
});