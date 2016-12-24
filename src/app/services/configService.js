(function() {
  app.factory('configService', ['nwService', 'DEFAULTCONFIG', '$mdToast', configService]);

  function configService(nwService, DEFAULTCONFIG, $mdToast) {
    var service = {};
    service.config = angular.merge({}, DEFAULTCONFIG, nwService.readSyncJSON(nwService.buildPath(['config.json']), true)) || {};
    service.sourceports = nwService.readSyncJSON(nwService.buildPath(['sourceports.json'], true)) || [];

    /*
    nwService.readJSON().then(function(data) {
      $rootScope.sourceports = data;
    });
     */
    function sanitize(obj) {
      return _.mapObject(obj, function(item) {
        if (typeof item === 'string') {
          switch (item) {
          case 'true':
            return Boolean(true);

          case 'false':
            return Boolean(false);

          default:
            return item;
          }

        } else {
          return item;
        }
      });
    }

    service.importConfig = function(obj) {
      service.saveConfig(
        _.extend(DEFAULTCONFIG, obj)
      );
    };

    service.saveConfig = function(obj) {
      var toastDelay = 1500;

      nwService.writeJSON(sanitize(obj), 'config.json', true).then(function() {
        $mdToast.show(
            $mdToast.simple().content('Saved configuration - SSGL restarts ...').position('bottom').hideDelay(toastDelay)
        );

        setTimeout(function() {
          window.location.reload();
        }, toastDelay + 500);

      }, function() {
        $mdToast.show(
            $mdToast.simple().content('An Error Occured').position('bottom').hideDelay(toastDelay)
        );
      });
    };

    service.saveSourceports = function(obj) {
      nwService.writeJSON(obj, nwService.buildPath(['sourceports.json'], true)).then(function() {
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

    service.getSourceports = function() {
      return service.sourceports;
    };

    service.getConfig = function() {
      return service.config;
    };

    return service;
  }
})();
