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
	["$scope", "$firebaseAuth", "Auth", function($scope, $firebaseAuth, Auth) {
		$scope.user={};

 	  $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  
  console.log("auth", Auth);


}]);