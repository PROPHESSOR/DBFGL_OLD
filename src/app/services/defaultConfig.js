(function() {
  app.constant('DEFAULTCONFIG', {
    'dontShowUpdate': '0.0.0',
    'freshinstall': true,
    'initList': false,
    'iwadpath': '',
    'preselectedengine': '',
    'modlistpath': '',
    'screenshotpath': '',
    'wadpath': '',
    'quitonexit': false,
    'modextensions': ['PK3', 'WAD', 'DEH', 'BEX', 'PK7'],
    'macaccelfix': {
      'enabled': false,
      'desktopRatio': null,
      'gameRatio': -1
    },
    'oblige': {
      'binary': '',
      'configs': '',
      'mappath': ''
    },
    'online': {
      'client': ''
    }
  });
})();
