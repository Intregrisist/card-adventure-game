'use strict';

angular.module('CardAdventure', [])
    .factory('playingCards', function() {
        // TODO: Use our API to get an update of these cards
        return {
            "characters": [
                {
                    name: "Rivky Summers",
                    health: 10,
                    damage: 1
                },
                {
                    name: "Ren Saito",
                    health: 9,
                    damage: 2
                }
            ],
            "discard": [],
            "keep": [],
            "monsters": []
        };
    })
    .service('GameManager', ['playingCards', function (playingCards) {
        this.playingCards = playingCards;

        /**
         * Current player's hand (of cards);
         * @type {Array}
         */
        this.hand = [];

        /**
         * The discarded cards.
         * @type {Array}
         */
        this.discard = [];

        /**
         * The deck
         * @type {Array}
         */
        this.deck = [];

        /**
         * Init function
         */
        function init() {

        }

        this.newGame = function() {
            console.log(playingCards);


        };

        /**
         * Shuffle an array
         * Source: https://github.com/coolaj86/knuth-shuffle
         *
         * @param {Array} array
         * @returns {Array}
         */
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex ;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        init();
    }]);