// declare our angular application with the necessary modules/dependencies
var app = angular.module('app', 
						 [
							'ngMaterial', 
							'ngRoute', 
							'ngMessages',
							'ui.grid',
							'ui.grid.edit',
							'ui.select',
							'ui.grid.cellNav',
							'ui.grid.exporter',
							'ui.grid.importer',
							'ui.grid.resizeColumns',
							'LocalStorageModule'
						 ]);

// set the color palette for our application (to match the Android app)
app.config(function($mdThemingProvider) {
	$mdThemingProvider
		.theme('default')
		.primaryPalette('indigo')
		.accentPalette('pink')
});

// configure our routes using the route provider
app.config(function($routeProvider) {
	$routeProvider
		.when('/', { // home view
			controller: 'Home',
			templateUrl: './templates/home.html',
			permissions: 'user'
		})
		.when('/users', { // user management view
			controller: 'Users',
			templateUrl: './templates/users.html',
			permissions: 'admin'
		})
		.when('/inventory', { // inventory view
			controller: 'Inventory',
			templateUrl: './templates/inventory.html',
			permissions: 'user'
		})
		.when('/profile', { // user profile view
			controller: 'Account',
			templateUrl: './templates/account.html',
			permissions: 'user'
		})
		.otherwise({ redirectTo: '/' });
});

/**
 * The no-animate directive prevents the element that it is applied to from being animated.
 * Use as an attribute on the element to prevent animation on.
 */
app.directive('noAnimate', function ($animate) {
	return function(scope, element) {
		$animate.enabled(false, element);
	};
});

/**
 * Utilize local storage through the local-view directive
 */
app.directive('localView', function(localStorageService, $rootScope) {
	return function(scope, element) {
		if (localStorageService.get("user") != null) {
			scope.$root.user = localStorageService.get("user");
		}
	};
});

var SERVER_URL = "http://54.243.4.179/v1/";
