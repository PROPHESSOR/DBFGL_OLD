/*
 * Copyright (c) 2017 PROPHESSOR
*/

class ClassDBFGL {
	constructor () {
		this.WadSeeker = require('./WadSeeker');
		this.WadManager = require('./WadManager');
		this.Window = require('./Window');
		this.Launcher = require('./Launcher');
		logger.log('DBFGL loaded!');
	}
}

$(document).ready(function () {

	global.DBFGL = new ClassDBFGL();

	setTimeout(function () {
		$('#app').addClass('show');
	}, 100);

});
