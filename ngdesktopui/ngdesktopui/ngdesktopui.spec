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
 				{"name": "menuName", "type": "string"}
 			]
 		},
 		"insertMenu": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "menuName", "type": "string"}
 			]
 		},
 		"removeMenu": {
 			"parameters": [
 				{"name": "menuName", "type": "string"}
 			]
 		},
 		"getMenuIndexByName": {
 			"parameters": [
 				{"name": "menuName", "type": "string"}
 			],
 			"returns": "int"
 		},
 		"getMenuNameByIndex": {
 			"parameters": [
 				{"name": "index", "type": "int"}
 			],
 			"returns": "string"
 		},
 		"getMenuCount": {
 			"returns": "int"
 		},
 		"addSeparator": {
 			"parameters": [
 				{"name": "menuName", "type": "string"}
 			]
 		},
 		"insertSeparator": {
 			"parameters": [
 				{"name": "index", "type": "string"},
 				{"name": "menuName", "type": "string"}
 			]
 		},
 		"addMenuItem": {
 			"parameters": [
 				{"name": "menuName", "type": "string"},
 				{"name": "menuItem", "type": "string"},
 				{"name": "callback", "type": "function", "optional": true }
 			]
 		},
 		"insertMenuItem": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "menuName", "type": "string"},
 				{"name": "menuItem", "type": "string"},
 				{"name": "callback", "type": "function", "optional": true }
 			]
 		},
 		"removeMenuItem": {
 			"parameters": [
 				{"name": "menuName", "type": "string"},
 				{"name": "menuItemName", "type": "string"}
 			]
 		},
 		"removeMenuItemByIndex": {
 			"parameters": [
 				{"name": "menuName", "type": "string"},
 				{"name": "menuItemIndex", "type": "int"}
 			]
 		},
 		"getMenuItemsCount": {
 			"parameters": [
 				{"name": "menuName", "type": "string"}
 			],
 			"returns": "int"
 		},	
 		"removeAllMenuItems": {
 			"parameters": [
 				{"name": "menuName", "type": "string"}
 			],
 			"returns": "boolean"
 		},
 		"removeAllMenus": {},
 		"setMenuBarVisibility": {
 			"parameters": [
 				{"name": "visible", "type": "boolean"}
 			]
 		},
 		"addCheckBox": {
 			"parameters": [
 				{"name": "menuName", "type": "string"},
 				{"name": "checkboxName", "type": "string"},
 				{"name": "checked", "type": "boolean"},
 				{"name": "callback", "type": "function", "optional": true } 				
 			]
 		},
 		"addRadioButton": {
 			"parameters": [
 				{"name": "menuName", "type": "string"},
 				{"name": "radioName", "type": "string"},
 				{"name": "select", "type": "boolean"},
 				{"name": "callback", "type": "function", "optional": true }
 			]
 		},
 		"insertCheckBox": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "menuName", "type": "string"},
 				{"name": "checkboxName", "type": "string"},
 				{"name": "checked", "type": "boolean"},
 				{"name": "callback", "type": "function", "optional": true }
 			]
 		},
 		"insertRadioButton": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "menuName", "type": "string"},
 				{"name": "radioName", "type": "string"},
 				{"name": "select", "type": "boolean"},
 				{"name": "callback", "type": "function", "optional": true }
 			]
 		}		
 	}
 }