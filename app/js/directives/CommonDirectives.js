( function(){
   
   var app = angular.module('ngPokemonApp');
   
   app.directive('pokeType', function(){
       
       return {
           restrict: 'E',
           templateUrl: 'poketype.html',
           scope: {
               type : "="
           }
       }
       
   });
    
}());