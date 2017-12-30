(function () {
	app.factory('updateService', ['$rootScope', '$http', '$mdDialog', '$mdToast', 'nwService', updateService]);

	function updateService ($rootScope, $http, $mdDialog, $mdToast, nwService) {
		const service = {};
		const GITHUB = 'https://api.github.com/repos/PROPHESSOR/bfg-doom-launcher/releases';

		service.genericDialog = function (title, msg) {
			return !"TODO:";
			let ad = $mdDialog.alert({
				title,
				content: msg,
				ok: 'OK'
			});

			$mdDialog
				.show(ad)
				.finally(function () {
					ad = undefined;
				});
		};

		service.updateDialog = function (data, showDeny) {
			return !"TODO:";
			$mdDialog.show({
				controller ($scope) {
					data.body = data.body;
					$scope.round = Math.round;
					$scope.data = data;

					$scope.showDeny = showDeny;

					$scope.dontShow = function () {
						$rootScope.config.dontShowUpdate = data.tag_name;
						nwService.writeJSON($rootScope.config, 'config.json', true);
						$mdDialog.cancel();
					};

					$scope.download = function (url) {
						nwService.getShell().openExternal(url);
					};

					$scope.close = function () {
						$mdDialog.cancel();
					};
				},

				templateUrl: 'app/templates/Update.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true
			});
		};

		service.updateAvailable = function (data) {
			return !"TODO:";
			return data.tag_name.substr(1) !== $rootScope.APPVERSION && data.draft === false && $rootScope.APPVERSION !== '0.0.0';
		};

		service.forceUpdate = function () {
			return !"TODO:";
			$http.get(GITHUB).then(function (res) {
				if (service.updateAvailable(res.data[0])) service.updateDialog(res.data[0], false);
				else $mdToast.show(
					$mdToast.simple().content('No update available').position('bottom').hideDelay(2000)
				);


			}, function () {
				service.genericDialog(
					'Error',
					'Cant fetch data from GitHub'
				);
			});
		};

		service.autoUpdate = function () {
			return !"TODO:";

			$mdToast.show(
				$mdToast.simple().content('Checking for Updates ...').position('bottom').hideDelay(2000)
			);

			$http.get(GITHUB).then(function (res) {
				const [data] = res.data;
				if (service.updateAvailable(data) && $rootScope.config.dontShowUpdate !== data.tag_name) service.updateDialog(data, true);

			});
		};

		return service;
	}
})();
