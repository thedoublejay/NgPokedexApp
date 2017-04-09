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
    
   app.directive('pokeLabel', function(){
       
       return {
           restrict: 'E',
           templateUrl: 'pokelabel.html',
           scope: {
               labelId : "@labelid",
               labelName : "@labelname",
               labelVal : "@labelval"
           }
       };
       
   });
    
   app.directive('sortIcon', function(){
       
       return {
           restrict: 'E',
           templateUrl: 'sorticon.html',
           scope: {
               propertyname : "=",
               prop : "@",
               reverse : "="
           }
       };
       
   });
    
  app.directive('loader', function(){
       
       return {
           restrict: 'E',
           templateUrl: 'loader.html'
       };
       
   });
    
   app.filter('ifEmpty', function(){
       
       return function(obj){
            if(angular.isUndefined(obj) || obj === null || obj === ''){
                return '--';
            }
            return obj;
        }
       
   });
    
}());