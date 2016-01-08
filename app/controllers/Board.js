app.controller("Board",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

    // var fireBoard = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
    var fireBoard = new Firebase("https://legionofdoom.firebaseio.com/users/");
    // console.log("fireBoard", fireBoard);
/*    $scope.pins = $firebaseArray(fireBoard);
*/
    var entries = $firebaseArray(fireBoard);
    console.log(entries);

    var removeDupes = [];
    var newArray = {};

    if ($rootScope.loggedIn !== true) {
      $location.path('/login').replace();
    }

    //After loading the 'pins', we cycle through them removing all the duplicates
    entries.$loaded()
    .then(function(){
        angular.forEach(entries, function(entry) {
            angular.forEach(entry, function(widget) {
                    var added = false;
            		if (widget === null || widget.title === null || !widget.title) {
            		} else if (widget.title) {
                        angular.forEach(removeDupes, function(item) {
                            if (item.title === widget.title) {
                                added = true;
                            }
                        });
            			if (added === false) {
                            removeDupes.push(widget);
                        }
            		}
            });
        });

        for (var i = 0; i < removeDupes.length; i++) {
        	newArray[i] = removeDupes[i];
        }
        $scope.pins = [newArray];
    });
   
   //This calls the particular users firebase and stores the passed 'pin' 
	$scope.addToBoard = function (notStuff) {
	    console.log("stuff", this.stuff);
	    var BoardRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
	    BoardRef = $firebaseArray(BoardRef);

	      
	    console.log("BoardRef", BoardRef);
	    BoardRef.$add(notStuff);
	};


}]);