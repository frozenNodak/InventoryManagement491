(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('AddRoomController', ['$scope', '$state', '$q', '$ionicHistory', 'Departments', 'Buildings', 'Rooms', AddRoomController]);

    function AddRoomController($scope, $state, $q, $ionicHistory, Departments, Buildings, Rooms) {
        var vm = this;

        onEnter();

        //// INITIALIZATION FUNCTIONS ////

        function onEnter(isRefresh) {
            vm.render = false;
            vm.success = false;
            vm.error = false;

            vm.departments = null;
            vm.buildings = null;

            vm.department = null;
            vm.building = null;
            vm.room = null;

            getData(isRefresh);

            vm.render = true;

        }

        // Retrieves the data from the db
        function getData(isRefresh) {
            // Getting all departments
            getDepartmentsApi()
                .then(function success(departments) {
                    vm.departments = departments;
                    if(isRefresh) {
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                });

        }

        //// END INITIALIZATION FUNCTIONS ////

        //// API FUNCTIONS ////

        function getDepartmentsApi() {
            return Departments.getDepartments()
                .then(function success(departments) {
                    return departments;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject(reason);
                });
        }

        function getDepartmentBuildingsApi(departmentId) {
            return Buildings.getDepartmentBuildings(departmentId)
                .then(function success(buildings) {
                    return buildings;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        function addRoomApi(buildingId, room) {
            return Rooms.addRoom(buildingId, room)
                .then(function success(room) {
                    return room;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        //// END API FUNCTIONS ////

        //// VIEW MODEL FUNCTIONS ////

        vm.onRefresh = function() {
            onEnter(true);
        }

        // Getting buildings for selected department
        vm.setDepartment = function() {
            vm.building = null;
            getDepartmentBuildingsApi(vm.department.id)
                .then(function success(buildings) {
                    vm.buildings = buildings;
                });
        };

        // Calls add room api
        vm.addRoom = function() { 
            vm.clearMessages();  
            addRoomApi(vm.building.id, vm.room)
                .then(function success(room) {
                    vm.success = true;

                    vm.departments = null;
                    vm.buildings = null;

                    vm.department = null;
                    vm.building = null;
                    vm.room = null;
            
                    getData(true);
                });
        };

        // Hides error/success message
        vm.clearMessages = function() {
            vm.success = false;
            vm.error = false;
        }

        //// END VIEW MODEL FUNCTIONS ////
    }
})();
