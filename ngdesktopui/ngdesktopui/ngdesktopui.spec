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
 		"getMenuCount": {
 			"returns": "int"
 		},
 		"addMenuItem": {
 			"parameters": [
 				{"name": "menuName", "type": "string"},
 				{"name": "menuItem", "type": "menuitem"}
 			]
 		},
 		"insertMenuItem": {
 			"parameters": [
 				{"name": "index", "type": "int"},
 				{"name": "menuName", "type": "string"},
 				{"name": "menuItem", "type": "menuitem"}
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
 		"getMenuItemIndexByName": {
 			"parameters": [
 				{"name": "menuName", "type": "string"},
 				{"name": "menuItemName", "type": "string"}
 			],
 			"returns": "int"
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
 		}				
 	},
 	"types": {
 		"menuitem": {
 			"label": "string",
 			"type": "string",
 			"role": "string",
 			"callback": "function"
  		}
 	}
 	
}