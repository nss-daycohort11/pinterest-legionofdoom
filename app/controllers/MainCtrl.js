app.controller("MainCtrl",
	["$q", "$scope", "$rootScope", "$firebaseArray", "$firebaseAuth", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, $firebaseAuth, Auth, $location) {


	$scope.legend = "ENTER NEW INFORMATION HERE";
	console.log("Hellu again?");

  $scope.auth = Auth.useAuth();
  console.log("loggedIn", $rootScope.loggedIn);

	    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if (authData) {
      	var test = Auth.isLoggedIn();
      	$rootScope.loggedIn = true;
      	console.log("Are We logged in TEST", test);
      } else {
      	console.log("Are we logged out", $scope.authData);
			  // $location.path('/login').replace();
      	// $rootScope.loggedIn = false;
			}
      console.log("authData", authData);
      $rootScope.$digest();
    });


}]);