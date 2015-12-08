// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", 
	["$firebaseAuth", "$rootScope", function($firebaseAuth, $rootScope) {
		var ref = new Firebase("https://legionofdoom.firebaseio.com");
		// $rootScope.loggedIn;
    var uid;

	return {
    getUid: function(){
      return uid;
    },
    setUid: function(passedUid){
      uid = passedUid;
    },
		useAuth: function() {
    return $firebaseAuth(ref);
  	},
  	logUs: function(inorOut){
  		$rootScope.loggedIn = inorOut;
  		console.log("inorOut", inorOut);
  	},
  	isLoggedIn: function(){
  		return $rootScope.loggedIn;
  	}
  };
}]);