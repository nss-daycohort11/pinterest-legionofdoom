app.controller("Board",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

    // var fireBoard = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
    var fireBoard = new Firebase("https://legionofdoom.firebaseio.com/users/");
    console.log("fireBoard", fireBoard);
    $scope.pins = $firebaseArray(fireBoard);
   
      console.log("fireBoardArray", $scope.pins);
    


}]);