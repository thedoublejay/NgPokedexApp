(function () {

    var app = angular.module('ngPokemonApp', ['ngResource', 'ngRoute', 'ui.bootstrap'])
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                    template: '<pokedex></pokedex>'                    
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true).hashPrefix('!');

        });

}());