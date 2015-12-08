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
	["$scope", "$firebaseAuth", "Auth", "$firebaseArray", "$location", function($scope, $firebaseAuth, Auth, $firebaseArray, $location) {

		$scope.user={};
		$scope.loggedIn=true;

 	  $scope.signUp = function() {
      $scope.message = null;
      $scope.error = null;
      $scope.starter = [];
      var boardStuff = {PinIsOnThisBoard:'sample'};
      var imgUrl = "ImageString";
      var pinTitle = "pin Title";
      var pinDesc = "pin Description";

      Auth.useAuth().$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
   
        var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + userData.uid);
        addRef = $firebaseArray(addRef)
        addRef.$add({board: boardStuff, imgUrl, pinTitle, pinDesc});
        
        Auth.logUs(true);
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
        Auth.logUs(true);

        $location.path('/board').replace();

        console.log("HELLO?", $scope.message);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.logOut = function() {
    	Auth.useAuth().$unauth();
    	$scope.authData = null;
    	Auth.logUs(false);
    	$scope.user={};
    	console.log("No longer logged in?");
    };

    $scope.auth = Auth.useAuth();
    console.log("loggedIn", $scope.loggedIn);


    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if (authData) {
      	var test = Auth.isLoggedIn();
      	console.log("Are We logged in TEST", test);
      } else {
      	console.log("Are we logged out", $scope.authData);
			  $location.path('/login').replace();
			}
      console.log("authData", authData);
    });
  
  // console.log("authData outside of onAuth", authData);

}]);