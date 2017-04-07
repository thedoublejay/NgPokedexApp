(function () {

    var app = angular.module('ngPokemonApp', ['ngResource', 'ngRoute'])
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                    templateUrl: 'templates/views/Pokedex.html',
                    controller: 'PokedexController',
                    controllerAs: 'pokedexCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true).hashPrefix('!');

        });

}());