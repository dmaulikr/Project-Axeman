/******************************************************************************
 * DevelopmentToolbar.js
 * 
 * Author:
 * 		Aleksandar Toplek
 *
 * Created on:
 * 		27.02.2012.
 *
 * Notes:
 *			This plugin will enable developers to access frequently accessed
 *		development pages and give them aditional information about extension
 *		state. 
 *			This plugin will only be active when extension app is in 
 *		development mode which means that IsDevelopmentMode is set to true.
 *		This can be done by changing variable at Variables.js file.
 *
 *****************************************************************************/

/******************************************************************************
 *
 * Development toolbar that appears on bottom of the page
 *
 *****************************************************************************/
function DevelopmentToolbar() {
	/**************************************************************************
	 *
	 * Registers Developer toolbar plugin
	 *
	 *************************************************************************/
	this.Register = function () {
		Log("DevelopmentToolbar: Registering DevelopmentToolbar plugin...");

		// Check if plugin can be active
		if (IsDevelopmentMode == false) {
			Log("DevelopmentToolbar: Not in development mode");
			return;
		}

		// Activate plugin message
		Log("DevelopmentToolbar: Extension is in development mode - plugin set to active.");

		// Creates new development toolbar source code
		var toolbar = this.GetNewToolbar(
 			this.GetNewLabel("Project - Axeman"),
 			this.GetNewButton("PluginManager", GetURL("/Pages/PluginsManager.html")),
			this.GetNewButton("Popup", GetURL("/Pages/Popup.html")),
			this.GetNewButton("StorageDetails", GetURL("/Pages/StorageDetails.html"))
 		);

		// Appends style and code to current page
		$("head").append(this.GetDevelopmentToolbarStyle());
		$("body").append(toolbar);
	};

	// TODO: Comment function
	this.GetDevelopmentToolbarStyle = function () {
		var style =
			'<style type="text/css">' +
				// Toolbar style
				'.DTBase {' +
					'position:fixed;' +
					'z-index:1000;' +
					'bottom: 0px; right: 0px; left: 0px;' +
					'padding: 5px;' +
					'background: -webkit-gradient(linear, left top, left bottom, from(#D3D3D3), to(#919191));' +
				'}' +
				// Button style
				'.DTButton:link, ' +
				'.DTButton:hover, ' +
				'.DTButton:visited, ' +
				'.DTButton:active, ' +
				'.DTButton {' +
					'color: lightgray;' +
					'background: -webkit-gradient(linear, left top, left bottom, from(#747474), to(#4B4B4B));' +
					'padding: 2px 8px 2px 8px;' +
					'border-radius: 10px;' +
				'}' +
				// Label style
				'.DTLabelNormal:link, ' +
				'.DTLabelNormal:hover, ' +
				'.DTLabelNormal:visited, ' +
				'.DTLabelNormal:active, ' +
				'.DTLabelNormal {' +
					'padding: 0px 10px;' +
					'color: black;' +
				'}' +
				// InfoLabel style
				'.DTLabelInfo:link, ' +
				'.DTLabelInfo:hover, ' +
				'.DTLabelInfo:visited, ' +
				'.DTLabelInfo:active, ' +
				'.DTLabelInfo {' +
					'color: gray;' +
				'}' +
				// WarnLabel style
				'.DTLabelWarn:link, ' +
				'.DTLabelWarn:hover, ' +
				'.DTLabelWarn:visited, ' +
				'.DTLabelWarn:active, ' +
				'.DTLabelWarn {' +
					'color: red;' +
				'}' +
			'</style>';

		return style;
	};

	// TODO: Comment function
	this.GetNewLabel = function (content) {
		DLog("DevelopmentToolbar: Creating new label '" + content + "'");

		return '<a class="DTLabelNormal" href="#">' + content + '</a>';
	};

	// TODO: Comment function
	this.GetNewLabelInfo = function (content) {
		DLog("DevelopmentToolbar: Creating new InfoLabel '" + content + "'");

		return '<a class="DTLabelNormal DTLabelInfo" href="#">' + content + '</a>';
	};

	// TODO: Comment function
	this.GetNewLabelWarn = function (content) {
		DLog("DevelopmentToolbar: Creating new WarnLabel '" + content + "'");

		return '<a class="DTLabelNormal DTLabelWarn" href="#">' + content + '</a>';
	};

	// TODO: Comment function
	this.GetNewToolbar = function () {
		DLog("DevelopmentToolbar: Creating new Toolbar with [" + arguments.length + "] components.");

		var toolbarSource = '<div class="DTBase" id="DevelopmentToolbar">';
		for (var index = 0; index < arguments.length; index++) {
			toolbarSource += arguments[index];
		}
		toolbarSource += '</dev>';

		return toolbarSource;
	};

	// TODO: Comment function
	this.GetNewButton = function (content, reference) {
		DLog("DevelopmentToolbar: Creating new Button of content '" + content + "'");

		return '<a class="DTButton" target="_blank" href="' + reference + '">' + content + '</a>&nbsp;&nbsp;&nbsp;&nbsp;'
	};
}

// Metadata for this plugin (DevelopmentToolbar)
var DevelopmentToolbarMetadata = {
	Name: "DevelopmentToolbar",
	Alias: "Development Toolbar",
	Category: "Development",
	Version: "0.2.1.1",
	Description: "You can quickly access extension development pages from bottom of the page. It will even give you some additional information about script.",
	Author: "JustBuild Development",
	Site: "https://github.com/JustBuild/Project-Axeman/wiki",

	Flags: {
		Beta: true,
		Internal: true
	},

	Class: DevelopmentToolbar
};

// Adds this plugin to global list of available plugins
GlobalPluginsList[GlobalPluginsList.length] = $.extend(true, {}, Models.PluginMetadata, DevelopmentToolbarMetadata);