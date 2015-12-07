var app = angular.module("PinterestApp", ["ngRoute", "firebase"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'loginControl'
      })
      .otherwise('/login');
  }]);


app.controller("loginControl",
	["$q", "$http", "$scope", function(Q, HTTP, scope) {




}]);