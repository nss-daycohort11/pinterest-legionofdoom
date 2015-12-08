app.controller('ModalController', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

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

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, $firebaseArray) {

  $scope.pins = [];
  // $scope.selected = {
  //   item: $scope.pins[0]
  // };

  $scope.ok = function () {
    var addRef = new Firebase("https://legionofdoom.firebaseio.com/users");
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