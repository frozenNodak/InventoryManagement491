var app = angular.module('app');

/**
 * The Users service uses the $http service to fetch data and/or
 * update data associated with users
 */
app.factory('UsersService', function ($http) {
	
	return {
		
		/**
		 * The getUsers function fetches a list of users
		 */
		getUsers: function() {
			return $http.get('../inventory-api/get_users.php')
				.then(function(res) {
					return res.data;
				}, function(res) {
					// failure
				})
		},
		
		/**
		 * The addUser function adds a new user to the database
		 * @arg user The user to add to the database
		 */
		addUser: function(user) {
			return $http.post('../inventory-api/add_user.php', user)
				.then(function(res) {
					return res.data;
				}, function(res) {
					// failure
				})
		},
		
		/**
		 * The updateUser function updates an existing user in the database
		 * @arg user The user to be updated
		 */
		updateUser: function(user) {
			return $http.post('../inventory-api/update_user.php', user)
				.then(function(res) {
					return res.data;
				})
		},
		
		/**
		 * The removeUser function removes an existing user from the database
		 * @arg user The user to be removed
		 */
		removeUser: function(user) {
			return $http.post('../inventory-api/remove_user.php', user)
				.then(function(res) {
					return res.data;
				})
		}
		
	}
	
});

/**
 * The Users controller controls the users view in the application, using the $rootScope and $scope, 
 * as well as several Material Angular dependencies and the Users service
 */
app.controller('Users', function($rootScope, $scope, $mdToast, $mdMedia, $mdDialog, $timeout, UsersService) {
	
	// Create users array and new user object
	$scope.users = [];
	$scope.newUser = {first_name: '', last_name: '', email: '', isAdmin: 0};
	
	/**
	 * The getUsers function fetches the users and adds them to the 
	 * users array.
	 */
	$scope.getUsers = function() {
		UsersService.getUsers()
			.then(function(res) {
				$scope.users = res;
			}, function() {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Unable to fetch users. Please refresh and try again.')
						.position('bottom right')
						.hideDelay(3000)
				);
			});
	}
	
	/**
	 * The showAddDialog function creates a new dialog for adding a new user
	 * @arg ev The event which triggered the function
	 */
	$scope.showAddDialog = function(ev) {
		// use full screen when the extra small breakpoint is reached
		var useFullScreen = $mdMedia('xs');
		
		// Construct and show the material dialog
		$mdDialog.show({
			controller: 'AddUserDialog',
			templateUrl: './templates/dialogs/add_user.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: useFullScreen
		})
			.then(function(result) {
				// If the user saves the new user, display a success message
				if (result == "success") {
					$mdToast.show(
						$mdToast.simple()
							.textContent('User was added to the system and notified.')
							.position('bottom right')
							.hideDelay(3000)
					);
					$scope.getUsers();
				// If there was a connectivity error, display the error message
				} else if (result == "conn-error") {
					$mdToast.show(
						$mdToast.simple()
							.textContent('Could not add user to system. Please refresh and try again.')
							.position('bottom right')
							.hideDelay(3000)
					);
				// There was invalid information in the form
				} else {
					$mdToast.show(
						$mdToast.simple()
							.textContent('User could not be added to the system, please check the form and try again.')
							.position('bottom right')
							.hideDelay(3000)
					);
				}
			}, function() {
			});
	};
	
	/**
	 * The showUpdateDialog creates a new dialog that
	 * allows the user to edit information for a specified user.
	 * @arg user The user to be updated via the dialog
	 */
	$scope.showUpdateDialog = function(user) {
		var useFullScreen = $mdMedia('xs');
		// Construct and show the dialog
		$mdDialog.show({
			controller: 'UpdateUserDialog',
			templateUrl: './templates/dialogs/update_user.html',
			parent: angular.element(document.body),
			/* targetEvent: ev, */
			clickOutsideToClose: true,
			fullscreen: useFullScreen,
			locals: {user: angular.copy(user), caller: $scope} // pass a copy of the user and specify the caller as this function's scope
		})
			.then(function(result) {
				// success
			}, function() {
				// fail
			});
	};
	
	// populate our list of users onload
	$scope.getUsers();
	
});

/**
 * The AddUserDialog controller is used to manage the add user dialog
 */
