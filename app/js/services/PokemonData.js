(function () {

    var app = angular.module('ngPokemonApp');

    var PokemonData = function ($resource) {

        var resource = $resource('/data/:fname', {fname: '@fname'});
        
        
        return {
            
            getJson: function (fname) {
                return resource.query({fname:fname});
            }
            
        }


    };

    PokemonData.$inject = ['$resource'];
    app.factory('PokemonData', PokemonData);

}());