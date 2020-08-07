{
	"name": "ngdesktopui",
	"displayName": "NGDesktop UI",
	"version": 1,
 	"definition": "ngdesktopui/ngdesktopui/ngdesktopui.js",
	"libraries": [],
 	"api":
 	{
 		"addMenu": {
 			"parameters": [
 				{"name": "text", "type": "string"},
 				{"name": "index", "type": "int", "optional": true}			
 			]
 		},
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
 			]
 		},
 		"addMenuItem": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "text", "type": "string"},
 				{"name": "callback", "type": "function"},
 				{"name": "position", "type": "int", "optional": true},			
 				{"name": "itemIndex", "type": "int", "optional": true}			
 			]
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
 			]
 		},
 		"addRadioButton": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "text", "type": "string"},
 				{"name": "callback", "type": "function"},
 				{"name": "selected", "type": "boolean", "optional": true},			
 				{"name": "position", "type": "int", "optional": true},
 				{"name": "itemIndex", "type": "int", "optional": true}
 			]
 		},
 		"addRoleItem": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "role", "type": "string"},			
 				{"name": "position", "type": "int", "optional": true},	
 				{"name": "itemIndex", "type": "int", "optional": true}
 			]
 		}	
 	}
 }