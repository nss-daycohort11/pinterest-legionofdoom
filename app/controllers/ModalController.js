app.controller('ModalController',
  ["$scope", "$rootScope", "$uibModal", "$log", "Auth", function($scope, $rootScope, $uibModal, $log, Auth) {

  $scope.animationsEnabled = true;
  console.log("DO WE EVER REACH HERE?");

  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null;
    Auth.logUs(false);
    $scope.user={};
    console.log("No longer logged in?");
    $location.path('/login').replace();
  };

  $scope.goMain = function(){
    console.log("HI");
    $location.path('/board').replace();
  }

  $scope.open = function (size) {
    console.log("Line 8 happened");
    var modalInstance = $uibModal.open({
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