(function () {

    var app = angular.module('ngPokemonApp');

    var PokedexController = function ($scope, PokemonData, PokeUtility) {

        var PokeCtrl = this;

        PokeCtrl.message = 'Hello World';
        PokeCtrl.pokemons = [];

        PokemonData.getJson('pokedex')
            .$promise
            .then((pokemons) => {
                PokeCtrl.pokes = pokemons;
                PokemonData.getJson('types')
                    .$promise
                    .then((types) => {
                        PokeCtrl.pokemonTypes = types;
                        PokeCtrl.pokeWTypes = PokeCtrl.pokes.map( (poke) => PokeUtility.matchType(poke, PokeCtrl.pokemonTypes));
                        PokemonData.getJson('skills')
                            .$promise
                            .then((skills) => {
                                PokeCtrl.pokemonSkills = skills;
                                PokeCtrl.pokemons = PokeCtrl.pokeWTypes.map( (poke) => PokeUtility.matchSkills(poke, PokeCtrl.pokemonSkills));
                                PokeCtrl.currentPokemon = PokeCtrl.pokemons[0];
                                PokeCtrl.currentPokemon.isRowSelected = true;
                            });
                    });
            });
        
         PokeCtrl.selectPokemon = function(poke){
             poke.isRowSelected = true;
             PokeCtrl.currentPokemon.isRowSelected = false;
             PokeCtrl.currentPokemon = poke;
         };



    };

    PokedexController.$inject = ['$scope', 'PokemonData', 'PokeUtility'];
    app.controller('PokedexController', PokedexController);



}());