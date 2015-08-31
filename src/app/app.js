/**
 * Load All Modules
 */
angular.module('app', [
    'ngRoute',
    'dashboard',
    'ui.bootstrap-4'
]);

/**
 * Default App Configuration
 */
angular.module('app').config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });
    }
]);

/**
 * Start up the application
 */
//angular.module('app').run(['security', function(security) {
//    // TODO: Get the current user when the application starts
//}]);

angular.module('app').controller('AppCtrl', function($scope) {
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});