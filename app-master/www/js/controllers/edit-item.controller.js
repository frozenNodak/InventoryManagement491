(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('EditItemController', ['$timeout', '$state', '$stateParams', '$q', '$ionicHistory', 'Items', 'Departments', 'Buildings', 'Rooms', EditItemController]);

    function EditItemController($timeout, $state, $stateParams, $q, $ionicHistory, Items, Departments, Buildings, Rooms) {
        var vm = this;

        onEnter();

        //// INITIALIZATION FUNCTIONS ////

        function onEnter(isRefresh) {
            vm.render = false;

            vm.editItem = false;

            vm.title = '';

            vm.item = {};

            vm.itemCopy = {};

            vm.departments = [];
            vm.buildings = [];
            vm.rooms = [];
            vm.types = [];

            getData(isRefresh);
        }

        // Retrieves the data from the db
        function getData(isRefresh) {
            // Retrieving data for item id passed in
            getItemApi($stateParams.itemId)
                .then(function success(item) {
                    vm.item = item;

                    vm.title = vm.item.barcode;

                    var d1 = $q.defer();
                    var d2 = $q.defer();
                    var d3 = $q.defer();
                    var d4 = $q.defer();

                    getDepartmentsApi()
                        .then(function success(departments) {
                            vm.departments = departments;
                            for (var i = 0; i < departments.length; i++) {
                                if(departments[i].id === vm.item.departmentId) {
                                    vm.item.department = departments[i];
                                    delete vm.item.departmentId;
                                    delete vm.item.departmentName;
                                    break;
                                }
                            }
                            d1.resolve();
                        });

                    // Getting buildings in the selected department
                    getDepartmentBuildingsApi(vm.item.departmentId)
                        .then(function success(buildings) {
                            vm.buildings = buildings;
                            for (var i = 0; i < buildings.length; i++) {
                                if(buildings[i].id === vm.item.buildingId) {
                                    vm.item.building = buildings[i];
                                    delete vm.item.buildingId;
                                    delete vm.item.buildingName;
                                    break;
                                }
                            }
                            d2.resolve();
                        });

                    // Getting rooms in selected building
                    getBuildingRoomsApi(vm.item.buildingId)
                        .then(function success(rooms) {
                            vm.rooms = rooms;
                            for (var i = 0; i < rooms.length; i++) {
                                if(rooms[i].id === vm.item.roomId) {
                                    vm.item.room = rooms[i];
                                    delete vm.item.roomId;
                                    delete vm.item.roomNumber;
                                    break;
                                }
                            }
                            d3.resolve();
                        });

                    // Getting all item types
                    getItemTypesApi()
                        .then(function success(types) {
                            vm.types = types;
                            for (var i = 0; i < types.length; i++) {
                                if(types[i].id === vm.item.itemTypeId) {
                                    vm.item.type = types[i];
                                    delete vm.item.itemTypeId;
                                    delete vm.item.itemType;
                                    break;
                                }
                            }
                            d4.resolve();
                        });

                    $q.all([d1.promise, d2.promise, d3.promise, d4.promise])
                        .then(function success() {
                            vm.render = true;
                        });

                });
        }

        //// END INITIALIZATION FUNCTIONS ////

        //// API FUNCTIONS ////

        function getItemApi(itemId) {
            return Items.getItem(itemId)
                .then(function success(item) {
                    return item;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        function getDepartmentsApi() {
            return Departments.getDepartments()
                .then(function success(departments) {
                    return departments;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
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

        function getBuildingRoomsApi(buildingId) {
            return Rooms.getBuildingRooms(buildingId)
                .then(function success(rooms) {
                    return rooms;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        function getItemTypesApi() {
            return Items.getItemTypes()
                .then(function success(types) {
                    return types;
                }).catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        function updateItemApi(item) {
            return Items.updateItem(item)
                .catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        //// END API FUNCTIONS ////

        //// VIEW MODEL FUNCTIONS ////

        vm.toggleEditItem = function() {
            // vm.itemCopy = angular.copy(vm.item);
            vm.editItem = true;
        };

        // TODO
        vm.cancelEditItem = function() {
            // console.log(vm.item);
            // console.log(vm.itemCopy);
            // vm.item = vm.itemCopy;
            // console.log(vm.item);
            vm.editItem = false;
        };

        // If the form has been changed update the item
        vm.updateItem = function(form) {
            if(form.$dirty) {
                updateItemApi(vm.item)
                    .then(function success() {
                        vm.editItem = false;
                    });
            } else {
                vm.editItem = false;
            }
        };

        // Getting buildings for newly selected department
        vm.setItemDepartment = function() {
            // reset the building and room when new department is selected
            vm.item.building = null;
            vm.item.room = null;

            getDepartmentBuildingsApi(vm.item.department.id)
                .then(function success(buildings) {
                    vm.buildings = buildings;
                }).catch(function error() {
                    // error handling
                });
        };

        // Getting rooms for newly selected building
        vm.setItemBuilding = function() {
            // reset the room when new building is selected
            vm.item.room = null;

            getBuildingRoomsApi(vm.item.building.id)
                .then(function success(rooms) {
                    vm.rooms = rooms;
                }).catch(function error() {
                    // error handling
                });
        };

        //// END VIEW MODEL FUNCTIONS ////
    }
})();
