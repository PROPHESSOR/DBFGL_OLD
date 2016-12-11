(function() {
  app.controller('settingsController', ['$scope', '$mdDialog', '$mdToast', 'sourceportService', settingsController]);

  function settingsController($scope, $mdDialog, $mdToast, sourceportService) {
    $scope.selected = null;

    sourceportService.getAll().then(function(data) {
      $scope.sourceports = data;
    }, function() {
      $mdToast.show(
        $mdToast.simple()
        .content('No Sourceport Configfile found')
      );
    });

    $scope.selectSourcePort = function(item) {
      $scope.selected = item;
    };

    $scope.addSourcePort = function() {
      $scope.sourceports.push(sourceportService.getStub());
    };

    $scope.save = function() {
      sourceportService.persist($scope.sourceports).then(function() {
        $mdToast.show(
          $mdToast.simple()
          .content('Saved Sourceport List')
        );
      }, function(err) {
        $mdToast.show(
          $mdToast.simple()
          .content(err.message)
        );
      });
    };

    $scope.delete = function($event, $index) {
      var confirm = $mdDialog.confirm()
        .title('Really Delete ?')
        .content('Item will be deleted - are you sure ?')
        .ok('Delete')
        .cancel('Cancel')
        .targetEvent($event);

      $mdDialog.show(confirm).then(function() {
        $scope.sourceports.splice($index, 1);
        $scope.save()
      }, function(error) {
        // error Toast here
      });
    };
  }
})();

