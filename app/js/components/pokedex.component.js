(function () {

    var app = angular.module('ngPokemonApp');

    var PokedexController = function (PokemonData, PokeUtility) {

        var pokedexCtrl = this;

        pokedexCtrl.$onInit = function () {

            pokedexCtrl.pokemons = [];
            pokedexCtrl.isLoading = true;           
            pokedexCtrl.currentPokemon = {};
                
            PokemonData.getJson('pokedex')
                .$promise
                .then((pokemons) => {
                    pokedexCtrl.pokes = pokemons;
                    PokemonData.getJson('types')
                        .$promise
                        .then((types) => {
                            pokedexCtrl.pokemonTypes = types;
                            pokedexCtrl.pokeWTypes = pokedexCtrl.pokes.map((poke) => PokeUtility.matchType(poke, pokedexCtrl.pokemonTypes));
                            PokemonData.getJson('skills')
                                .$promise
                                .then((skills) => {
                                    pokedexCtrl.pokemonSkills = skills;
                                    pokedexCtrl.pokemons = pokedexCtrl.pokeWTypes.map((poke) => PokeUtility.matchSkills(poke, pokedexCtrl.pokemonSkills, pokedexCtrl.pokemonTypes));
                                    pokedexCtrl.currentPokemon = pokedexCtrl.pokemons[0];
                                    pokedexCtrl.currentPokemon.isRowSelected = true;
                                    pokedexCtrl.isLoading = false;
                                });
                        });
                    });
            

        };

    };

    app.component('pokedex', {
        templateUrl: '/templates/components/pokedex.component.html',
        controllerAs: 'pokedexCtrl',
        controller: ['PokemonData', 'PokeUtility', PokedexController]
    });
    

}());