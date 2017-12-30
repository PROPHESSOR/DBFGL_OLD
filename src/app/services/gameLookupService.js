(function () {

	const http = require('http');

	app.factory('gameLookupService', ['$q', 'nwService', '$rootScope', gameLookupService]);

	function gameLookupService ($q, nwService, $rootScope) {
		const service = {};

		// #TODO doc
		service.lookupLocal = function (mod) {
			let screens = []; // FIXME: Зачем?
			const def = $q.defer();

			nwService.getDir($rootScope.config.screenshotpath).then(function (dirs) {
				if (dirs.indexOf(mod.name) > -1) {
					nwService.getDir($rootScope.config.screenshotpath + mod.name).then(
						function (filenames) {

							screens = filenames.map(function (item) {
								return {
									pic: nwService.buildPath([$rootScope.config.screenshotpath, mod.name, item], false),
									name: item.split('.')[0]
								};
							});
							def.resolve(screens);
						}
					);

				} else {
					def.resolve([]);
				}
			});

			return def.promise;
		};

		// #TODO doc
		service.lookupWadArchive = function (path) {
			const md5 = nwService.md5File(path);
			const def = $q.defer();
			const screens = [];


			http.get({
				host: 'www.wad-archive.com',
				path: '/api/latest/' + md5
			}, function (response) {

				let body = '';

				if (response.statusCode !== 200) {
					def.reject();
				}

				response.on('error', function (e) {
					def.reject(e);
				});

				response.on('data', function (d) {
					body += d;
				});

				response.on('end', function () {
					const data = JSON.parse(body);
					for (const index in data.screenshots) {
						screens.push({
							pic: data.screenshots[index],
							name: index
						});
					}

					def.resolve(screens);
				});
			});

			return def.promise;
		};

		return service;
	}

})();
