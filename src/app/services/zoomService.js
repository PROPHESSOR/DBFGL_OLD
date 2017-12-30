(function () {
	app.factory('zoomService', ['nwService', 'hotkeys', zoomService]);

	function zoomService (nwService, hotkeys) {
		var service = {};
		var Window = nwService.getWindow();

		var C = {
			MAXZOOM: 5,
			MINZOOM: 0,
			STEP: 0.5
		};

		service.init = function () {
			hotkeys.add({
				combo: 'ctrl+=',
				description: 'Zoom In',
				callback () {
					if (Window.zoomLevel <= C.MAXZOOM) Window.zoomLevel += C.STEP;

				}
			});

			hotkeys.add({
				combo: 'ctrl+-',
				description: 'Zoom Out',
				callback () {
					if (Window.zoomLevel >= C.MINZOOM) Window.zoomLevel -= C.STEP;

				}
			});
		};

		return service;
	}
})();
