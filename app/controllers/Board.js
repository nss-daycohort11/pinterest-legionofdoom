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

    entries.$loaded()
    .then(function(){
        angular.forEach(entries, function(entry) {
            angular.forEach(entry, function(widget) {
                    var added = false;
            		if (widget === null || widget.title === null || !widget.title) {
            			console.log("Nope!");
            			console.log(widget);
            		} else if (widget.title) {
                        console.log("Inside title");
                        angular.forEach(removeDupes, function(item) {
                            console.log("Inside removeDupes");
                            console.log("Item title", item.title);
                            console.log("Widget title", widget.title);
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
        console.log("newArrayAfter", removeDupes);
        for (var i = 0; i < removeDupes.length; i++) {
        	newArray[i] = removeDupes[i];
        }
        $scope.pins = [newArray];
    });
   


    


    
	$scope.addToBoard = function (notStuff) {
	    console.log("stuff", this.stuff);
	    var BoardRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
	    BoardRef = $firebaseArray(BoardRef);

	      
	    console.log("BoardRef", BoardRef);
	    BoardRef.$add(notStuff);
	};


}]);