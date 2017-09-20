(function() {
    'use strict';

    angular
        .module('app.controllers')

        .controller('AppController', ['$rootScope', '$state', '$ionicHistory', 'API', AppController]);

    function AppController($rootScope, $state, $ionicHistory, API) {

        var vm = this;

        API.setToken();

        vm.logout = function() {
        	API.removeToken();
        	$ionicHistory.clearCache().then(function(){ $state.go('login') });
        }
    }
})();

