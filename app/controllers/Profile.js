app.controller("Profile",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

		// Grab the pins of a particular user and save it to the scope
    var fireProfile = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
    // var fireProfile = new Firebase("https://legionofdoom.firebaseio.com/users/");
    console.log("fireProfile", fireProfile);
    $scope.ppins = $firebaseArray(fireProfile);
   
      console.log("fireBoardArray", $scope.ppins);
    


}]);