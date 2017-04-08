(function () {

    var app = angular.module('ngPokemonApp');

    var PokedexController = function ($scope, PokemonData, PokeUtility) {

        var PokeCtrl = this;

        PokeCtrl.pokemons = [];
        PokeCtrl.isLoading = true;
        
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
                                PokeCtrl.pokemons = PokeCtrl.pokeWTypes.map( (poke) => PokeUtility.matchSkills(poke, PokeCtrl.pokemonSkills, PokeCtrl.pokemonTypes));
                                PokeCtrl.currentPokemon = PokeCtrl.pokemons[0];
                                PokeCtrl.currentPokemon.isRowSelected = true;
                                 PokeCtrl.isLoading = false;
                            });
                    });
            });
        
         PokeCtrl.selectPokemon = function(poke){
             poke.isRowSelected = true;
             PokeCtrl.currentPokemon.isRowSelected = false;
             PokeCtrl.currentPokemon = poke;
         };
        
        PokeCtrl.propertyName = 'id';
        PokeCtrl.reverse = false;
        
        PokeCtrl.sortBy = function(propertyName) {
            PokeCtrl.reverse = (PokeCtrl.propertyName === propertyName) ? !PokeCtrl.reverse : false;
            PokeCtrl.propertyName = propertyName;
        };

    };

    PokedexController.$inject = ['$scope', 'PokemonData', 'PokeUtility'];
    app.controller('PokedexController', PokedexController);



}());