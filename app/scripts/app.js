'use strict';

/**
 * @ngdoc overview
 * @name shoppingCartApp
 * @description
 * # shoppingCartApp
 *
 * Main module of the application.
 */
angular.module('shoppingCartApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
