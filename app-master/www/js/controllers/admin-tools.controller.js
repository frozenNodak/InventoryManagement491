(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('AdminToolsController', ['Departments', 'Buildings', 'Rooms', AdminToolsController]);

    function AdminToolsController(Departments, Buildings, Rooms) {
        var vm = this;

        onEnter();

        //// INITIALIZATION FUNCTIONS ////

        function onEnter() {
            console.log('AdminToolsController');
            vm.render = false;

            // The "more" components
            vm.moreComponents = [{
                name: 'Department Management',
                state: '^.admin-tools',
                icon: 'ion-grid'
            }, {
                name: 'Building Management',
                state: '^.admin-tools',
                icon: 'ion-home'
            }, {
                name: 'User Management',
                state: '^.admin-tools',
                icon:'ion-person-stalker'
            }];

            vm.render = true;
        }

        //// END INITIALIZATION FUNCTIONS ////
    }
})();
