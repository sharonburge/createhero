'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view2',
  'myApp.version',
  'ui.bootstrap',
  'restangular'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/create-hero'});
}]).
config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://hero-merge.herokuapp.com');
}]);
