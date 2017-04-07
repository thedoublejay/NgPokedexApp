(function () {

    var app = angular.module('ngPokemonApp');

    var PokeUtility = function () {

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

        var matchPokemonSkills = function (pokemon, skills) {
            if (pokemon) {
                angular.forEach(pokemon.skills.level_up, function (lvl, key) {

                    if (!pokemon.skillset) {
                        pokemon.skillset = [];
                    }

                    pokemon.skillset.push(skills.find((skillsObj) =>
                        skillsObj.id == lvl));
                    
                  
                });
                
                pokemon.imgLink = getImgName(pokemon);
                pokemon.base.SpAtk = pokemon.base['Sp.Atk'];
                pokemon.base.SpDef = pokemon.base['Sp.Def'];

                return pokemon;
            }
        };
        
        var getImgName = function(pokemon){
            
            return pokemon.id + '' + pokemon.ename;
            
        };


        return {

            matchType: function (pokemon, types) {
                return matchPokemonType(pokemon, types);
            },
            matchSkills: function (pokemon, skills) {
                return matchPokemonSkills(pokemon, skills);
            },
            getImg: function (pokemon){
                return getImgName(pokemon);
            }

        }


    };

    app.factory('PokeUtility', PokeUtility);

}());