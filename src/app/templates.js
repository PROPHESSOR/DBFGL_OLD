app.run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/templates/AboutDialog.html',
    "<md-dialog style=\"width:70%\"><md-toolbar><div class=\"md-toolbar-tools\"><h2>About Super Shotgun Launcher</h2></div></md-toolbar><md-dialog-content style=\"padding:25px\"><div layout=\"row\"><div flex=\"55\"><b>Version:</b> {{version}}<br><br><strong>Used Technologies:</strong><br>Angular Material, NWJS, underscore<br><br><strong>Big thanks to:</strong><br><span class=\"browserlink\" ng-click=\"openURL('https://github.com/Serasar')\"><i class=\"mdi mdi-github-circle\"></i> Serasar</span> & <span class=\"browserlink\" ng-click=\"openURL('https://github.com/axed')\"><i class=\"mdi mdi-github-circle\"></i> axed</span> for Linux/Beta testing.<br><span class=\"browserlink\" ng-click=\"openURL('https://github.com/scar45')\"><i class=\"mdi mdi-github-circle\"></i> Scar45</span> for Doom64EX Integrations<br><div style=\"margin-top: 65px\"><span>2015 FreaKzero, Licensed under MIT License.</span></div></div><div flex=\"45\" class=\"customAboutContainer\"><div style=\"text-align:center\"><br><img src=\"app/assets/freakzero.jpg\"><br><br></div><div style=\"font-size: 14px\"><span class=\"browserlink\"><i class=\"mdi mdi-web\"></i> &nbsp;&nbsp;<a target=\"_blank\" ng-click=\"openURL('http://www.freakzero.com')\">http://www.freakzero.com</a></span><br><span class=\"browserlink\"><i class=\"mdi mdi-google-plus\"></i> &nbsp;&nbsp;<a target=\"_blank\" ng-click=\"openURL('https://plus.google.com/+FreaKzero/')\">https://plus.google.com/+FreaKzero/</a></span><br><span class=\"browserlink\"><i class=\"mdi mdi-twitter\"></i> &nbsp;&nbsp;<a target=\"_blank\" ng-click=\"openURL('https://twitter.com/freakzerodotcom')\">https://twitter.com/freakzerodotcom</a></span><br><span class=\"browserlink\"><i class=\"mdi mdi-github-circle\"></i> &nbsp;&nbsp;<a target=\"_blank\" ng-click=\"openURL('https://github.com/FreaKzero')\">https://github.com/FreaKzero</a></span></div></div></div></md-dialog-content><div class=\"md-actions\" layout=\"row\"><md-button class=\"md-accent\" ng-click=\"yup()\">Yup</md-button></div></md-dialog>"
  );


  $templateCache.put('app/templates/AddListPrompt.html',
    "<md-dialog style=\"width:50%\"><form name=\"namelistform\" style=\"overflow:hidden\" ng-submit=\"submitForm(namelistform.$valid)\" novalidate><md-toolbar><div class=\"md-toolbar-tools\"><h2>{{title}}</h2><span flex></span></div></md-toolbar><md-dialog-content style=\"padding:25px\"><div><md-input-container><label>Name of your List</label><input ng-model=\"listname\" required ng-pattern=\"/^[a-zA-Z0-9_-]*$/\" ng-change=\"checkdoubles()\" id=\"inputListname\"></md-input-container><div ng-if=\"cantSave.length > 0\" style=\"color:rgb(244,67,54)\"><span>File \"{{listname}}.json\" already exists, please choose another name</span></div><div ng-if=\"overwrite.length > 0\" style=\"color:rgb(244,67,54)\"><span>File \"{{listname}}.json\" already exists, you are about to overwrite the list.</span></div></div></md-dialog-content><div class=\"md-actions\" layout=\"row\"><span flex></span><md-button type=\"button\" ng-click=\"cancel()\">Cancel</md-button><button type=\"submit\" class=\"md-button md-accent\" ng-disabled=\"namelistform.$invalid || cantSave.length > 0\">Save</button></div></form></md-dialog>"
  );


  $templateCache.put('app/templates/GameSelection.html',
    "<md-bottom-sheet class=\"md-grid\" style=\"background-color: #424242; border-color: #424242\"><md-tabs md-dynamic-height md-no-pagination><md-tab ng-repeat=\"sourceport in sourceports track by $index\" label=\"{{sourceport.name}}\" md-on-select=\"selectEngine(sourceport)\"></md-tab></md-tabs><div style=\"position: absolute; bottom: 70px; right: 10px; z-index: 999; font-size: 14px\"><md-checkbox ng-model=\"useoblige\" aria-label=\"Oblige\" ng-disabled=\"!config.active.oblige\"><p style=\"margin-left: 5px\">Use Oblige</p></md-checkbox></div><br><md-content><md-list layout-align=\"space-around\"><md-list-item ng-repeat=\"iwad in iwads\"><div class=\"gameholder md-grid-item-content\" ng-click=\"startGame($index, engine)\"><div class=\"tint\"><i class=\"mdi mdi-play\"></i></div><img data-ng-src=\"{{iwad.cover}}\"></div><div class=\"md-grid-text gameholder-txt\">{{iwad.name}}</div></md-list-item></md-list><br></md-content></md-bottom-sheet>"
  );


  $templateCache.put('app/templates/MainMods.html',
    "<script type=\"text/javascript\">var fixHeight = function() {\r" +
    "\n" +
    "    var mainHeight = $(\"body\").height();\r" +
    "\n" +
    "    var ToolbarHeight = $(\"md-toolbar.layout-row\").height();\r" +
    "\n" +
    "    var subToolbarHeight = $(\"md-toolbar.md-hue-2\").height();\r" +
    "\n" +
    "    $('.slimScrollDiv, .slimScrollDiv > md-content').css('height', mainHeight - (ToolbarHeight + subToolbarHeight));\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "var setupScrollies = function() {\r" +
    "\n" +
    "    $('.slimscroll-mods').slimScroll({\r" +
    "\n" +
    "        position: 'right',\r" +
    "\n" +
    "        height: 'auto',\r" +
    "\n" +
    "        railVisible: true,\r" +
    "\n" +
    "        alwaysVisible: true,\r" +
    "\n" +
    "        color: '#78909c',\r" +
    "\n" +
    "        wheelStep: 7,\r" +
    "\n" +
    "        zIndex: 5\r" +
    "\n" +
    "    });\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "$(document).ready(function(){\r" +
    "\n" +
    "    $.when(setupScrollies()).then(fixHeight);\r" +
    "\n" +
    "});\r" +
    "\n" +
    "\r" +
    "\n" +
    "$(window).on('resize', function(){\r" +
    "\n" +
    "    $.when(setupScrollies()).then(fixHeight);\r" +
    "\n" +
    "});</script><div layout=\"row\" ng-controller=\"modController\"><div flex><md-toolbar class=\"md-hue-2\"><div class=\"md-toolbar-tools\"><md-input-container style=\"margin-top: 18px;width:120px\"><md-select ng-model=\"typefilter\" aria-label=\"Mod Type Filter\"><md-option value=\"\" selected>All</md-option><md-option ng-value=\"ext\" ng-repeat=\"ext in config.modextensions\">{{ ext }}</md-option></md-select></md-input-container>&nbsp;&nbsp;&nbsp;<md-input-container style=\"width: 100%;font-size: 14px\"><label class=\"filterlabel\" style=\"color: white;font-weight: normal;opacity:0\">Filter</label><input ng-model=\"searchterm\" id=\"filterinput\"></md-input-container></div></md-toolbar><md-content layout-padding class=\"slimscroll-mods\"><md-list><md-list-item class=\"md-2-line repeat-animation init-animation\" ng-repeat=\"mod in filtered = (mods | filter:searchterm | filter:{type:typefilter}) track by $index\" ng-click=\"selectWad(mod)\"><div class=\"md-avatar {{mod.type}} searchable\" ng-click=\"lookupScreenshots($event, mod)\"><div class=\"modtype\">{{mod.type}}</div></div><div class=\"md-list-item-text\"><h3>{{ mod.name }}</h3><p>{{ mod.dir }}</p></div><i class=\"mdi mdi-checkbox-marked-circle-outline custom-check\" style=\"font-size: 25px;color: #ff5722\" ng-show=\"mod.checked\"></i></md-list-item></md-list><div ng-hide=\"filtered.length > 0\" style=\"text-align:center\"><img src=\"app/assets/nof.png\"><p>Sorry, No Mods Found</p></div></md-content></div><div flex><md-toolbar class=\"md-hue-2 menu-animation\" ng-show=\"selected.list.length > 0 || usedList\"><div class=\"md-toolbar-tools\"><p>{{selected.name}}</p><span flex></span> <i class=\"mdi mdi-content-save\" ng-click=\"saveSelected($event)\" ng-show=\"selected.list.length > 0\" style=\"cursor:pointer\"><md-tooltip>Save List</md-tooltip></i>&nbsp;&nbsp; <i class=\"mdi mdi-playlist-plus\" ng-click=\"newSelected()\" ng-show=\"selected.list.length > 0 || usedList !== 'Untitled'\" style=\"cursor:pointer\"><md-tooltip>New List</md-tooltip></i></div></md-toolbar><md-content layout-padding class=\"slimscroll-mods\"><md-list><md-list-item class=\"md-2-line repeat-animation\" ng-repeat=\"mod in selected.list track by $index\"><div class=\"md-avatar {{mod.type}} searchable\"><div class=\"modtype second\" ng-click=\"lookupScreenshots($event, mod)\">{{mod.type}}</div></div><div class=\"md-list-item-text\"><h3>{{ mod.name }}</h3><p>{{ mod.dir }}</p></div><div class=\"md-secondary\"><p ng-click=\"moveUp($index)\"><i class=\"mdi mdi-chevron-up btn-sort\"></i></p><p ng-click=\"moveDown($index)\"><i class=\"mdi mdi-chevron-down btn-sort\"></i></p></div></md-list-item></md-list></md-content></div><div flex=\"30\" ng-hide=\"screenshots === null\" class=\"menu-animation\"><md-toolbar class=\"md-hue-2\"><div class=\"md-toolbar-tools\">{{screenshotsTitle}} <span flex></span> <i class=\"mdi mdi-close\" ng-click=\"screenshots = null\" style=\"cursor:pointer\"><md-tooltip>Hide Panel</md-tooltip></i></div></md-toolbar><md-content layout-padding class=\"slimscroll-mods\"><div class=\"screenshot\" ng-repeat=\"item in screenshots\"><div class=\"screenlabel\">{{item.name}}</div><img ng-src=\"{{item.pic}}\" width=\"100%\"></div><div class=\"screenshot-nof\" ng-show=\"screenshots !== null && screenshots.length === 0 && lookupLoad === false\"><h2>Sorry</h2><p>Cant find any Screenshots</p><md-button class=\"md-accent\" ng-click=\"openScreenshots(screenshotsTitle)\">Provide Screenshots</md-button></div><div ng-show=\"lookupLoad\" class=\"screenshot-nof\"><h2>Searching</h2><p>Searching for Screenshots</p><br><div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\"><md-progress-circular class=\"md-accent\" md-mode=\"indeterminate\"></md-progress-circular></div></div></md-content></div></div><md-button aria-label=\"play\" class=\"md-fab special-fab\" style=\"position: absolute; right: 25px; bottom: 15px; z-index:3\" ng-click=\"showGameSelection()\" ng-show=\"hasEngine()\"><i class=\"mdi mdi-play\"></i></md-button>"
  );


  $templateCache.put('app/templates/NewSettings.html',
    "<script type=\"text/javascript\">//#TODO make this global ? (resize)\r" +
    "\n" +
    "var fixHeight = function() {\r" +
    "\n" +
    "  var mainHeight = $('body').height();\r" +
    "\n" +
    "  var ToolbarHeight = $('md-toolbar.layout-row').height();\r" +
    "\n" +
    "  $('.slimScrollDiv, .slimScrollDiv > div').css('height', (mainHeight - ToolbarHeight - 48));\r" +
    "\n" +
    "};\r" +
    "\n" +
    "\r" +
    "\n" +
    "// dark blue 5f7985\r" +
    "\n" +
    "var setupScrollies = function() {\r" +
    "\n" +
    "  $('.slimscroll').slimScroll({\r" +
    "\n" +
    "    position: 'right',\r" +
    "\n" +
    "    height: 'auto',\r" +
    "\n" +
    "    railVisible: true,\r" +
    "\n" +
    "    alwaysVisible: true,\r" +
    "\n" +
    "    color: '#78909c',\r" +
    "\n" +
    "    wheelStep: 7,\r" +
    "\n" +
    "    zIndex: 5\r" +
    "\n" +
    "  });\r" +
    "\n" +
    "};\r" +
    "\n" +
    "\r" +
    "\n" +
    "$(document).ready(function(){\r" +
    "\n" +
    "  setTimeout(function() {\r" +
    "\n" +
    "    $.when(setupScrollies()).then(fixHeight);\r" +
    "\n" +
    "  },10);\r" +
    "\n" +
    "\r" +
    "\n" +
    "});\r" +
    "\n" +
    "\r" +
    "\n" +
    "$(window).on('resize', function(){\r" +
    "\n" +
    "  setTimeout(function() {\r" +
    "\n" +
    "    $.when(setupScrollies()).then(fixHeight);\r" +
    "\n" +
    "  },10);\r" +
    "\n" +
    "\r" +
    "\n" +
    "});</script><md-tabs md-dynamic-height md-no-pagination><md-tab label=\"Main Settings\"><md-tab-body><div class=\"slimscroll\" style=\"padding:20px\" ng-controller=\"settingsMainConfigController\"><fieldset><legend>Config Settings</legend><div layout=\"row\"><div flex><import-choose kind=\"sourceports\" label=\"Import Sourceports\"></import-choose></div><div flex><import-choose kind=\"config\" label=\"Import Config\"></import-choose></div></div></fieldset><fieldset><legend>Main Settings</legend><div layout=\"row\"><div flex><md-input-container><label>Favourite Sourceport</label><md-select ng-model=\"editedConfig.misc.preselectedengine\" placeholder=\"Favourite Sourceport\"><md-option value=\"false\">Disable</md-option><md-option ng-repeat=\"sourceport in sourceports track by $index\" value=\"{{sourceport.name}}\">{{sourceport.name}}</md-option></md-select></md-input-container></div><div flex><md-input-container><label>Select list for Startup</label><md-select ng-model=\"editedConfig.initList\" placeholder=\"Select List\" ng-disabled=\"modlist.length === 0\"><md-option value=\"false\">Disable</md-option><md-option ng-repeat=\"list in modlist track by $index\" value=\"{{list}}\">{{list.name}}</md-option></md-select></md-input-container></div></div><dir-choose label=\"WAD Path:\" ng-model=\"editedConfig.wadpath\"></dir-choose><dir-choose label=\"iWAD Path:\" ng-model=\"editedConfig.iwadpath\"></dir-choose><dir-choose label=\"Modlist Path:\" ng-model=\"editedConfig.modlistpath\"></dir-choose><dir-choose label=\"Screenshot Path:\" ng-model=\"editedConfig.screenshotpath\"></dir-choose></fieldset><fieldset><legend>Misc Settings</legend><label>Modfile Extensions</label><md-chips ng-model=\"editedConfig.modextensions\" md-removable=\"true\" md-enable-chip-edit=\"true\" md-on-append=\"transformOnChipAdd($chip)\"></md-chips><br><div layout=\"row\" ng-show=\"isMac()\"><div flex=\"50\"><md-checkbox ng-model=\"editedConfig.macaccelfix.enabled\" aria-label=\"Mac Acceleration Fix\">Enable Mouseacceleration Fix</md-checkbox></div><div flex=\"50\"><md-input-container><label>Desktop Acceleration Ratio</label><input type=\"text\" ng-model=\"editedConfig.macaccelfix.desktopRatio\"></md-input-container></div></div><md-checkbox ng-model=\"editedConfig.quitonexit\" aria-label=\"Quit SSGL on Game Exit\">Quit SSGL on Game Exit</md-checkbox></fieldset><fieldset><legend>Oblige Settings</legend><md-checkbox ng-model=\"editedConfig.active.oblige\" aria-label=\"Oblige\">Enable Oblige</md-checkbox><file-choose label=\"Oblige Path:\" ng-model=\"editedConfig.oblige.binary\"></file-choose><dir-choose label=\"Oblige MapConfig Path:\" ng-model=\"editedConfig.oblige.configs\"></dir-choose><file-choose label=\"Oblige Random Map File:\" ng-model=\"editedConfig.oblige.mappath\"></file-choose></fieldset><div style=\"text-align:right\"><md-button class=\"md-primary md-raised\" ng-click=\"cancel()\">Cancel</md-button><md-button class=\"md-accent md-raised\" ng-click=\"save()\">Save</md-button><br><br><br></div></div></md-tab-body></md-tab><md-tab label=\"Sourceports\"><md-tab-body><!-- Controller --><div ng-controller=\"settingsSourcePortController\"><div layout=\"row\" style=\"height: 100%\"><div flex=\"30\"><div class=\"slimscroll\"><md-list><md-list-item class=\"md-2-line\" ng-click=\"addSourcePort()\"><div class=\"md-avatar add\"><div class=\"modtype\"><i class=\"mdi mdi-plus\"></i></div></div><div class=\"md-list-item-text\"><h3>Add</h3><p>Add new Item</p></div></md-list-item><md-list-item class=\"md-2-line repeat-animation\" ng-repeat=\"sourceport in editedSourceports track by $index\" ng-click=\"selectSourcePort(sourceport)\"><div class=\"md-avatar remove\" ng-click=\"delete($event, $index)\"><div class=\"modtype\"><i class=\"mdi mdi-delete\"></i></div></div><div class=\"md-list-item-text\"><h3>{{ sourceport.name }}</h3><p>{{ sourceport.kind }}</p></div></md-list-item></md-list></div></div><div flex=\"70\"><div class=\"slimscroll\" style=\"padding:20px\"><ng-form><fieldset><md-input-container><label>Source Port Name</label><input type=\"text\" ng-model=\"selected.name\"></md-input-container><file-choose label=\"Source Port Path\" ng-model=\"selected.path\"></file-choose><dir-choose label=\"Source Port Savegame Directory:\" ng-model=\"selected.saves\"></dir-choose></fieldset><fieldset><md-input-container><label>Parameter iwad:</label><input type=\"text\" ng-model=\"selected.cliParams.iwad\"></md-input-container><md-input-container><label>Parameter loadgame:</label><input type=\"text\" ng-model=\"selected.cliParams.loadgame\"></md-input-container><md-input-container><label>Parameter file (wad):</label><input type=\"text\" ng-model=\"selected.cliParams.file\"></md-input-container><md-input-container><label>Parameter deh:</label><input type=\"text\" ng-model=\"selected.cliParams.deh\"></md-input-container><md-input-container><label>Parameter savedir:</label><input type=\"text\" ng-model=\"selected.cliParams.savedir\"></md-input-container></fieldset><fieldset><md-input-container><label>Custom Parameters</label><textarea ng-model=\"selected.cliParams.custom\"></textarea></md-input-container><md-input-container><label>Load extra WADs (seperated by space)</label><textarea ng-model=\"selected.cliParams.extraFiles\"></textarea></md-input-container></fieldset><div style=\"text-align:right\"><md-button ng-click=\"cancel()\" class=\"md-primary md-raised\">Cancel</md-button><md-button class=\"md-accent md-raised\" ng-click=\"save()\">Save</md-button></div><br><br></ng-form></div></div></div></div></md-tab-body></md-tab></md-tabs>"
  );


  $templateCache.put('app/templates/noUpdateAvailable.html',
    "<md-dialog style=\"width:50%\"><form style=\"overflow:hidden\"><md-toolbar><div class=\"md-toolbar-tools\"><h2>No Update Available</h2><span flex></span></div></md-toolbar><md-dialog-content style=\"padding:25px\"><div><div style=\"text-align:center\"><p>Your Version is up to date!</p></div></div></md-dialog-content><div class=\"md-actions\" layout=\"row\"><span flex></span><md-button ng-click=\"close()\">Close</md-button></div></form></md-dialog>"
  );


  $templateCache.put('app/templates/ObligeLoading.html',
    "<md-dialog><md-toolbar><div class=\"md-toolbar-tools\"><h2>Oblige is building - Please wait</h2><span flex></span></div></md-toolbar><md-dialog-content style=\"padding: 25px\"><div style=\"color: white; font-weight: bold;text-align:center\"><p>Oblige is building in the background, the Game will automatically start</p><br><div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\"><md-progress-circular class=\"md-accent\" md-mode=\"indeterminate\"></md-progress-circular></div></div></md-dialog-content></md-dialog>"
  );


  $templateCache.put('app/templates/PanicDialog.html',
    "<md-dialog style=\"width:100%;max-width:750px;max-height:450px\"><md-toolbar><div class=\"md-toolbar-tools\" style=\"background-color: #ff5722\"><h2>Panic - {{title}}</h2><span flex></span></div></md-toolbar><md-dialog-content><div style=\"color: white; padding: 15px\"><p>{{message}}</p><textarea style=\"width: 100%; height: 250px; background-color:black;color: white;font-family: monospace;font-size: 14px\">{{log}}</textarea><br></div></md-dialog-content><div class=\"md-actions\" layout=\"row\"><span flex></span><md-button ng-click=\"savelog()\">Save log</md-button><md-button ng-click=\"cancel()\">OK</md-button></div></md-dialog>"
  );


  $templateCache.put('app/templates/SelectConfig.html',
    "<md-dialog style=\"width:65%\"><md-toolbar><div class=\"md-toolbar-tools\"><h2>Select Oblige Config</h2><span flex></span></div></md-toolbar><input class=\"fileDialog\" type=\"file\" style=\"display:none\" nwsaveas=\"{{wadpath}}\"><md-tabs md-selected=\"selectedTab\" md-dynamic-height><md-tab label=\"Build\"><br><md-dialog-content><div layout=\"row\"><div flex=\"5\"></div><div flex=\"90\"><div style=\"font-size: 12px\"><p>Selected Engine: {{engine.name}}<br>Selected iWad: {{iwad}}<br><span ng-show=\"lastBuilt\">Last Mapbuild: {{lastBuilt | date:'medium'}}</span></p></div><md-input-container><label>Select Oblige Mapbuild Config</label><md-select ng-model=\"selectedconfig\"><md-option ng-repeat=\"conf in mapconfigs track by $index\" value=\"{{conf.path}}\">{{conf.name}}</md-option></md-select></md-input-container><md-input-container ng-show=\"savegames.length > 0\"><md-checkbox ng-model=\"deletesavegames\" aria-label=\"Delete Savegames\"><p style=\"color:white\">Delete Savegames</p></md-checkbox></md-input-container></div><div flex=\"5\"></div></div></md-dialog-content></md-tab><md-tab label=\"Continue\" ng-disabled=\"!lastBuilt\"><br><md-dialog-content><div layout=\"row\"><div flex=\"5\"></div><div flex=\"90\"><div style=\"font-size: 12px\"><p>Selected Engine: {{engine.name}}<br>Selected iWad: {{iwad}}<br><span ng-show=\"lastBuilt\">Last Mapbuild: {{lastBuilt | date:'medium'}}</span></p></div><md-input-container ng-show=\"savegames.length > 0\"><label>Select Savegame</label><md-select ng-model=\"selectedsave\"><md-option value=\"false\">Dont load Savegame</md-option><md-option ng-repeat=\"save in savegames track by $index\" value=\"{{save.path}}\">{{save.date |date:'dd/MM HH:mm'}} - {{save.name}}</md-option></md-select></md-input-container></div><div flex=\"5\"></div></div></md-dialog-content></md-tab></md-tabs><div class=\"md-actions\"><md-button ng-click=\"cancel()\">Cancel</md-button><span flex></span><md-button ng-show=\"selectedTab === 1\" ng-click=\"openSaveDir()\">Open Savefolder</md-button><md-button ng-show=\"selectedTab === 0\" ng-click=\"openOblige()\">Open Oblige</md-button><md-button id=\"keep\" ng-show=\"lastBuilt\">Save current Map</md-button><md-button ng-show=\"selectedTab === 1\" class=\"md-accent\" ng-click=\"continue()\">Continue Last Map</md-button><md-button ng-show=\"selectedTab === 0\" class=\"md-accent\" ng-click=\"start()\">Build & Start</md-button></div></md-dialog>"
  );


  $templateCache.put('app/templates/Settings.html',
    "<md-dialog style=\"width:100%;max-width:950px;max-height:620px\"><form style=\"overflow:hidden\"><md-toolbar><div class=\"md-toolbar-tools\"><h2>Settings</h2><span flex></span></div></md-toolbar><md-dialog-content style=\"padding:25px\"><div><fieldset><legend>Config Settings</legend><div layout=\"row\"><div flex><md-button class=\"md-accent\" style=\"width: 100%\" ng-click=\"openConfig()\"><i class=\"mdi mdi-arrow-up-bold-hexagon-outline\"></i> Goto Config</md-button></div><div flex><import-choose label=\"Import Config\" ng-model=\"importConfig\"></import-choose></div></div></fieldset><fieldset><legend>Main Settings</legend><div layout=\"row\"><div flex><md-input-container><label>Favourite Engine</label><md-select ng-model=\"config.misc.preselectedengine\" placeholder=\"Favourite Engine\" ng-disabled=\"hasEngine()\"><md-option ng-repeat=\"(key,val) in config.engines\" ng-show=\"config.active[key] === true\" value=\"{{key}}\">{{key}}</md-option></md-select></md-input-container></div><div flex><md-input-container><label>Select list for Startup</label><md-select ng-model=\"config.initList\" placeholder=\"Select List\" ng-disabled=\"modlist.length === 0\"><md-option value=\"false\">Deactivate</md-option><md-option ng-repeat=\"list in modlist\" value=\"{{list}}\">{{list.name}}</md-option></md-select></md-input-container></div></div><dir-choose label=\"WAD Path:\" ng-model=\"config.wadpath\"></dir-choose><dir-choose label=\"iWAD Path:\" ng-model=\"config.iwadpath\"></dir-choose><dir-choose label=\"Modlist Path:\" ng-model=\"config.modlistpath\"></dir-choose><dir-choose label=\"Screenshot Path:\" ng-model=\"config.screenshotpath\"></dir-choose></fieldset><div class=\"settings-cb-wrapper\"><md-checkbox ng-model=\"config.active.oblige\" aria-label=\"Oblige\" class=\"settings-cb\"><p class=\"settings-cb-label\">Oblige</p></md-checkbox></div><fieldset class=\"settings-fieldset\" ng-show=\"config.active.oblige\"><legend>Oblige Settings</legend><div><file-choose label=\"Oblige Path:\" ng-model=\"config.oblige.binary\"></file-choose><dir-choose label=\"Oblige MapConfig Path:\" ng-model=\"config.oblige.configs\"></dir-choose><file-choose label=\"Oblige Random Map File:\" ng-model=\"config.oblige.mappath\"></file-choose></div></fieldset></div></md-dialog-content><div class=\"md-actions\" layout=\"row\"><span flex></span><md-button ng-click=\"cancel()\">Cancel</md-button><md-button class=\"md-accent\" ng-click=\"save()\" style=\"margin-right:20px\">Save</md-button></div></form></md-dialog>"
  );


  $templateCache.put('app/templates/Update.html',
    "<md-dialog style=\"width:80%\"><form style=\"overflow:hidden\"><md-toolbar><div class=\"md-toolbar-tools\"><h2>New Update Available!</h2><span flex></span></div></md-toolbar><md-dialog-content style=\"padding:25px\"><div layout=\"row\" layout-sm=\"column\"><div flex=\"66\"><strong>{{data.name}}</strong> is available for Download here:<br><br><h3 style=\"margin-bottom: 0\">New in this Version</h3><div style=\"white-space: pre\" ng-bind=\"data.body\"></div></div><div flex=\"33\"><md-button style=\"width: 100%\" class=\"md-raised md-accent\" ng-repeat=\"asset in data.assets\"><a target=\"_blank\" ng-click=\"download(asset.browser_download_url)\">{{asset.name}} ({{round(asset.size / (1024 *1024))}} MB)</a></md-button></div></div></md-dialog-content><div class=\"md-actions\" layout=\"row\"><span flex></span><md-button ng-show=\"showDeny\" style=\"background-color: #505050\"><i class=\"mdi mdi-bell-off\"></i> &nbsp;&nbsp;<a target=\"_blank\" ng-click=\"dontShow()\">Dont show again</a></md-button><md-button ng-click=\"close()\">Close</md-button></div></form></md-dialog>"
  );
}]);