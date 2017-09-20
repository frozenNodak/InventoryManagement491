(function() {
    'use strict';

    angular
        .module('app.api')
        .factory('Buildings', ['$http', '$q', 'API', Buildings]);

    function Buildings($http, $q, API) {

        // Get all buildings within a department
        function getDepartmentBuildings(departmentId) {
            return $http.get(API.sailsUrl + '/buildings/department/'+departmentId)
                .then(function success(res) {
                    if(res.data) {
                        return res.data.data.buildings;
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
            getDepartmentBuildings: getDepartmentBuildings
        };
    }
})();
