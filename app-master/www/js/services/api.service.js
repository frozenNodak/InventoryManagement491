(function() {
    'use strict';

    angular
        .module('app.api')
        .factory('API', ['$rootScope', '$http', '$q', '$window', API]);

    function API($rootScope, $http, $q, $window, $cookies) {

        var sailsUrl = 'http://54.243.4.179/v1';

        var errorTypes = {
            E_USER_NOT_FOUND: 'E_USER_NOT_FOUND'
        };

        // Creates a new session on the server, returning the session ID
        function login(email, password) {
            return $http({
                method: 'POST',
                headers: { 'Content-Type': 'application/form-data; charset=UTF-8' },
                data: {
                    email: email,
                    password: password
                },
                url: (sailsUrl + '/auth/signin')
            }).then(function success(res) {
                if(res.data) {
                    //Authentication Token
                    $window.sessionStorage.token = res.data.data.token
                    setToken();
                    setUserId(res.data.data.user.id);
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

        // TODO: Check if token is expired?
        function setToken() {
            if($window.sessionStorage.token) {
                $http.defaults.headers.common.Authorization = 'JWT ' + $window.sessionStorage.token;
            }
        }

        // TODO: Check if token is expired?
        function removeToken() {
            if($window.sessionStorage.token) {
                $http.defaults.headers.common.Authorization = null;
                delete $window.sessionStorage.token;
            }
        }

        function setUserId(userId) {
            $window.sessionStorage.userId = userId
        }

        function getUserId(userId) {
            return $window.sessionStorage.userId;
        }

        return {
            sailsUrl: sailsUrl,
            errorTypes: errorTypes,
            login: login,
            setToken: setToken,
            removeToken: removeToken,
            setUserId: setUserId,
            getUserId: getUserId
        };
    }
})();