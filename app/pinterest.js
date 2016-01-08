var app = angular.module("PinterestApp", ["ngRoute", "firebase", "ui.bootstrap", "angular.filter"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'loginControl'
      })
      .when('/board', {
        templateUrl: 'app/partials/board.html',
        controller: 'Board'
      })
      .when('/profile', {
        templateUrl: 'app/partials/profile.html',
        controller: 'Profile'
      })
      .otherwise('/login');
  }]);


app.controller("loginControl",
	["$scope", "$firebaseAuth", "Auth", "$firebaseArray", "$location", "$rootScope",
	 function($scope, $firebaseAuth, Auth, $firebaseArray, $location, $rootScope) {


		$scope.user={};

    //Signup functionality
 	  $scope.signUp = function() {
      $scope.message = null;
      $scope.error = null;
      $scope.starter = [];
      var board = 'sample';
      var img = "ImageString";
      var title = "pin Title";
      var description = "pin Description";
        // Auth.logUs(true);

        //Authorizes user
      Auth.useAuth().$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
        //Store the UID
        Auth.setUid(userData.uid);
        
        console.log("What we'll add", {board: board, img, title, description});
        
        var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + userData.uid);
        var addRefArray = $firebaseArray(addRef)
        addRefArray.$loaded()
          .then(function() {
            addRefArray.$add({board: board, img, title, description});
          }) 
          .then(function() {
            //Keep the auth state on the rootScope, since we built our controllers oddly
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

    // Logging in
    $scope.loginUser = function() {
      $scope.message = null;
      $scope.error = null;

        //Authorizes user
      Auth.useAuth().$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User logged in with uid: " + userData.uid;
        //Keep the auth state on the rootScope, since we built our controllers oddly
        $rootScope.loggedIn = true;
        // Auth.logUs(true);
        Auth.setUid(userData.uid);
        $location.path('/board').replace();

        console.log("HELLO?", $scope.message);
      }).catch(function(error) {
        $scope.error = error;
      });
    };



}]);