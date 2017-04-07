(function () {

    var app = angular.module('ngPokemonApp');

    var PokedexController = function ($scope) {
        
        var PokeCtrl = this;
        
        PokeCtrl.message = 'Hello World';

    };

    PokedexController.$inject = ['$scope'];
    app.controller('PokedexController', PokedexController);



}());