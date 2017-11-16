(function() {
    'use strict';

    angular
        .module('app.controllers')
        .controller('ScanItemsController', ['$rootScope', '$scope', '$window', '$state', '$q', '$ionicModal', '$ionicHistory', 'API', 'Items', 'Departments', 'Buildings', 'Rooms', ScanItemsController]);

    function ScanItemsController($rootScope, $scope, $window, $state, $q, $ionicModal, $ionicHistory, API, Items, Departments, Buildings, Rooms) {
        var vm = this;

        //// GLOBALS ////

        // The edit user modal
        var scanSettingsModal = null;
        // The new item modal
        var newItemModal = null;

        // Holds new item data
        var newItem = {};

        // Holds data for item being edited
        var editedItem = {};

        onEnter();

        //// INITIALIZATION FUNCTIONS ////
        function onEnter(isRefresh) {
            vm.render = false;

            vm.title = 'Set Scan Settings';

            newItem = {};

            vm.scanSettings = {
                department: null,
                building: null,
                room: null,
                scanType: 'Batch',
                set: false
            };

            vm.room = {
                inRoom: {},
                inWrongRoom: []
            };

            vm.hasItemsInRoom = true;

            vm.itemType = null;

            vm.departments = [];
            vm.buildings = [];
            vm.rooms = [];
            vm.types = {};

            vm.manualScan = false;
            if(!$window.cordova) {
                vm.barcode = null;
                vm.manualScan = true;
            }

            vm.render = true;
            getData(isRefresh);
        }

        // Retrieves the data from the db
        function getData(isRefresh) {

            var d1 = $q.defer();
            var d2 = $q.defer();

            // Get all departments that the user has correct permission in
            getDepartmentsApi()
                .then(function success(departments) {
                    vm.departments = departments;
                    d1.resolve();
                });

            // Get all possible item types for a department
            getItemTypesApi()
                .then(function success(types) {
                    for (var i = 0; i < types.length; i++) {
                        vm.types[types[i].id] = types[i];
                        vm.room.inRoom[types[i].id] = {
                            name: types[i].name,
                            id: types[i].id,
                            scanned: 0,
                            items: []
                        }
                    }

                    d2.resolve();
                });

             $q.all([d1.promise, d2.promise])
                .then(function success() {
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

        function getRoomItemsApi(roomId) {
            return Rooms.getItems(roomId)
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

        function getItemBarcodeApi(barcode) {
            return Items.getItemBarcode(barcode)
                .then(function success(item) {
                    return item;
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

        function createItemApi(item) {
            return Items.createItem(item)
                .then(function success(item) {
                    return item;
                })
                .catch(function error(reason) {
                    //error handling
                    $ionicHistory.clearCache().then(function(){ $state.go('error', {reason: reason}); });
                    return $q.reject();
                });
        }

        //// END API FUNCTIONS ////

        //// VIEW MODEL FUNCTIONS ////

        vm.onRefresh = function() {
            if(!vm.scanSettings.set) {
                onEnter(true);
            } else {
                $scope.$broadcast('scroll.refreshComplete');
            }
        }

        vm.setScanSettingDepartment = function() {
            // reset the building and room when new department is selected
            vm.scanSettings.building = null;
            vm.scanSettings.room = null;

            getDepartmentBuildingsApi(vm.scanSettings.department.id)
                .then(function success(buildings) {
                    vm.buildings = buildings;
                });
        };

        vm.setScanSettingBuilding = function(buildingIndex) {
            // reset the room when new building is selected
            vm.scanSettings.room = null;

            getBuildingRoomsApi(vm.scanSettings.building.id)
                .then(function success(rooms) {
                    vm.rooms = rooms;
                });
        };

        vm.showScanSettings = function() {
            showScanSettingsModal();
        };

        vm.hideScanSettings = function() {
            hideScanSettingsModal();
        };

        vm.hideNewItemModal = function() {
            hideNewItemModal();
        };

        vm.confirmNewItem = function(){
            // Create basic item with new barcode
            newItem.type = vm.itemType.id;
            createItemApi(newItem)
                .then(function success(item) {
                    if(vm.scanSettings.scanType == 'Single Item') {
                        vm.editItem(item);
                    } else {
                        item.scanned = true;
                        vm.room.inRoom[newItem.type].scanned++;
                        vm.room.inRoom[newItem.type].items.push(item);
                    }
                    hideNewItemModal();
                    newItem = {};
                });
        };

        vm.confirmScanSettings = function() {
            getRoomItemsApi(vm.scanSettings.room.id)
                .then(function success(items) {
                    if(items.length > 0) {
                        vm.hasItemsInRoom = true;
                        sortItemsByType(items);
                    } else {
                        vm.hasItemsInRoom = false;
                    }
                    vm.scanSettings.set = true;
                    vm.title = 'Scan Items';
                    if(vm.scanSettings.scanType == 'Single Item' && $window.cordova) {
                        startScan();
                    }
                });
        };

        // Resets view for new scan
        vm.newScan = function() {
            hideScanSettingsModal();
            resetScanSettings();
        };

        // Initializes the barcode scanner
        vm.startScan = function(){
            startScan();
        };

        // Goes to edit view with item id
        vm.editItem = function(item) {
            editedItem = item;
            $state.go('^.edit-item', {itemId: item.id});
        };

        // Opens a type accordion
        vm.toggleItemTypeOpen = function(type) {
           type.isOpen = !type.isOpen;
        };

        //// END VIEW MODEL FUNCTIONS ////

        //// MODAL FUNCTIONS ////

        // Hides the scan settings modal
        function showScanSettingsModal() {
            if(!scanSettingsModal) {
                $ionicModal.fromTemplateUrl('templates/modals/scan-settings.html', {
                    scope: $scope,
                    animation: 'slide-in-up' // maybe use slide-in-down if it works on mobile
                }).then(function success(modal) {
                    scanSettingsModal = modal;
                    scanSettingsModal.show();
                });
            } else {
                scanSettingsModal.show();
            }
        }

        // Shows dialog for creating a new item while scanning
        function showNewItemModal() {
            if(!newItemModal) {
                $ionicModal.fromTemplateUrl('templates/modals/new-item.html', {
                    scope: $scope,
                    animation: 'slide-in-up' // maybe use slide-in-down if it works on mobile
                }).then(function success(modal) {
                    newItemModal = modal;
                    newItemModal.show();
                });
            } else {
                newItemModal.show();
            }
        }

        // Hides the new item modal
        function hideNewItemModal() {
            if(newItemModal){
                newItem = {};
                newItemModal.hide();
            }
        }

        // Hides the scan settings modal
        function hideScanSettingsModal() {
            if(scanSettingsModal){
                scanSettingsModal.hide();
            }
        }

        //// END MODAL FUNCTIONS ////

        // Check if the item is in the current room
        function checkItem(barcode) {
            var item = null;
            var type = null;
            for(var key in vm.room.inRoom) {
                type = vm.room.inRoom[key];
                for (var y = 0; y < type.items.length; y++) {
                    if(type.items[y].barcode == barcode) {
                        item = type.items[y];
                        if(!type.items[y].scanned){
                            type.scanned++;
                            type.items[y].scanned = true;
                        }
                        break;
                    }
                }
            }
            return item;
        }

        // Brings up camera to scan barcode or scans manually entered barcode
        function startScan() {
            if($window.cordova) {
                // Access Device Camera
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        // Camera scan not cancelled
                        if(!result.cancelled){
                            saveItem(result.text);
                        }
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    },
                    {   // camera Scan Settings
                        "preferFrontCamera" : false, // iOS and Android
                        "showFlipCameraButton" : false, // iOS and Android
                        "prompt" : "Place a barcode inside the scan area", // supported on Android only
                    }
                );
            } else {
                // Manually Enter Barcode
                if(vm.barcode) {
                    var barcode = vm.barcode;
                    vm.barcode = null;
                    saveItem(barcode);
                }
            }
        }

        // Receive a barcode, checking if in correct room, item type exits, or in wrong room
        // For single item scans it goes directly to the edit item page
        function saveItem(barcode) {
            // Check if the item scanned is already in the room or not
            var item = checkItem(barcode);
            if(!item) {
                // Check to see if the item has already been created or not
                getItemBarcodeApi(barcode)
                    .then(function success(item) {
                        // Item has already been created but is currently in the wrong room
                        if(item) {
                            // Go directly to edit item for single item scans
                            if(vm.scanSettings.scanType == 'Single Item') {
                                vm.editItem(item);
                            } else {
                                // Add Item to In Wrong Room
                                vm.room.inWrongRoom.push({
                                    id: item.id,
                                    barcode: item.barcode,
                                    room: item.roomId,
                                    type: item.itemTypeId
                                });
                            }
                        } else {
                            // Create New Item
                            newItem = {
                                barcode: barcode,
                                room: vm.scanSettings.room.id,
                                type: null,
                                creator: API.getUserId()
                            };
                            showNewItemModal();
                        }
                    });
            } else {
                // Go directly to edit item for single item scans
                if(vm.scanSettings.scanType == 'Single Item') {
                    vm.editItem(item);
                } else {
                    $scope.$apply();
                }
            }
        }

        // Resets the view
        function resetScanSettings() {
            vm.title = 'Set Scan Settings';
            vm.scanSettings.room = null;
            vm.scanSettings.set = false;
            vm.hasItemsInRoom = true;
            vm.room = {
                inRoom: {},
                inWrongRoom: []
            };
            vm.itemType = null;
            getItemTypesApi()
                .then(function success(types) {
                    for (var i = 0; i < types.length; i++) {
                        vm.types[types[i].id] = types[i];
                        vm.room.inRoom[types[i].id] = {
                            name: types[i].name,
                            id: types[i].id,
                            scanned: 0,
                            items: []
                        }
                    }
                });
        }

        // Groups items by type in an array
        function sortItemsByType(items) {
            for (var i = 0; i < items.length; i++) {
                vm.room.inRoom[items[i].type].items.push(items[i]);
            }
        }

        // Returning to scan state from edit state and refreshing item list for changes
        $rootScope.$on('$stateChangeSuccess', function (ev, toState, toParams, fromState, fromParams) {
            if(fromState.name == 'app.edit-item' && toState.name == 'app.scan-items') {
                if(vm.scanSettings.scanType == 'Single Item') {
                    resetScanSettings();
                } else {
                    getItemApi(fromParams.itemId)
                        .then(function success(item) {
                            if(editedItem.room !== vm.scanSettings.room.id && item.roomId === vm.scanSettings.room.id) {// Wrong room to current room
                                // Remove item from in wrong room list
                                for (var i = 0; i < vm.room.inWrongRoom.length; i++) {
                                    if(vm.room.inWrongRoom[i].id === editedItem.id) {
                                        vm.room.inWrongRoom.splice(i, 1);
                                        break;
                                    }
                                }
                                // Increment type scanned count
                                vm.room.inRoom[item.itemTypeId].scanned++;
                                // Add item to new type list
                                vm.room.inRoom[item.itemTypeId].items.push({
                                    id: item.id,
                                    barcode: item.barcode,
                                    room: item.roomId,
                                    type: item.itemTypeId,
                                    scanned: true
                                });
                            } else if(editedItem.room === vm.scanSettings.room.id && item.roomId === vm.scanSettings.room.id) { // In the correct room and changing item type
                                if(editedItem.type !== item.itemTypeId){
                                    // Remove item from old type list
                                    for (var i = 0; i < vm.room.inRoom[editedItem.type].items.length; i++) {
                                        if(vm.room.inRoom[editedItem.type].items[i].id === editedItem.id) {
                                            vm.room.inRoom[editedItem.type].items.splice(i, 1);
                                            break;
                                        }
                                    }
                                    // Decrement scanned count for old type if it was scanned before
                                    if(editedItem.scanned) {
                                        vm.room.inRoom[editedItem.type].scanned--;
                                    }
                                    // Switch the item type to the new type
                                    editedItem.type = item.itemTypeId
                                    // Increment scanned count for new type if it was scanned before
                                    if(editedItem.scanned) {
                                        vm.room.inRoom[editedItem.type].scanned++;
                                    }
                                    // Add item to new type list
                                    vm.room.inRoom[editedItem.type].items.push(editedItem);
                                }
                            } else if(editedItem.room === vm.scanSettings.room.id && item.roomId !== vm.scanSettings.room.id) { // In room to different room
                                for (var i = 0; i < vm.room.inRoom[editedItem.type].items.length; i++) {
                                    if(vm.room.inRoom[editedItem.type].items[i].id === editedItem.id) {
                                        vm.room.inRoom[editedItem.type].items.splice(i, 1);
                                        break;
                                    }
                                }
                                if(editedItem.scanned) {
                                    vm.room.inRoom[editedItem.type].scanned--;
                                }
                            }
                            
                        });
                }
            }
        });
    }
})();
