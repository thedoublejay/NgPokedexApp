(function () {

    var app = angular.module('ngPokemonApp');

    app.directive('pokeType', function () {

        return {
            restrict: 'E',
            templateUrl: 'poketype.html',
            scope: {
                type: "="
            }
        }

    });

    app.directive('pokeLabel', function () {

        return {
            restrict: 'E',
            templateUrl: 'pokelabel.html',
            scope: {
                labelId: "@labelid",
                labelName: "@labelname",
                labelVal: "@labelval"
            }
        };

    });

    app.directive('sortIcon', function () {

        return {
            restrict: 'E',
            templateUrl: 'sorticon.html',
            scope: {
                propertyname: "=",
                prop: "@",
                reverse: "="
            }
        };

    });

    app.directive('loader', function () {

        return {
            restrict: 'E',
            templateUrl: 'loader.html'
        };

    });

    app.directive('pokeFilter', function () {

        return {
            restrict: 'E',
            templateUrl: 'btnfilter.html',
            scope: {
                btnname: "@",
                filterNames: "=",
                filterIds: "=",                
                filterTypes: "=",
                filterBy: "@",
                viewList: "="
            },
            controller: function ($scope) {
                $scope.showFilter = false;
                
                $scope.clickFilter = function(){
                    $scope.showFilter = !$scope.showFilter;
                };
                
                $scope.selectFilter = function (name, isIncluded, filterBy) {

                    if (isIncluded) {
                        if (filterBy == 'ename') {
                            $scope.filterNames.push(name);
                        } else if (filterBy == 'id') {
                            $scope.filterIds.push(name);
                        } else if (filterBy == 'type') {
                            $scope.filterTypes.push(name);
                        }
                    } else {
                        if (filterBy == 'ename') {
                            removeElement(name, $scope.filterNames);
                        } else if (filterBy == 'id') {
                            removeElement(name, $scope.filterIds);
                        } else if (filterBy == 'type') {
                            removeElement(name, $scope.filterTypes);
                        }
                    }


                };

                function removeElement(val, list) {
                    var index = list.indexOf(val);
                    if (index > -1) {
                        list.splice(index, 1);
                    }
                    return list;
                }

            }
        };

    });


    app.filter('ifEmpty', function () {

        return function (obj) {
            if (angular.isUndefined(obj) || obj === null || obj === '') {
                return '--';
            }
            return obj;
        }

    });

    app.filter('selectedNameFilter', function () {

        return function (pokemons, filters) {

            return pokemons.filter(function (pokemon) {
                if (filters.indexOf(pokemon.ename) != -1) {
                    return true;
                }
                return false;
            });

        };

    });
    
    app.filter('selectedIdFilter', function () {

        return function (pokemons, filters) {

            return pokemons.filter(function (pokemon) {
                if (filters.indexOf(pokemon.id) != -1) {
                    return true;
                }
                return false;
            });

        };

    });
    
    app.filter('selectedTypeFilter', function () {

        return function (pokemons, filters) {

            return pokemons.filter(function (pokemon) {
                var isValid = false;
               
                angular.forEach(pokemon.typeset, function(type, key){
                    if (filters.indexOf(type.ename) != -1) {
                        isValid = true;
                    }                    
                });
                
                return isValid;
            });

        };

    });

}());