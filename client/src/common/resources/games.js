angular.module('resources.games',[])
    .factory('Games', ['$timeout', function($timeout) {
    // Dummy current user data, this will be done at login or possibly some session ID
    // if we don't want to have registered users.
    var currentUser = {
        id: 10001,
        username: 'Daniel'
    };

    // Dummy games object for testing, uses $timeout to simulate an API call.
    var Games = {
        _rooms: {},
        create: function(room, callback) {
            // Dummy create room function
            $timeout(function() {
                var response = { success: false };

                // "CREATE" a room if it doesn't already exist
                if(room !== null && !this._rooms.hasOwnProperty(room)) {
                    this._rooms[room] = {
                        players: [currentUser.id]
                    };

                    response.success = true;
                }

                callback.call(this, response);
            }, 1000);
        },
        join: function(room, callback) {
            // Dummy join room function
            $timeout(function() {
                var response = { success: false };

                // "Join" a room only if it has been created
                if(room !== null && this._rooms.indexOf(room) >= 0) {
                    response.success = true;
                }

                callback.call(this, response);
            }, 1000);
        },
        all: function() {
            return this._rooms;
        }
    };

    return Games;
}]);