(function() {
    'use strict';

    angular
        .module('app.api')
        .factory('Rooms', ['$http', '$q', 'API', Rooms]);

    function Rooms($http, $q, API) {

        // Get rooms in building
        function getBuildingRooms(buildingId) {
            return $http.get(API.sailsUrl + '/rooms/building/'+buildingId)
                .then(function success(res) {
                    if(res.data) {
                        return res.data.data.rooms;
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

        // Get all items in a room
        function getItems(roomId) {
            return $http.get(API.sailsUrl + '/rooms/' + roomId + '/item')
                .then(function success(res) {
                    if(res.data) {
                        return res.data.data.items;
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

        // Creates a new room in a department building
        function addRoom(buildingId, room) {
            return $http({
                method: 'POST',
                headers: { 'Content-Type': 'application/form-data; charset=UTF-8' },
                data: {
                    creator: API.getUserId(),
                    building: buildingId,
                    number: room
                },
                url: (API.sailsUrl + '/rooms')
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

        return {
            getBuildingRooms : getBuildingRooms,
            getItems         : getItems,
            addRoom          : addRoom
        };
    }
})();
