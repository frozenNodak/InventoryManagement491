(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('UserInformationController', ['$state', '$q', '$ionicHistory', 'Users', UserInformationController]);

    function UserInformationController($state, $q, $ionicHistory, Users) {
        var vm = this;

        onEnter();

        //// INITIALIZATION FUNCTIONS ////

        function onEnter() {
            vm.render = false;

            vm.user = {};

            getData();
        }

        function getData() {
            getUserApi()
                .then(function success(user) {
                    vm.user = user;

                    vm.render = true;
                });

        }

        //// END INITIALIZATION FUNCTIONS ////

        //// API FUNCTIONS ////

        function getUserApi() {
            return Users.getUser()
                .then(function success(user) {
                    return user;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        //// END API FUNCTIONS ////
    }
})();
