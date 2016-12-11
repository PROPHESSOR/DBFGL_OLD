(function() {
  app.factory('sourceportService', ['nwService', sourceportService]);
  var STUBITEM = {
    icon: '',
    name: '',
    path: '/',
    saves: '/',
    kind: 'Sorce Port',
    cliParams: {
      iwad: '-iwad',
      loadgame: '-loadgame',
      file: '-file',
      deh: '-deh',
      savedir: '-savedir'
    }
  };

  function sourceportService(nwService) {
    var service = {};
    var PATH = nwService.buildPath(['sourceports.json'], true);

    service.getAll = function() {
      return nwService.readJSON(PATH);
    };

    service.getStub = function() {
      return STUBITEM;
    };

    service.persist = function(obj) {
      // Toast message - see configService
      return nwService.writeJSON(obj, PATH)
    };

    return service;
  }
})();
