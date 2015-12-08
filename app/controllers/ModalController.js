app.controller('ModalController',
  ["$scope", "$rootScope", "$uibModal", "$log", "Auth", function($scope, $rootScope, $uibModal, $log, Auth) {

  $scope.animationsEnabled = true;
  // $scope.loggedIn = Auth.isLoggedIn();
  console.log("DO WE EVERREACH HERE?");

  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null;
    Auth.logUs(false);
    $scope.user={};
    console.log("No longer logged in?");
  };

  $scope.sayHi = function(){
    console.log("HI");
    // $rootScope.loggedIn = Auth.isLoggedIn();
    // console.log("$scope.loggedIn",$scope.loggedIn);
  }

  $scope.open = function (size) {
    console.log("Line 8 happened");
    var modalInstance = $uibModal.open({
      // animation: $scope.animationsEnabled,
      templateUrl: 'app/partials/modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  // $scope.toggleAnimation = function () {
  //   $scope.animationsEnabled = !$scope.animationsEnabled;
  // };

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $firebaseArray, Auth) {

  $scope.pins = [];
  // $scope.selected = {
  //   item: $scope.pins[0]
  // };

  $scope.ok = function () {
    var addRef = new Firebase("https://legionofdoom.firebaseio.com/users/" + Auth.getUid() + "/");
    addRef = $firebaseArray(addRef)
    addRef.$loaded().then(function(){
      
    console.log("addRef", addRef);
    addRef.$add($scope.pins);
    $uibModalInstance.close($scope.pins);
    console.log("$scope.pins", $scope.pins);
    })
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});