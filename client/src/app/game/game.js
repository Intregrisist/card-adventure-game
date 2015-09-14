angular.module('game', ['CardAdventure'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'game/game.tpl.html',
            controller: 'GameCtrl'
            /*
            resolve: {
                games: ['Games', function (Games) {
                    var games = Games.all();
                    console.info('Active Games:', games);
                    return games;
                }]
            }
            */
        });
    }])
    .controller('GameCtrl', ['GameManager', function(GameManager) {
        console.log('Controller: GameCtrl');

        // Set the game manager
        this.game = GameManager;

        // Reset and start a new game
        this.startGame = function () {
            this.game.newGame();
        };

        this.startGame();
    }]);