(function() {
    'use strict';

    angular
        .module('app.api')
        .factory('Users', ['$http', '$q', 'API', Users]);

    function Users($http, $q, API) {

    	// Gets specific item
        function getUser() {
        	var userId = API.getUserId()

            return $http.get(API.sailsUrl + '/users/' + userId)
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
        	getUser : getUser
        };
    }
})();
