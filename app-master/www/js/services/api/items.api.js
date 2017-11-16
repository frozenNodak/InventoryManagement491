(function() {
    'use strict';

    angular
        .module('app.api')
        .factory('Items', ['$http', '$q', 'API', Items]);

    function Items($http, $q, API) {

        // Gets specific item
        function getItem(itemId) {
            return $http.get(API.sailsUrl + '/items/' + itemId)
                .then(function success(res) {
                    if(res.data) {
                        return res.data.data[0];
                    } else {
                        return $q.reject(res.data);
                    }
                }).catch(function error(reason) {
                    return $q.reject({
                        error: 'Error with API request.',
                        origErr: reason
                    });
                });
        }

        // Get an item by its barcode
        function getItemBarcode(barcode) {
            return $http.get(API.sailsUrl + '/items/barcode/' + barcode)
                .then(function success(res) {
                    if(res.data) {
                        return res.data.data[0];
                    } else {
                        return $q.reject(res.data);
                    }
                }).catch(function error(reason) {
                    return $q.reject({
                        error: 'Error with API request.',
                        origErr: reason
                    });
                });
        }

        // Returns all items in a specific room
        function searchItems(departmentId, buildingId, roomId) {
            var route = API.sailsUrl + '/items/search/' + departmentId
            
            if(buildingId != 0) {
                route += '/' + buildingId;
                if(roomId != 0) {
                    route += '/' + roomId;
                }
            }

            return $http.get(route)
                .then(function success(res) {
                    if(res.data) {
                        return res.data.data;
                    } else {
                        return $q.reject(res.data);
                    }
                }).catch(function error(reason) {
                    return $q.reject({
                        error: 'Error with API request.',
                        origErr: reason
                    });
                });
        }

        // Creates a new item
        function createItem(item) {
            return $http({
                method: 'POST',
                headers: { 'Content-Type': 'application/form-data; charset=UTF-8' },
                data: {
                    barcode: item.barcode,
                    room: item.room,
                    type: item.type,
                    creator: item.creator
                },
                url: (API.sailsUrl + '/items')
            }).then(function success(res) {
                if(res.data) {
                    return res.data.data;
                } else {
                    return $q.reject(res.data);
                }
            }).catch(function error(reason) {
                return $q.reject({
                    error: 'Error with API request.',
                    origErr: reason
                });
            });
        }

        // Updates specific item
        function updateItem(item) {
            return $http({
                method: 'PUT',
                headers: { 'Content-Type': 'application/form-data; charset=UTF-8' },
                data: {
                    description: item.description,
                    type: item.type.id,
                    room: item.room.id,
                    boughtPrice: item.boughtPrice,
                    currentPrice: item.currentPrice
                },
                url: (API.sailsUrl + '/items/' + item.id)
            }).then(function success(res) {
                if(res.data) {
                    return;
                } else {
                    return $q.reject(res.data);
                }
            }).catch(function error(reason) {
                return $q.reject({
                    error: 'Error with API request.',
                    origErr: reason
                });
            });
        }

        // Gets all item types
        function getItemTypes() {
            return $http.get(API.sailsUrl + '/itemtypes/')
                .then(function success(res) {
                    if(res.data) {
                        return res.data.data;
                    } else {
                        return $q.reject(res.data);
                    }
                }).catch(function error(reason) {
                    return $q.reject({
                        error: 'Error with API request.',
                        origErr: reason
                    });
                });
        }


        return {
            getItem        : getItem,
            getItemBarcode : getItemBarcode,
            getItemTypes   : getItemTypes,
            searchItems    : searchItems,
            createItem     : createItem,
            updateItem     : updateItem
        };
    }
})();