app.controller('AddUserDialog', function($rootScope, $scope, $mdDialog, $timeout, UsersService) {
	
	// Create our new user object
	$scope.newUser = {first_name: '', last_name: '', email: '', is_admin: 0};
	
	/**
	 * The addUser function adds a new user to the database
	 */
	$scope.addUser = function() {
		// call the Users Service to add the newUser in the scope
		UsersService.addUser($scope.newUser)
			.then(function(res) {
				// If the call was successful, hide the dialog and reset the newUser in the scope (for the next add)
				if (res.result == "success") {
					$mdDialog.hide('success');
					$scope.newUser = {first_name: '', last_name: '', email: '', is_admin: 0};
					$scope.newUserForm.$setPristine();
					$scope.newUserForm.$setUntouched();
				// Else close the dialog and specify that validation errors occurred.
				} else {
					$mdDialog.hide('validation-error');
				}
			}, function(res) {
				// If we were unable to connect to the server, say so
				$mdDialog.hide('conn-error');
			});
	};
	
	/**
	 * The resetForm function resets the add form by effectively:
	 * 1) Resetting the newUser object
	 * 2) Setting the form as pristine (valid)
	 * 3) Setting the form as untouched (not yet touched by the user)
	 */
	$scope.resetForm = function() {
		$scope.newUser = {first_name: '', last_name: '', email: '', is_admin: 0};
		$scope.newUserForm.$setPristine();
		$scope.newUserForm.$setUntouched();
	};
	
	/**
	 * The cancel function closes the dialog
	 */
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
});

/**
 * The UpdateUserDialog controller manages the update user dialog by making calls to the Users service
 */
app.controller('UpdateUserDialog', function($rootScope, $scope, $mdDialog, $mdMedia, $mdToast, $timeout, UsersService, user, caller) {
	
	// Set our local user to the user being passed in, make a copy (in case form is reset), and set the email to the username of the user.
	$scope.user = user;
	$scope.og_user = angular.copy(user);
	$scope.user.email = $scope.user.username;
	
	/**
	 * The updateUser function calls the Users service to update a user and
	 * then updates the user accordingly, handling the dialog as per the results of
	 * the update.
	 */
	$scope.updateUser = function() {
		UsersService.updateUser($scope.user)
			.then(function(res) {
				// If the update was successful, hide the dialog and refresh users
				if (res.result == "success") {
					$mdDialog.hide();
					caller.getUsers();
					$mdToast.show(
						$mdToast.simple()
							.textContent(res.message)
							.position('bottom right')
							.hideDelay(3000)
					);
				// Else hide the dialog and specify a validation error
				} else {
					$mdDialog.hide('validation-error');
				}
			}, function(res) {
					// If we couldn't connect, say so
				  $mdDialog.hide('conn-error');
			})
	};
	
	/**
	 * The resetForm function resets the form by resetting the user to the original user,
	 * resetting the email to the original user's email, setting the form to be pristine and setting
	 * it to be untouched (to clear any validation errors)
	 */
	$scope.resetForm = function() {
		$scope.user = $scope.og_user;
		$scope.user.email = $scope.user.username;
		$scope.updateUserForm.$setPristine();
		$scope.updateUserForm.$setUntouched();
	};
	
	/**
	 * The confirmRemove function creates a confirmation dialog to confirm that the user
	 * will be removed from the system.
	 * @arg user The user to be removed
	 */
	$scope.confirmRemove = function(user) {
		// construct our confirmation dialog
		var confirm = $mdDialog.confirm()
			.title("Are you sure you'd like to remove " + user.first_name + " " + user.last_name + " from the system?")
			.ariaLabel("Really remove user?")
			.ok('Yes, remove this user')
			.cancel('No');
		
		// show the confirmation dialog and process the result
		$mdDialog.show(confirm).then(function() {
			// if the user confimed, remove the user and hide the dialog, then refresh the calling view's users
			$scope.removeUser(user);
			$mdDialog.hide();
			caller.getUsers();
		}, function() {
			// if the user canceled, recreate the update user dialog
			var useFullScreen = $mdMedia('xs');
			$mdDialog.show({
				controller: 'UpdateUserDialog',
				templateUrl: './templates/dialogs/update_user.html',
				parent: angular.element(document.body),
				/* targetEvent: ev, */
				clickOutsideToClose: true,
				fullscreen: useFullScreen,
				locals: {user: angular.copy(user), caller: caller}
			})
				.then(function(result) {
					// success
				}, function() {
					// fail
				});
		})
	}
	
	/**
	 * The removeUser function removes the specified user from the system upon confirmation
	 */
	$scope.removeUser = function() {
		// call the users service to remove the user
		UsersService.removeUser($scope.user)
			.then(function(res) {
				// Let the user know that the deletion succeeded
				if (res.result == "success") {
					$mdToast.show(
						$mdToast.simple()
							.textContent('User was removed from the system successfully.')
							.position('bottom right')
							.hideDelay(3000)
					);
				} else {
					// fail
				}
			})
	}
	
	/**
	 * The cancel function cancels and closes the dialog
	 */
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
});