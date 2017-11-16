(function() {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', AppRoutes]);

    function AppRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })

            .state('error', {
                url: '/error',
                params: {
                    reason: {
                        type: 'object',
                        value: {}
                    }
                },
                templateUrl: 'templates/error.html',
                controller: 'ErrorController',
                controllerAs: 'vm'
            })


            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppController',
                controllerAs: 'vm'
            })

            .state('app.scan-items', {
                url: '/scan-items',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/scan-items.html',
                        controller: 'ScanItemsController',
                        controllerAs: 'vm'
                  }
                }
            })

            .state('app.edit-item', {
                url: '/edit-item/:itemId',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/edit-item.html',
                        controller: 'EditItemController',
                        controllerAs: 'vm'
                  }
                }
            })
            .state('app.search-items', {
                url: '/search-items',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search-items.html',
                        controller: 'SearchItemsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.search-items.view-items', {
                url: '/view-items/:departmentId/:buildingId/:roomId',
                views: {
                    'menuContent@app': {
                        templateUrl: 'templates/view-items.html',
                        controller: 'ViewItemsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.user-information', {
                url: '/user-information',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user-information.html',
                        controller: 'UserInformationController',
                        controllerAs: 'vm'
                    }
                }
            })

          .state('app.add-room', {
                url: '/add-room',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/add-room.html',
                        controller: 'AddRoomController',
                        controllerAs: 'vm'
                    }
                }
          });
    }
})();
