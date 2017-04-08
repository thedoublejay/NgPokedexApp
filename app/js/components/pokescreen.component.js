(function(){

    var app = angular.module('ngPokemonApp');
    
    var PokeScreenController = function(){
        
        var pokeScreenCtrl = this;  
        
                
    };
    
    app.component('pokeScreen', {
        
        templateUrl: '/templates/components/pokescreen.component.html',
        controllerAs: 'pokeScreenCtrl',
        controller: PokeScreenController,
        bindings: {
            current : '=',
            loading : '<'
        }
        
    });
    
}());