(function() {
  app.controller('settingsController', ['$scope', '$mdDialog', '$mdToast', 'configService', settingsController]);
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
  function settingsController($scope, $mdDialog, $mdToast, configService) {
    if ($scope.sourceports.length > 0) {
      $scope.selected = $scope.sourceports[0];
    } else {
      $scope.selected = {};
    }

    $scope.selectSourcePort = function(item) {
      $scope.selected = item;
    };

    $scope.addSourcePort = function() {
      var newItem = angular.copy(STUB);
      $scope.sourceports.push(newItem);
      $scope.selected = newItem;
    };

    $scope.save = function() {
      configService.saveSourceports($scope.sourceports);
    };

    $scope.delete = function($event, $index) {
      var confirm = $mdDialog.confirm()
        .title('Really Delete ?')
        .content('Item will be deleted - are you sure ?')
        .ok('Delete')
        .cancel('Cancel')
        .targetEvent($event);

      $mdDialog.show(confirm).then(function() {
        console.log($scope.sourceports);
        $scope.sourceports.splice($index, 1);
        configService.saveSourceports($scope.sourceports);
      });
    };
  }
})();

