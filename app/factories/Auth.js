// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", 
	["$firebaseAuth", function($firebaseAuth) {
		var ref = new Firebase("https://legionofdoom.firebaseio.com");
		var loggedIn;

	return {
		useAuth: function() {
    return $firebaseAuth(ref);
  	},
  	logUs: function(inorOut){
  		loggedIn = inorOut;
  		console.log("inorOut", inorOut);
  		console.log("loggedIn", loggedIn);
  	},
  	isLoggedIn: function(){
  		return loggedIn;
  	}
  };
}]);