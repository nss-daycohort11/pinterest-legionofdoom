app.controller("Board",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

    // var fireBoard = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
    var fireBoard = new Firebase("https://legionofdoom.firebaseio.com/users/");
    console.log("fireBoard", fireBoard);
    $scope.pins = $firebaseArray(fireBoard);
   
      console.log("fireBoardArray", $scope.pins);
    
	  $scope.addToBoard = function (notStuff) {
	    console.log("stuff", this.stuff);
	    var BoardRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
	    BoardRef = $firebaseArray(BoardRef)

	      
	    console.log("BoardRef", BoardRef);
	    BoardRef.$add(notStuff);
		};


}]);