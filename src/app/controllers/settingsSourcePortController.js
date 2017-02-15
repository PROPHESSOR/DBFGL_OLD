(function() {
  app.controller('settingsSourcePortController', ['$scope', '$mdDialog', '$mdToast', 'configService', settingsSourcePortController]);
  var STUB = {
    icon: '',
    name: '',
    path: '/',
    saves: '/',
    kind: 'Sorce Port',
    cliParams: {
      custom: '',
      iwad: '-iwad',
      loadgame: '-loadgame',
      file: '-file',
      deh: '-deh',
      savedir: '-savedir'
    }
  };

  function settingsSourcePortController($scope, $mdDialog, $mdToast, configService) {

    $scope.editedSourceports = angular.copy($scope.sourceports);
    if ($scope.editedSourceports.length > 0) {
      $scope.selected = $scope.editedSourceports[0];
    } else {
      $scope.selected = {};
    }

    $scope.selectSourcePort = function(item) {
      $scope.selected = item;
    };

    $scope.addSourcePort = function() {
      var newItem = angular.copy(STUB);
      $scope.editedSourceports.push(newItem);
      $scope.selected = newItem;
    };

    $scope.save = function() {
      configService.saveSourceports($scope.editedSourceports);
      $scope.sourceports = angular.copy($scope.editedSourceports);
    };

    $scope.cancel = function() {
      $scope.editedSourceports = angular.copy($scope.sourceports);
      $mdToast.show(
        $mdToast.simple()
        .content('Sourceports resetted')
      );
    };

    $scope.delete = function($event, $index) {
      var confirm = $mdDialog.confirm()
        .title('Really Delete ?')
        .content('Item will be deleted - are you sure ?')
        .ok('Delete')
        .cancel('Cancel')
        .targetEvent($event);

      $mdDialog.show(confirm).then(function() {
        console.log($scope.editedSourceports);
        $scope.editedSourceports.splice($index, 1);
        $scope.save();
      });
    };
  }
})();

