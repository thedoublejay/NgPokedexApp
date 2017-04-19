(function () {

    var app = angular.module('ngPokemonApp');

    var PokedexController = function (PokemonData, PokeUtility, $q) {

        var pokedexCtrl = this;

        pokedexCtrl.getFilters = function () {

            PokeUtility.getFilters(pokedexCtrl.pokes, pokedexCtrl.pokemonTypes)
                .then((result) => {
                    pokedexCtrl.pokeNames = result.pokeNames;
                    pokedexCtrl.filterNames = result.filterNames;
                    pokedexCtrl.pokeIds = result.pokeIds;
                    pokedexCtrl.filterIds = result.filterIds;
                    pokedexCtrl.filterTypes = result.filterTypes;
                    pokedexCtrl.pokeTypes = result.pokeTypes;

                });
        };

        pokedexCtrl.getData = function(){

            var pokemonsPromise = PokemonData.getJson('pokedex').$promise;
            var pokemonTypesPromise = PokemonData.getJson('types').$promise;
            var pokemonSkillsPromise = PokemonData.getJson('skills').$promise;

            $q.all([pokemonsPromise, pokemonTypesPromise, pokemonSkillsPromise])
              .then( (result) => {
                      pokedexCtrl.pokes = result[0];  
                      pokedexCtrl.pokemonTypes = result[1];
                      pokedexCtrl.getFilters();
                      pokedexCtrl.pokeWTypes = pokedexCtrl.pokes.map((poke) => PokeUtility.matchType(poke, pokedexCtrl.pokemonTypes));
                      pokedexCtrl.pokemonSkills = result[2]; 
                      pokedexCtrl.pokemons = pokedexCtrl.pokeWTypes.map((poke) => PokeUtility.matchSkills(poke, pokedexCtrl.pokemonSkills, pokedexCtrl.pokemonTypes));
                      pokedexCtrl.currentPokemon = pokedexCtrl.pokemons[0];
                      pokedexCtrl.currentPokemon.isRowSelected = true;
                      pokedexCtrl.isLoading = false; 
                   });

        };



        pokedexCtrl.$onInit = function () {

            pokedexCtrl.pokemons = [];
            pokedexCtrl.isLoading = true;
            pokedexCtrl.currentPokemon = {};
            pokedexCtrl.pokeNames = [];
            pokedexCtrl.pokeIds = [];
            pokedexCtrl.pokeTypes = [];

            pokedexCtrl.filterNames = [];
            pokedexCtrl.filterIds = [];
            pokedexCtrl.filterTypes = [];
           
            pokedexCtrl.getData();

        };



    };

    app.component('pokedex', {
        templateUrl: '/templates/components/pokedex.component.html',
        controllerAs: 'pokedexCtrl',
        controller: ['PokemonData', 'PokeUtility', '$q', PokedexController]
    });


}());