{
	"name": "ngdesktopui",
	"displayName": "NGDesktop UI",
	"version": 1,
 	"definition": "ngdesktopui/ngdesktopui/ngdesktopui.js",
	"libraries": [],
	"ng2Config": {
       "packageName": "@servoy/ngdesktopui",
       "serviceName": "NGDesktopUIService",
       "entryPoint": "dist/servoy/ngdesktopui"
    },
 	"api":
 	{
 		"addMenu": {
 			"parameters": [
 				{"name": "text", "type": "string"},
 				{"name": "index", "type": "int", "optional": true}			
 			],
 			"returns": "int"
 		},
 		"addDevToolsMenu": {},
 		"removeMenu": {
 			"parameters": [
 				{"name": "index", "type": "int"}
 			]
 		},
 		"getMenuIndexByText": {
 			"parameters": [
 				{"name": "text", "type": "string"}
 			],
 			"returns": "int"
 		},
 		"getMenuText": {
 			"parameters": [
 				{"name": "index", "type": "int"}
 			],
 			"returns": "string"
 		},
 		"getMenuCount": {
 			"returns": "int"
 		},
 		"removeAllMenus": {},
 		"setMenuBarVisibility": {
 			"parameters": [
 				{"name": "visible", "type": "boolean"}
 			]
 		},
 		"removeAllMenuItems": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "itemIndex", "type": "int", "optional": true}
 			]
 		},
 		"addSeparator": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "position", "type": "int", "optional": true},
 				{"name": "itemIndex", "type": "int", "optional": true}
 			],
 			"returns": "int"
 		},
 		"addMenuItem": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "text", "type": "string"},
 				{"name": "callback", "type": "function"},
 				{"name": "position", "type": "int", "optional": true},			
 				{"name": "itemIndex", "type": "int", "optional": true}			
 			],
 			"returns": "int"
 		},
 		"removeMenuItem": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "position", "type": "int"},
 				{"name": "itemIndex", "type": "int", "optional": true}
 			]
 		},
 		"getMenuItemIndexByText": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "text", "type": "string"}
 			],
 			"returns": "int"
 		},	
 		"getMenuItemText": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "itemIndex", "type": "int"}
 			],
 			"returns": "string"
 		},	
 		"getMenuItemsCount": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "itemIndex", "type": "int", "optional": true}
 			],
 			"returns": "int"
 		},	
 		"addCheckBox": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "text", "type": "string"},
 				{"name": "callback", "type": "function"},
 				{"name": "checked", "type": "boolean", "optional": true},
 				{"name": "position", "type": "int", "optional": true},
 				{"name": "itemIndex", "type": "int", "optional": true} 				
 			],
 			"returns": "int"
 		},
 		"addRadioButton": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "text", "type": "string"},
 				{"name": "callback", "type": "function"},
 				{"name": "selected", "type": "boolean", "optional": true},			
 				{"name": "position", "type": "int", "optional": true},
 				{"name": "itemIndex", "type": "int", "optional": true}
 			],
 			"returns": "int"
 		},
 		"addRoleItem": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "role", "type": "string"},
 				{"name": "text", "type": "string", "optional": true},			
 				{"name": "position", "type": "int", "optional": true},	
 				{"name": "itemIndex", "type": "int", "optional": true}
 			],
 			"returns": "int"
 		},
		"createBrowserView": {
			"parameters" : [
				{"name":"x", "type":"int"},
				{"name":"y", "type":"int"},
				{"name":"width", "type":"int"},
				{"name":"height", "type":"int"},
				{"name":"url", "type":"string"}
			],
			"returns":"int"
		},
		"closeBrowserView": {
			"parameters" : [
				{"name":"id", "type":"int"}
			]
		},
		"injectJSIntoBrowserView": {
			"parameters" : [
				{"name":"id", "type":"int"},
				{"name":"js", "type":"string"},
				{"name":"callback", "type":"function"}
			]
		},
		"setZoomFactor": {
			"parameters" : [
				{"name":"factor", "type":"number"}
			]
		},
		"getZoomFactor": {
			"returns": "number"
		},
		"showWindow": {},
		"hideWindow": {},
		"maximizeWindow": {},
		"unmaximizeWindow": {}
 	}
 }