var app = angular.module("PinterestApp", ["ngRoute", "firebase", "angular.filter"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/songs/list', {
        templateUrl: 'partials/song-list.html',
        controller: 'PinterestCtrl'
      })
  }]);


app.controller("PinterestCtrl",
	["$q", "$http", "$scope", function(Q, HTTP, scope) {






}]);