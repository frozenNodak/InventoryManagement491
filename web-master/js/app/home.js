var app = angular.module('app');

/**
 * The Home controller is used on the main view, and uses the rootScope,
 * scope, and timeout dependencies.
 */
app.controller('Home', function($rootScope, $scope, $timeout) {
	
	// create the rootScope user object
	$rootScope.user = {
		first_name: '',
		last_name: '',
		username: '',
		password: '',
		logged: false,
		first: false
	};
	
	$scope.theApp = "UND inventory manager";
});