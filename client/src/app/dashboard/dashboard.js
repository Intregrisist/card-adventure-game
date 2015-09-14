angular.module('dashboard', ['resources.games'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.tpl.html',
            controller: 'DashboardCtrl',
            resolve: {
                games: ['Games', function (Games) {
                    var games = Games.all();
                    console.info('Active Games:', games);
                    return games;
                }]
            }
        });
    }])

    .controller('DashboardCtrl', ['$scope', function($scope) {
        console.log('Controller: DashboardCtrl');
    }]);