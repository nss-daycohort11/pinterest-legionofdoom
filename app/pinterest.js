var app = angular.module("PinterestApp", ["ngRoute", "firebase", "ui.bootstrap"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'loginControl'
      })
      .when('/board', {
        templateUrl: 'app/partials/board.html',
        controller: 'MainCtrl'
      })
      .otherwise('/login');
  }]);


app.controller("loginControl",
	["$scope", "$firebaseAuth", "Auth", "$firebaseArray", "$location", "$rootScope", function($scope, $firebaseAuth, Auth, $firebaseArray, $location, $rootScope) {

		$scope.user={};

 	  $scope.signUp = function() {
      $scope.message = null;
      $scope.error = null;
      $scope.starter = [];
      var boardStuff = {PinIsOnThisBoard:'sample'};
      var imgUrl = "ImageString";
      var pinTitle = "pin Title";
      var pinDesc = "pin Description";
        // Auth.logUs(true);

      Auth.useAuth().$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
        
        console.log("What we'll add", {board: boardStuff, imgUrl, pinTitle, pinDesc});
        
        var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + userData.uid);
        var addRefArray = $firebaseArray(addRef)
        addRefArray.$loaded()
          .then(function() {
            addRefArray.$add({board: boardStuff, imgUrl, pinTitle, pinDesc});
          }) 
          .then(function() {
            $rootScope.loggedIn = true;
            $location.path('/board').replace();
          })
          .catch(function(error) {
          console.log("Error in the addRef:", error);
          });

      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.loginUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.useAuth().$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User logged in with uid: " + userData.uid;
        $rootScope.loggedIn = true;
        // Auth.logUs(true);

        $location.path('/board').replace();

        console.log("HELLO?", $scope.message);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.logOut = function() {
    	Auth.useAuth().$unauth();
    	$scope.authData = null;
      $rootScope.loggedIn = false;
    	// Auth.logUs(false);
    	$scope.user={};
    	console.log("No longer logged in?");
    };






}]);