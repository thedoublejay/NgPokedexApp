(function () {

    var app = angular.module('ngPokemonApp');

    var PokeUtility = function ($q) {

        var filterNames = [];
        var pokeNames = [];
        var filterIds = [];
        var pokeIds = [];
        var filterTypes = [];
        var pokeTypes = [];

        var matchPokemonType = function (pokemon, types) {
            if (pokemon) {
                angular.forEach(pokemon.type, function (typ, key) {

                    if (!pokemon.typeset) {
                        pokemon.typeset = [];
                    }

                    pokemon.typeset.push(types.find((typeObj) =>
                        typeObj.cname == typ));
                });

                return pokemon;
            }
        };

        var matchPokemonSkills = function (pokemon, skills, types) {
            if (pokemon) {
                angular.forEach(pokemon.skills.level_up, function (lvl, key) {

                    if (!pokemon.skillset) {
                        pokemon.skillset = [];
                    }


                    pokemon.skillset.push(skills.find((skillsObj) => {
                        if (skillsObj.id == lvl) {
                            var skillType = types.find((type) => type.cname == skillsObj.type);
                            if (skillType) {
                                skillsObj.skillType = skillType.ename;
                            }

                            return true;
                        } else
                            return false;

                    }));


                });

                pokemon = pokePropertyAdder(pokemon);

                return pokemon;
            }
        };

        var getFilters = function (pokemons, types) {

            angular.forEach(pokemons, function (val, key) {

                pokeNames.push({
                                   val : val.ename,
                                   bool : true
                                 });
                filterNames.push(val.ename);
                
                pokeIds.push({
                                   val : val.id,
                                   bool : true
                               });
                filterIds.push(val.id);

            });

            angular.forEach(types, function (val, key) {

                pokeTypes.push({
                                   val : val.ename,
                                   bool : true
                                });
                
                filterTypes.push(val.ename);

            });

            return {
                filterNames: filterNames,
                pokeNames: pokeNames,
                filterIds: filterIds,
                pokeIds: pokeIds,
                filterTypes: filterTypes,
                pokeTypes: pokeTypes
            };

        };

        var getImgName = function (pokemon) {

            return pokemon.id + '' + (pokemon.flatName ? pokemon.flatName : pokemon.ename);

        };

        var pokePropertyAdder = function (pokemon) {

            pokemon.imgLink = getImgName(pokemon);
            pokemon.base.SpAtk = pokemon.base['Sp.Atk'];
            pokemon.base.SpDef = pokemon.base['Sp.Def'];
            pokemon.isRowSelected = false;
            pokemon.firstType = pokemon.typeset[0] ? pokemon.typeset[0].ename : '';

            return pokemon;
        };


        return {

            matchType: function (pokemon, types) {
                return matchPokemonType(pokemon, types);
            },
            matchSkills: function (pokemon, skills, types) {
                return matchPokemonSkills(pokemon, skills, types);
            },
            getFilters: function (pokemons, types) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(getFilters(pokemons, types));
                    }, 10);
                });
            }

        }


    };

    app.factory('PokeUtility', PokeUtility);

}());