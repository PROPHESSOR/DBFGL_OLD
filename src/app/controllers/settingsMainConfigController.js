(function() {
  app.controller('settingsMainConfigController', ['$scope', '$mdToast', 'nwService', 'configService', 'modlistService', 'macMouseService', settingsMainConfigController]);
  function settingsMainConfigController($scope, $mdToast, nwService, configService, modlistService, macMouseService) {

    modlistService.getLists().then(function(list) {
      $scope.modlist = list;
    });

    if (process.platform === 'darwin') {
      if (!$scope.config.macaccelfix.desktopRatio) {
        macMouseService.getAccelerationRatio().then(function(ratio) {
          $scope.config.macaccelfix.desktopRatio = ratio;
        });
      }
    }

    $scope.editedConfig = angular.copy($scope.config);

    $scope.isMac = function() {
      return process.platform == 'darwin';
    };

    $scope.openConfig = function() {
      nwService.getShell().showItemInFolder(nwService.buildUserPath('config.json'));
    };

    $scope.save = function() {
      $scope.config.freshinstall = false;

      var watcher = nwService.getWatcher();
      if (watcher) watcher.close();
      configService.saveConfig($scope.config);
    };

    $scope.cancel = function() {
      $scope.editedConfig = angular.copy($scope.config);

      $mdToast.show(
        $mdToast.simple()
        .content('Config resetted')
      );

    };

    $scope.hasEngine = function() {
      return $scope.sourceports.length > 0;
    };
  }
})();
