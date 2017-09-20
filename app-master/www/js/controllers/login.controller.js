(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('LoginController', ['$state', '$q', '$ionicHistory', 'API', LoginController]);

    function LoginController($state, $q, $ionicHistory, API) {
        var vm = this;

        onEnter();

        //// INITIALIZATION FUNCTIONS ////

        function onEnter(isRefresh) {
            vm.render = false;

            vm.hideRememberMe = true;

            vm.email = '';
            vm.password = '';

            vm.isIncorrect = false;

            vm.render = true;
        }

        //// END INITIALIZATION FUNCTIONS ////

        //// API FUNCTIONS ////

        function loginApi(email, password) {
            return API.login(email, password)
                .catch(function(reason) {
                    //error handling
                    if(reason.origErr.data.code === API.errorTypes.E_USER_NOT_FOUND) {
                        vm.isIncorrect = true;
                        vm.errorMessage = reason.origErr.data.message;
                        return $q.reject();
                    } else {
                        $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    }
                });
        }

        //// END API FUNCTIONS ////

        //// VIEW MODEL FUNCTIONS ////

        // Calls login api to attempt to log the user in
        vm.login = function() {
            // Clear the password from the view
            var password = vm.password;
            vm.password = '';

            return loginApi(vm.email, password)
                .then(function success(res) {
                    vm.email = '';
                    $state.go('app.scan-items');
                });
        }

        // Hides incorrect credentials message
        vm.clearIsIncorrect = function() {
            vm.isIncorrect = false;
        }

        //// END VIEW MODEL FUNCTIONS ////
    }
})();
