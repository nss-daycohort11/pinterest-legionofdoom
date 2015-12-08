var app = angular.module("PinterestApp", ["ngRoute", "firebase", 'ui.bootstrap']);


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
	["$scope", "$firebaseAuth", "Auth", "$firebaseArray", function($scope, $firebaseAuth, Auth, $firebaseArray) {
		$scope.user={};

 	  $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;
      $scope.starter = [];

      Auth.$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
    
        var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + userData.uid);
        addRef = $firebaseArray(addRef)
        addRef.$add(userData.uid);

      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.loginUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
        console.log("HELLO?", $scope.message);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.logOut = function() {
    	Auth.$unauth();
    	console.log("No longer logged in?");
    };

    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      console.log("authData", authData);
    });
  
  // console.log("authData outside of onAuth", authData);

}]);