'use strict';

var HeroRoutes;

HeroRoutes = (function() {
	function HeroRoutes($routeProvider) {
  $routeProvider.when('/create-hero', {
    templateUrl: '/app/hero_action/views/createHero.html'
  }).when('/hero-merge', {
    templateUrl: '/app/hero_action/views/heroMerge.html'
  });
}
return HeroRoutes;
}());

angular.module('myApp').config(['$routeProvider', HeroRoutes]);

