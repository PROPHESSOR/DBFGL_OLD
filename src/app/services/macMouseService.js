(function() {
  var execFile = require('child_process').execFile;
  app.factory('macMouseService', ['$q', macMouseService]);

  function macMouseService($q) {
    /* http://osxdaily.com/2010/08/25/mouse-acceleration/ */
    var service = {};

    service.getAccelerationRatio = function() {
      var def = $q.defer();
      if (process.platform === 'darwin') {
        execFile('defaults', ['read', '.GlobalPreferences', 'com.apple.mouse.scaling'], function(error, stdout) {
          if (error) {
            def.reject(error);
          }
          def.resolve(stdout);
        });
      }
      return def.promise;
    };

    service.setAccelerationRatio = function(ratio) {
      if (process.platform === 'darwin') {
        execFile('defaults', ['write', '.GlobalPreferences', 'com.apple.mouse.scaling', ratio], function() {});
      }
    };

    return service;
  }
})();
