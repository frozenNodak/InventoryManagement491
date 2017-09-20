(function() {
    'use strict';

    angular
        .module('app.api')
        .factory('Departments', ['$http', '$q', 'API', Departments]);

    function Departments($http, $q, API) {

        // Get all departments where user has correct permissions
        function getDepartments() {
            return $http.get(API.sailsUrl + '/departments')
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
            getDepartments : getDepartments
        };
    }
})();
