(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('ErrorController', ['$stateParams', '$state', '$ionicHistory', 'API', ErrorController]);

    function ErrorController($stateParams, $state, $ionicHistory, API) {
        var vm = this;

        onEnter();

        //// INITIALIZATION FUNCTIONS ////

        function onEnter() {
            vm.render = false;

            vm.showLogin = false;
            vm.showBack = false;
            
            vm.reason = $stateParams.reason;

            if(vm.reason.origErr) {
                switch(vm.reason.origErr.data.message) {
                    case 'jwt expired':
                        vm.showLogin = true;
                        break;
                    case 'No auth token':
                        vm.showLogin = true;
                        break;
                    default:
                        vm.showBack = true;
                }     
            } else {
                vm.showLogin = true;
            }
                

            vm.render = true;
        }

        //// END INITIALIZATION FUNCTIONS ////

        vm.back = function() {
            $ionicHistory.clearCache().then(function(){ $state.go('app.scan-items'); });
        }

        vm.returnLogin = function() {
            API.removeToken();
            $ionicHistory.clearCache().then(function(){ $state.go('login'); });
        }
    }
})();
