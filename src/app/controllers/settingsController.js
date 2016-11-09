(function() {
  app.controller('settingsController', ['$scope', settingsController]);

  function settingsController($scope) {
    $scope.somelist = [
      {
        icon: 'someicon',
        name: 'gzDoom',
        path: 'path',
        saves: 'path',
        active: false
      }
    ];
  }
})();
