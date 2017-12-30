(function () {

	var {execFile} = require('child_process');
	app.factory('gameService', ['$q', '$rootScope', '$mdDialog', 'modselectedService', 'nwService', gameService]);

	/**
     * Service for Starting Engines/Oblige
     *
     * @method gameService
     * @module ssgl
     * @submodule gameService
     */
	function gameService ($q, $rootScope, $mdDialog, modselectedService, nwService) {

		/**
         * Ensures loadorder for Doom RPG wads
         *
         * @method _prepareDoomRPG
         * @param  {array} array of user doom wads
         * @return {array} array with doomrpg wads (right loadorder) mixed with user wads
         */

		// TODO document the statements
		function _prepareDoomRPG (wads) {
			var rpgwads = [];

			if ($rootScope.config.active.doomrpgrl) {
				rpgwads.push($rootScope.config.misc.doomrpg.rlarsenalwad);

				if ($rootScope.config.active.doomrpgrlmonsters) {
					rpgwads.push($rootScope.config.misc.doomrpg.rlmonsterswad);
				}

				rpgwads.push($rootScope.config.misc.doomrpg.rlhudwad);

				rpgwads.push($rootScope.config.misc.doomrpg.vanilla.slice(0, -1));
				rpgwads.push($rootScope.config.misc.doomrpg.rlarsenalpath.slice(0, -1));

				if ($rootScope.config.active.doomrpgrlmonsters) {
					rpgwads.push($rootScope.config.misc.doomrpg.rlmonsterspath.slice(0, -1));
				}

			} else {
				rpgwads.push($rootScope.config.misc.doomrpg.vanilla.slice(0, -1));

				if ($rootScope.config.misc.doomrpg.extras !== '') {
					rpgwads.push($rootScope.config.misc.doomrpg.extras.slice(0, -1));
				}

				if ($rootScope.config.misc.doomrpg.extras !== '') {
					rpgwads.push($rootScope.config.misc.doomrpg.brightmaps.slice(0, -1));
				}
			}

			return rpgwads.concat(wads);
		}

		/**
         * Builds Params for different Engines
         *
         * TODO: investigate if setvars is also practical for other instances
         *
         * @method _paramBuilder
         * @for gameService
         * @param  {Object}  iwad,config,engine,map
         * @return {String} Parameters for Engines
         * @private
         */
		function _paramBuilder (opt) {
			var wads = modselectedService.getPathsFILE(),
					dehs = modselectedService.getPathsDEH();

			if (opt.map !== false) {
				wads.push(opt.map);
			}

			var params = ['-iwad', $rootScope.config.iwadpath + opt.iwad];

			// For Doom64EX you need an extra soundfile
			if (opt.engine === 'doom64ex') {
				params = params.concat(['-setvars'], ['s_soundfont', $rootScope.config.misc.doom64exsound]);
			}

			if (opt.engine === 'doomrpg') {
				wads = _prepareDoomRPG(wads);
			}

			if (opt.save !== 'false' && opt.save !== false) {
				params = params.concat(['-loadgame'], opt.save);
			}

			if (wads.length > 0) {
				params = params.concat(['-file'], wads);
			}

			if (dehs.length > 0) {
				params = params.concat(['-deh'], dehs);
			}

			params = params.concat(['-savedir'], $rootScope.config.savepaths[opt.engine] + modselectedService.getListname());

			return params;
		}

		var service = {};

		/**
         * Starts given Engine as childprocess
         *
         * @method startDoom
         * @for gameService
         * @param  {Object}  iwad,config,engine,map,save
         */
		service.startDoom = function (opt) {
			if (typeof opt.map === 'undefined' || opt.map === null) {
				opt.map = false;
			}

			if (typeof opt.dialog === 'undefined' || opt.dialog === null) {
				opt.dialog = false;
			}

			var useEngine = $rootScope.config.engines[opt.engine];

			try {
				execFile(useEngine, _paramBuilder(opt), function (error) {
					if (error) {
						nwService.panic('Enginestarter', 'Doomstarter encountered a Problem', error.stack);
					}
				});
			} catch (e) {
				nwService.panic('Enginestarter', 'No Engine to start given', e);
			}
		};

		/**
         * Starts Oblige Mapbuilder as childprocess in the background
         * When Oblige is finished - startDoom with the map parameter
         *
         * @method startOblige
         * @for gameService
         * @param  {Object} iwad, config, engine,save
         */
		service.startOblige = function (opt) {

			$mdDialog.show({
				templateUrl: 'app/templates/ObligeLoading.html',
				parent: angular.element(document.body),
				targetEvent: null,
				clickOutsideToClose: false,
				escapeToClose: false
			});

			opt.map = $rootScope.config.oblige.mappath;
			var params = ['--batch', $rootScope.config.oblige.mappath, '--load', opt.config];

			var child = execFile($rootScope.config.oblige.binary, params, function (error, stdout, stderr) {
				if (error) {
					nwService.panic(
						'Obligestarter',
						'Oblige builder encountered a Problem',
						'Given Params: ' + params.join(' ') + ' \n\n ' + error.stack + '\n\n' + stderr
					);
				}
			});

			child.on('exit', function () {
				$mdDialog.cancel();
				service.startDoom(opt);
			});

		};

		return service;
	}

})();
