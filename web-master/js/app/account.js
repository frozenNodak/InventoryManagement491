var app = angular.module('app');

/**
 * The Account service allows for communication to the update_user
 * functionality in the PHP API.
 */
app.factory('AccountService', function($http) {
	
	return {
		
		/**
		 * The updateUser function allows for a specified user to be updated in
		 * the system.
		 * @arg user The user to be updated in the database
		 */
		updateUser: function(user) {
			return $http.post('../inventory-api/update_user.php', user)
				.then(function(res) {
					return res.data;
				})
		}
		
	}
	
});

/**
 * The Account controller controls the functionality of the account view, including
 * the user update dialog. Dependencies include rootScope, scope, timeout, mdToast, AccountService, 
 * and localStorageService.
 */
app.controller('Account', function($rootScope, $scope, $timeout, $mdToast, AccountService, localStorageService) {
	
	// Initialize the updatedUser object to prevent changing from two-way data binding.
	$scope.updatedUser = {};
	$scope.updatedUser.email = $rootScope.user.username;
	$scope.updatedUser.user_id = $rootScope.user.user_id;
	
	/* The updateUser function updates the user's information */
	$scope.updateUser = function() {
		AccountService.updateUser($scope.updatedUser)
			.then(function(res) {
				$rootScope.user.username = res.message;
				localStorageService.set("user", $rootScope.user);
				$mdToast.show(
						$mdToast.simple()
							.textContent('Account changes saved successfully.')
							.position('bottom right')
							.hideDelay(3000)
					);
					$scope.updatedUser.current_password = "";
					$scope.updatedUser.new_password = "";
					$scope.newUserForm.$setPristine();
					$scope.newUserForm.$setUntouched();
			});
	};
	
});