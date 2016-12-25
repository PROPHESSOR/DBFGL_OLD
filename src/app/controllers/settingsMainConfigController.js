(function() {
  app.controller('settingsMainConfigController', ['$scope', 'nwService', 'configService', 'modlistService', settingsMainConfigController]);

  function settingsMainConfigController($scope, nwService, configService, modlistService) {

    modlistService.getLists().then(function(list) {
      $scope.modlist = list;
    });

    $scope.openConfig = function() {
      nwService.getShell().showItemInFolder(nwService.buildPath(['config.json'], true));
    };

    $scope.save = function() {
      $scope.config.freshinstall = false;
      nwService.getWatcher().close();
      configService.saveConfig($scope.config);
    };

    $scope.hasEngine = function() {
      return $scope.sourceports.length > 0;
    };


  }
})();
