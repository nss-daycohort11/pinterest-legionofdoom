// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://legionofdoom.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);