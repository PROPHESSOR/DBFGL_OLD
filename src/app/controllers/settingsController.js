(function() {
  app.controller('settingsController', ['$scope', '$mdDialog', '$mdToast', 'nwService', settingsController]);
  var STUB = {
    icon: '',
    name: '',
    path: '/',
    saves: '/',
    kind: 'Sorce Port',
    cliParams: {
      iwad: '-iwad',
      loadgame: '-loadgame',
      file: '-file',
      deh: '-deh',
      savedir: '-savedir'
    }
  };
  function settingsController($scope, $mdDialog, $mdToast, nwService) {
    $scope.selected = null;

    $scope.selectSourcePort = function(item) {
      $scope.selected = item;
    };

    $scope.addSourcePort = function() {
      $scope.sourceports.push(STUB);
    };

    $scope.save = function() {
      // #TODO move this into configservice
      nwService.writeJSON($scope.sourceports, nwService.buildPath(['sourceports.json'], true)).then(function() {
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
        $scope.save();
      }, function(error) {
        // error Toast here
      });
    };
  }
})();

