angular.module('security', [
    'security.service'
]);

angular.module('security.service', [])
    .factory('security', ['$http', '$q', '$location', function($http, $q, $location) {

        var service = {
            /**
             *
             */
            currentUser: null,

            /**
             *
             * @param {boolean} [force=false]
             * @returns {*}
             */
            requestCurrentUser: function(force) {
                if ( service.isAuthenticated() ) {
                    return $q.when(service.currentUser);
                } else {
                    return $http.get('/current-user').then(function(response) {
                        console.log(response);

                        service.currentUser = {}; //response.data.user;
                        return service.currentUser;
                    });
                }
            },

            /**
             *
             * @returns {boolean}
             */
            isAuthenticated: function(){
                return !!service.currentUser;
            }
        };

        return service;
    }]);