(function() {
  app.controller('settingsMainConfigController', ['$scope', '$rootScope', '$mdToast', 'nwService', 'configService', 'modlistService', 'macMouseService', settingsMainConfigController]);
  function settingsMainConfigController($scope, $rootScope, $mdToast, nwService, configService, modlistService, macMouseService) {

    modlistService.getLists().then(function(list) {
      $scope.modlist = list;
    });

    if (process.platform === 'darwin') {
      if (!$rootScope.config.macaccelfix.desktopRatio) {
        macMouseService.getAccelerationRatio().then(function(ratio) {
          $rootScope.config.macaccelfix.desktopRatio = ratio;
        });
      }
    }

    $scope.editedConfig = angular.copy($rootScope.config);

    $scope.transformOnChipAdd = function($chip){
      return $chip.toUpperCase();
    };

    $scope.isMac = function() {
      return process.platform == 'darwin';
    };

    $scope.openConfig = function() {
      nwService.getShell().showItemInFolder(nwService.buildUserPath('config.json'));
    };

    $scope.save = function() {
      $rootScope.config.freshinstall = false;
      $rootScope.config = $scope.editedConfig;
      configService.saveConfig($scope.editedConfig);
    };

    $scope.cancel = function() {
      $scope.editedConfig = angular.copy($rootScope.config);
      $mdToast.show(
        $mdToast.simple()
        .content('Config resetted')
      );
    };

    $scope.hasEngine = function() {
      return $rootScope.sourceports.length > 0;
    };
  }
})();
