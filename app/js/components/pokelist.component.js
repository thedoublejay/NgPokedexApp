(function(){

    var app = angular.module('ngPokemonApp');
    
    var PokeListController = function(){
        
        var pokeListCtrl = this;  
        
        pokeListCtrl.$onInit = function(){          
            pokeListCtrl.propertyName = 'id';
            pokeListCtrl.reverse = false;  
        };
        
        pokeListCtrl.selectPokemon = function (poke) {
            if(poke.id != pokeListCtrl.current.id){
                poke.isRowSelected = true;            
                pokeListCtrl.current.isRowSelected = false;
                pokeListCtrl.current = poke;                
            }
            
        };
        
         pokeListCtrl.sortBy = function (propertyName) {
            pokeListCtrl.reverse = (pokeListCtrl.propertyName === propertyName) ? !pokeListCtrl.reverse : false;
            pokeListCtrl.propertyName = propertyName;
        };
        
    };
    
    app.component('pokeList', {
        
        templateUrl: '/templates/components/pokelist.component.html',
        controllerAs: 'pokeListCtrl',
        controller: PokeListController,
        bindings: {
            current : '=',
            loading : '<',
            pokemons: '<',
            filterNames: '=',
            pokeNames : '=',
            filterIds: '=',            
            pokeIds: '=',
            filterTypes : '=',
            pokeTypes : '='
            
        }
        
    });
    
}());