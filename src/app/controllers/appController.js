(function() {
  app.controller('appController', [
    '$scope',
    '$state',
    '$mdDialog',
    '$mdToast',
    '$mdBottomSheet',
    '$mdSidenav',
    'modlistService',
    '$http',
    'iwadService',
    'nwService',
    'gameService',
    'modselectedService',
    'updateService',
    'zoomService',
    appController]);

  /**
   * appController
   * General App Controller (Menus, Fab)

   * @module ssgl
   * @submodule appController
   */
  function appController(
   $scope,
   $state,
   $mdDialog,
   $mdToast,
   $mdBottomSheet,
   $mdSidenav,
   modlistService,
   $http,
   iwadService,
   nwService,
   gameService,
   modselectedService,
   updateService,
   zoomService) {

    var $PARENT = $scope;

    if ($scope.config.freshinstall === true) {
      $state.go('settings');
    }

    zoomService.init();
    updateService.autoUpdate();
  /**
   * Forces Update lookup, Updatedialog or no Update available feedback dialog is showing
   *
   * @method forceUpdate
   * @for appController
   */
    $scope.forceUpdate = function() {
      updateService.forceUpdate();
    };

  /**
   * Fires up Settings Dialog
   *
   * @for appController
   * @method showSettings
   * @param  Event ev Clickevent
   */
    $scope.showSettings = function() {
      $state.go('settings');
    };

    $scope.goBack = function() {
      $state.go('main');
    };

  /**
   * Reloads the complete Application
   *
   * @for appController
   * @method reload
   */
    $scope.reload = function() {
      window.location.reload();
    };

    $scope.settingsOpen = function() {
      return $state.current.name ==='settings'
    }
  /**
   * Opens Wadfolder in Native Explorer/Finder
   *
   * @for appController
   * @uses  nwService
   * @method openWADFolder
   */
    $scope.openWADFolder = function() {
      nwService.getShell().openItem($scope.config.wadpath);
    };

    $scope.openScreenshotFolder = function() {
      nwService.getShell().openItem($scope.config.screenshotpath);
    };

  /**
   * Opens Devtools
   *
   * @method openDevTools
   * @for appController
   */
    $scope.openDevTools = function() {
      nwService.openDevTools();
    };

  /**
   * Opens Oblige
   *
   * @for appController
   * @uses nwService
   * @method openOblige
   */
    $scope.openOblige = function() {
      nwService.getShell().openItem($scope.config.oblige.binary);
    };

    /**
     * opens WadSeeker
     *
     * @for appController
     * @uses  nwService
     * @method openMultiplayer
     */
    $scope.openMultiplayer = function() {
      nwService.getShell().openItem($scope.config.online.client);
    };

  /**
   * Opens AngularMaterial Contextmenu (About, Settings etc.)
   *
   * @for appController
   * @uses $mdOpenMenu
   * @method openMenu
   * @param  $mdOpenMenu
   * @param  Event ev Clickevent
   */
    $scope.openMenu = function($mdOpenMenu, ev) {
      //ESLint Error => Dont touch this
      var originatorEv = ev;
      $mdOpenMenu();
    };

  /**
   * Toggles Sidebar
   *
   * @for appController
   * @uses  $mdSidenav AngularMaterial Sidenav Service
   * @method toggleSidebar
   */
    $scope.toggleSidebar = function() {
      $mdSidenav('left').toggle();
    };

    //#TODO doc
    $scope.hasEngine = function() {
      return $scope.sourceports.length > 0;
    };

  /**
   * Opens the About Dialog
   *
   * @uses  $mdDialog AngularMaterial Dialog Service
   * @method showAboutDialog
   * @param  event ev Clickevent
   */
    $scope.showAboutDialog = function(ev) {

      $mdDialog.show({
        controller: AboutDialogController,
        templateUrl: 'app/templates/AboutDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });

    /**
     * AboutDialogController
     * @method AboutDialogController
     * @for showAboutDialog
     * @param $scope
     * @param $mdBottomSheet
     */
      function AboutDialogController($scope) {

      /**
       * @property {String} version Versionnumber
       * @type String
       */
        $scope.version = $PARENT.APPVERSION;

      /**
       * Opens Url in Default Browser
       *
       * @method openURL
       * @uses  nwService
       * @for AboutDialogController
       * @param String url
       */
        $scope.openURL = function(url) {
          nwService.getShell().openExternal(url);
        };

      /**
       * Closes About Dialog
       *
       * @uses $mdDialog
       * @method yup
       * @for AboutDialogController
       */
        $scope.yup = function() {
          $mdDialog.cancel();
        };
      }
    };

  /**
   * Shows Game Selection Bottomsheet
   *
   * @uses $mdBottomSheet
   * @method showGameSelection
   * @for appController
   * @param $event
   */
    $scope.showGameSelection = function($event) {

      $mdBottomSheet.show({
        templateUrl: 'app/templates/GameSelection.html',
        controller: GameSelectionController,
        targetEvent: $event
      });

    /**
     * GameSelectionController
     * @method GameSelectionController
     * @for showGameSelection
     * @param  Scope $scope
     * @param  $mdBottomSheet
     * @param  iwadService
     */
      function GameSelectionController($scope, $mdBottomSheet, iwadService) {
      /**
       * @property useoblige
       * @type Boolean
       * @default false
       */
        $scope.useoblige = false;
        $scope.selectedEngine = null;
        iwadService.getIWADS($PARENT.config.iwadpath).then(function(iwads) {
        /**
         * @property iwads
         * @type {Array}
         * @async
         */
          $scope.iwads = iwads;
        });

      /**
       * @property config
       * @type Object
       */
        $scope.config = $PARENT.config;

        $scope.selectEngine = function(engine) {
          $scope.selectedEngine = engine;
        };
      /**
       * Starts a game via the clicked index
       *
       * @method startGame
       * @for GameSelectionController
       * @param  $index
       * @param  {String}  engine What engine is used
       * @param  $event
       */
        $scope.startGame = function($index, $event) {

          if ($scope.useoblige === false) {
            gameService.startDoom({
              iwad: $scope.iwads[$index].file,
              map: false,
              engine: $scope.selectedEngine,
              dialog: null,
              save: false
            });

            $mdBottomSheet.hide();

          } else {
            $scope.startGameOblige($event, $index, $scope.selectedEngine);
          }
        };

      /**
       * Starts Oblige Mapbuilder
       *
       * @method startGameOblige
       * @for appController
       * @param  {Event} ev Clickevent
       * @param  $index
       * @param  {String} engine What engine is used
       */
        $scope.startGameOblige = function(ev, $index, engine) {
          var iwad = $scope.iwads[$index].file;

          $mdBottomSheet.hide();

          $mdDialog.show({
            controller: ConfigDialogController,
            templateUrl: 'app/templates/SelectConfig.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            onComplete: bindFileDialog,
            clickOutsideToClose: false
          });


          function bindFileDialog($scope, element) {

            var inp = element[0].querySelector('.fileDialog');
            var btn = element[0].querySelector('#keep');
            $scope.wadpath = $PARENT.config.wadpath + nwService.pathsep + 'obligebuild.WAD';


            btn.addEventListener('click', function() {
              inp.click();
            });

            inp.addEventListener('change', function() {
              if (this.value !== '') {
                nwService.copyFile($PARENT.config.oblige.mappath, this.value);

                $mdToast.show(
                  $mdToast.simple()
                    .content('Saved Map to: '+ this.value).position('bottom').hideDelay(1500)
                  );
              }
            }, false);

          }

        /**
         * Dialog for Oblige Configs
         *
         * @method ConfigDialogController
         * @for startGameOblige
         * @param $scope
         * @param $mdDialog
         * @param nwService
         */
          function ConfigDialogController($scope, $mdDialog, nwService) {
            var saveDir = $PARENT.config.savepaths[engine] + modselectedService.getListname();
            $scope.engine = engine;
            $scope.iwad = iwad;
            $scope.selectedsave = false;
            $scope.deletesavegames = false;

            nwService.getDirWithDate(saveDir).then(function(data) {
              $scope.savegames = data;
              $scope.selectedsave = $scope.savegames[0].path;
            });

            nwService.getModifiedDate($PARENT.config.oblige.mappath).then(function(date) {
              $scope.lastBuilt = date;
            });

            nwService.getDir($PARENT.config.oblige.configs).then(function(files) {
              $scope.mapconfigs = files.map(function(cfg) {
                return {
                  name: cfg,
                  path: $PARENT.config.oblige.configs + cfg
                };
              });

              if ($scope.mapconfigs.length > 0) {
                $scope.selectedconfig = $scope.mapconfigs[0].path;
              }
            });

          /**
           * Opens Oblige
           *
           * @see appController.openOblige
           * @method openOblige
           * @for ConfigDialogController
           */
            $scope.openOblige = function() {
              $PARENT.openOblige();
            };

          /**
           * Opens Savegame folder in external Explorer
           *
           * @method openSaveDir
           * @for ConfigDialogController
           */
            $scope.openSaveDir = function() {
              nwService.getShell().openExternal(saveDir);
            };

          /**
           * Starts Oblige as Childprocess
           *
           * @method start
           * @for ConfigDialogController
           * @param  $index
           */
            $scope.start = function() {
              if ($scope.deletesavegames) {
                nwService.wipeDir(saveDir);
              }

              gameService.startOblige({
                iwad: iwad,
                config: $scope.selectedconfig,
                engine: engine,
                save: false
              });
            };

          /**
           * Continue last built Oblige map - start Doom as childprocess
           *
           * @method continue
           * @for ConfigDialogController
           */
            $scope.continue = function() {
              gameService.startDoom({
                iwad: iwad,
                config: $scope.selectedconfig,
                engine: engine,
                map: $PARENT.config.oblige.mappath,
                save: $scope.selectedsave
              });

              $mdDialog.cancel();
            };

          /**
           * Close Dialog
           *
           * @method cancel
           * @for ConfigDialogController
           */
            $scope.cancel = function() {
              $mdDialog.hide();
            };
          }
        };
      }
    };
  }
})();
