(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('ViewItemsController', ['$rootScope', '$state', '$q', '$stateParams', '$timeout', '$ionicHistory', 'Items', 'Departments', 'Buildings', 'Rooms', ViewItemsController]);

    function ViewItemsController($rootScope, $state, $q, $stateParams, $timeout, $ionicHistory, Items, Departments, Buildings, Rooms) {
        var vm = this;

        //// GLOBALS ////
        var departmentId = 0;
        var buildingId = 0;
        var roomId = 0;

        var editedItem = {};

        onEnter();

        //// INITIALIZATION FUNCTIONS ////

        function onEnter(isRefresh) {
            vm.render = false;

            vm.accordion = {
                isOpen: false
            };

            departmentId = $stateParams.departmentId;
            buildingId = $stateParams.buildingId;
            roomId = $stateParams.roomId;

            vm.types = {};

            vm.foundItems = true;

            editedItem = {};
  
            getData(isRefresh);
            vm.render = true;

        }

        // Retrieves the data from the db
        function getData(isRefresh) {
            // Getting items and grouping them by item type
            getItemTypesApi()
                .then(function success(types) {
                    for (var i = 0; i < types.length; i++) {
                        vm.types[types[i].id] = {
                            name: types[i].name,
                            id: types[i].id,
                            items: []
                        }
                    }

                    searchItemsApi(departmentId, buildingId, roomId)
                        .then(function success(items) {
                            if(items.length > 0) {
                                sortItemsByType(items);
                            } else {
                                vm.foundItems = false;
                            }
                        });
                });

        }

        //// END INITIALIZATION FUNCTIONS ////

        // Opens an organization accordion
        vm.toggleItemTypeOpen = function(type) {
           type.isOpen = !type.isOpen;
        };

        //// API FUNCTIONS ////

        function searchItemsApi(departmentId, buildingId, roomId) {
            return Items.searchItems(departmentId, buildingId, roomId)
                .then(function success(items) {
                    return items;
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

        //// END API FUNCTIONS ////

        //// VIEW MODEL FUNCTIONS ////

        // Passes selected item to edit state
        vm.editItem = function(item) {
            editedItem = item;
            $state.go('app.edit-item', {itemId: item.id});
        };

        //// END VIEW MODEL FUNCTIONS ////

        // Groups items by type into an array
        function sortItemsByType(items) {
            for (var i = 0; i < items.length; i++) {
                vm.types[items[i].type].items.push(items[i]);
            }
        }

        // Remove edited item from its old type
        function removeItemFromType() {
            for (var i = 0; i < vm.types[editedItem.type].items.length; i++) {
                if(vm.types[editedItem.type].items[i].id === editedItem.id) {
                    vm.types[editedItem.type].items.splice(i, 1);
                    break;
                }
            }
        }

        // Returning to scan state from edit state and refreshing item list for changes
        $rootScope.$on('$stateChangeSuccess', function (ev, toState, toParams, fromState, fromParams) {
            if(fromState.name == 'app.edit-item' && toState.name == 'app.search-items.view-items') {
                getItemApi(fromParams.itemId)
                    .then(function success(item) {
                        if(item.departmentId != departmentId){
                            removeItemFromType();
                        } else if(item.buildingId != buildingId && buildingId != 0){
                            removeItemFromType();
                        } else if(item.roomId != roomId && roomId != 0){
                            removeItemFromType();
                        } else if(editedItem.type != item.itemTypeId) {// Changed Item Type
                            // Remove item from old type 
                            removeItemFromType();
                            // Switch the item type to the new type
                            editedItem.type = item.itemTypeId;
                            // Add item to new type list
                            vm.types[editedItem.type].items.push(editedItem);
                        }
                    });
            }
        });
    }
})();
