(function() {
  app.controller('settingsMainConfigController', ['$scope', 'nwService', 'configService', 'modlistService', 'macMouseService', settingsMainConfigController]);
  function settingsMainConfigController($scope, nwService, configService, modlistService, macMouseService) {

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

    $scope.isMac = function() {
      return process.platform == 'darwin';
    };

    $scope.openConfig = function() {
      nwService.getShell().showItemInFolder(nwService.buildPath(['config.json'], true));
    };

    $scope.save = function() {
      $scope.config.freshinstall = false;

      var watcher = nwService.getWatcher();
      if (watcher) watcher.close();
      configService.saveConfig($scope.config);
    };

    $scope.hasEngine = function() {
      return $scope.sourceports.length > 0;
    };
  }
})();
