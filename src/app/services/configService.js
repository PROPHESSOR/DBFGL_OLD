(function() {
  app.factory('configService', ['nwService', 'DEFAULTCONFIG', '$mdToast', configService]);

  function configService(nwService, DEFAULTCONFIG, $mdToast) {
    var service = {};
    service.config = angular.merge({}, DEFAULTCONFIG, nwService.readSyncJSON(nwService.buildUserPath('config.json'), false)) || {};
    service.sourceports = nwService.readSyncJSON(nwService.buildUserPath('sourceports.json', false)) || [];

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

    service.importSourceports = function(arr) {
      service.sourceports = service.sourceports.concat(arr);
      service.saveSourceports(service.sourceports);
    };

    service.saveConfig = function(obj) {
      var toastDelay = 1500;

      var watcher = nwService.getWatcher();
      if (watcher) watcher.close();

      nwService.writeJSON(sanitize(obj), nwService.buildUserPath('config.json')).then(function() {
        $mdToast.show(
            $mdToast.simple().content('Saved configuration - SSGL restarts ...').position('bottom').hideDelay(toastDelay)
        );

        setTimeout(function() {
          window.location.reload();
        }, toastDelay + 500);

      }, function(e) {
        console.log(e);
        $mdToast.show(
            $mdToast.simple().content('An Error Occured').position('bottom').hideDelay(toastDelay)
        );
      });
    };

    service.saveSourceports = function(obj) {
      nwService.writeJSON(obj, nwService.buildUserPath('sourceports.json')).then(function() {
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
