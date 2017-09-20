var app = angular.module('app');

/**
 * The AuthService utilizes the $http service to
 * make calls to log the user in to the application
 */
app.factory('AuthService', function($http) {
	
	return {
		
		/**
		 * login attempts to log in the specified user
		 * @arg user The user to be logged in
		 */
		login: function(user) {
			return $http.post(SERVER_URL+'auth/signin', {email: user.username, password: user.password})
				.then(function(res) {
					return res.data;
				})
		},

		resetPassword: function(email) {
			return $http.post('../inventory-api/reset_password.php', {email: email})
				.then(function(res) {
					return res.data;
				})
		}
		
	}
	
});

/**
 * The Login controller controls the login screen, using the rootScope to store the user's data
 * and the localStorage service to store the user's data in the browser's local storage
 */
app.controller('Login', function($rootScope, $scope, $timeout, $mdDialog, $mdMedia, $mdToast, AuthService, localStorageService) {

	/**
	 * The login function attempts to log in the specified user
	 * through a call to the AuthService
	 * @arg user The user to be logged in
	 */
	$scope.login = function(user) {
		AuthService.login(user)
			.then(function(res) {
				
				// if the login was successful, set the rootScope user
				if (res.code == "OK") {
					$rootScope.user.username = res.data.username;
					$rootScope.user.password = "";
					$rootScope.user.first_name = res.data.first_name;
					$rootScope.user.last_name = res.data.last_name;
					$rootScope.user.is_admin = res.data.is_admin;
					$rootScope.user.user_id = res.data.user_id;
					$rootScope.user.logged = true;
					localStorageService.set("user", $rootScope.user);
					localStorageService.set("token", res.data.token);
					
				// else clear the rootScope user and display the error message
				} else {
					$rootScope.user = {};
					$rootScope.user.authMsg = res.message;
				}
			});
	};
	
	$scope.showForgotPasswordDialog = function(ev) {
		// use full screen when the extra small breakpoint is reached
		var useFullScreen = $mdMedia('xs');
		
		// Construct and show the material dialog
		$mdDialog.show({
			controller: 'ForgotPasswordDialog',
			templateUrl: './templates/dialogs/forgot_password.html',
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
							.textContent('Your password was reset successfully. Please check your email.')
							.position('bottom right')
							.hideDelay(3000)
					);
					$scope.getUsers();
				// If there was a connectivity error, display the error message
				} else if (result == "conn-error") {
					$mdToast.show(
						$mdToast.simple()
							.textContent('Your password was unable to be reset. Please refresh and try again.')
							.position('bottom right')
							.hideDelay(3000)
					);
				// There was invalid information in the form
				} else {
					$mdToast.show(
						$mdToast.simple()
							.textContent('Your email was not found or was invalid.')
							.position('bottom right')
							.hideDelay(3000)
					);
				}
			}, function() {
			});
	};
	
});

app.controller('ForgotPasswordDialog', function($rootScope, $scope, $timeout, $mdDialog, $mdToast, AuthService, localStorageService) {
	
	$scope.email = "";

	/**
	 * The resetPassword function resets the password for the user with
	 * the specified email address.
	 */
	$scope.resetPassword = function() {
		AuthService.resetPassword($scope.email)
			.then(function(result) {
				$scope.email = "";
				$scope.forgotPassForm.$setPristine();
				$scope.forgotPassForm.$setUntouched();
				$mdDialog.hide('success');
				console.log("Password reset!");
			}, function() {
				$scope.email = "";
				$scope.forgotPassForm.$setPristine();
				$scope.forgotPassForm.$setUntouched();
				$mdDialog.hide('conn-error');
			});
	};

	/**
	 * The cancel function cancels and closes the dialog
	 */
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
});