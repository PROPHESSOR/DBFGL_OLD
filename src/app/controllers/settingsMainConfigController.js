(function() {
  app.controller('settingsMainConfigController', ['$scope', 'nwService', 'configService', settingsMainConfigController]);

  function settingsMainConfigController($scope, nwService, configService) {

    $scope.openConfig = function() {
      nwService.getShell().showItemInFolder(nwService.buildPath(['config.json'], true));
    };

    $scope.save = function() {
      $scope.config.freshinstall = false;
      nwService.getWatcher().close();
      configService.saveConfig($scope.config);
    };

  }
})();
