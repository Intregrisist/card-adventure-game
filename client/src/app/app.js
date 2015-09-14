/**
 * Load All Modules
 */
angular.module('app', [
    'ngRoute',
    'ngStorage',
    'http-auth-interceptor',
    'security',

    // Controllers
    'dashboard',
    'game',

    // Directives
    'ui.bootstrap-4',

    // Templates
    'templates.app',
    'templates.common'
]);

/**
 * Default App Configuration
 */
angular.module('app')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $routeProvider.otherwise({
                redirectTo: '/game'
            });
        }
    ]);

/**
 * Start up the application
 */
angular.module('app')
    .run(['security', function (security) {
        console.log('Application Startup');

        security.requestCurrentUser();

        // TODO: Get the current user when the application starts
        console.log(security);
    }]);

angular.module('app')
    .controller('AppCtrl', function ($scope) {
        console.log('Controller: AppCtrl');

        $scope.alerts = [
            //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    });

angular.module('app')
    .controller('HeaderCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
            console.log('Controller: HeaderCtrl');

            $scope.location = $location;

            //$scope.isAuthenticated = security.isAuthenticated;
            //$scope.isAdmin = security.isAdmin;

            $scope.home = function () {
                /*
                 if (security.isAuthenticated()) {
                 $location.path('/dashboard');
                 } else {
                 $location.path('/projectsinfo');
                 }
                 */
            };

            //$scope.hasPendingRequests = function () {
            //    return httpRequestTracker.hasPendingRequests();
            //};
        }]);