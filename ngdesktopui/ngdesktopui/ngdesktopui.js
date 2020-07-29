angular.module('ngdesktopui',['servoy'])
.factory("ngdesktopui",function($services, $q, $log, $window) 
{
	var remote = null;
	var Menu = null;
	var os = null;
	var isMacOS = false;
	var isMacDefaultMenu = false;
	
	if (typeof require == "function") {
		remote = require('electron').remote;
		Menu = remote.Menu;
		os = require('os');
	}

	if (remote) {
		var mainMenuTemplate = [];
		isMacOS = (os.platform() === 'darwin');
		function addMenu(menuName) {
			if (isMacDefaultMenu) {
				mainMenuTemplate = [];
				isMacDefaultMenu = false;
			}
			var myMenu = {
				label: menuName,
				submenu: []
			}
			mainMenuTemplate.push(myMenu)
			return mainMenuTemplate;
		}
		function insertMenu(index, menuName) {
			if (Number.isInteger(index)) {
				if (isMacDefaultMenu) {
					mainMenuTemplate = [];
					isMacDefaultMenu = false;
				}
				var myMenu = {
					label: menuName,
					submenu: []
				}		
				mainMenuTemplate.splice(index, 0, myMenu);
			}
			return mainMenuTemplate;
		}
		function removeMenu(menuName) {
			for (var index = 0; index < mainMenuTemplate.length; index++) {
				if (mainMenuTemplate[index].label == menuName) {
					mainMenuTemplate.splice(index,1);
					break;
				}
			}
			return mainMenuTemplate;
		}
		function clearMenu() {
			if (isMacOS) {
				mainMenuTemplate = [
					{
						label: 'DefaultMacMenu',
						submenu: [
							{ role: 'quit' }
						]
					}
				]
				isMacDefaultMenu = true;
			} else {
				mainMenuTemplate = [];
			}
			return mainMenuTemplate;
		}
		function addMenuItem(menuName, menuitem, callback) {
			if (!isMacDefaultMenu) {
				for (var index = 0; index < mainMenuTemplate.length; index++) {
					if (mainMenuTemplate[index].label == menuName) {
						var myItem = {
							label: menuitem.label,
							type: menuitem.type,
							role: menuitem.role
						};
						if (menuitem.type != "separator" && menuitem.callback != null) {
							myItem.click = function() {
								$window.executeInlineScript(menuitem.callback.formname, menuitem.callback.script, [menuName, menuitem.label]);
							}
						}
						mainMenuTemplate[index].submenu = mainMenuTemplate[index].submenu.concat([myItem]);
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function insertMenuItem(index, menuName, menuitem, callback) {
			if (!isMacDefaultMenu) {
				for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
					if (mainMenuTemplate[menuIndex].label == menuName) {
						var submenu = mainMenuTemplate[menuIndex].submenu;
						var myItem = {
							label: menuitem.label,
							type: menuitem.type,
							role: menuitem.role,
						};
						if (menuitem.type != "separator" && menuitem.callback != null) {
							myItem.click = function() {
								$window.executeInlineScript(menuitem.callback.formname, menuitem.callback.script, [menuName, menuitem.label]);
							}
						}
						submenu.splice(index, 0, myItem);
						mainMenuTemplate[index].submenu = submenu;
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function removeMenuItem(menuName, menuItemName) {
			for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
				if (mainMenuTemplate[menuIndex].label == menuName) {
					var submenu = mainMenuTemplate[menuIndex].submenu;
					for (var itemIndex = 0; itemIndex < submenu.length; itemIndex++) {
						if (menuItemName == submenu[itemIndex].label) {
							submenu.splice(itemIndex, 1);
							break;
						}					
					}
					mainMenuTemplate[menuIndex].submenu = submenu;
				}
			}
			return mainMenuTemplate;
		}
		function removeMenuItemByIndex(menuName, menuItemIndex) {
			for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
				if (mainMenuTemplate[menuIndex].label == menuName) {
					var submenu = mainMenuTemplate[menuIndex].submenu;
						submenu.splice(menuItemIndex, 1);			
					mainMenuTemplate[menuIndex].submenu = submenu;
					break;
				}
			}
			return mainMenuTemplate;
		}
		function removeAllMenuItems(menuName) {
			for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
				if (mainMenuTemplate[menuIndex].label == menuName) {
					mainMenuTemplate[menuIndex].submenu = [];
					break;
				}
			}
			return mainMenuTemplate;
		}
		return {
			addMenu: function(menuName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addMenu(menuName, callback)));
			},
			insertMenu: function(index, menuName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertMenu(index, menuName, callback)));
			},
			removeMenu: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenu(menuName)));
			},
			getMenuIndexByName: function(name) {
				var menu = Menu.getApplicationMenu();
				var retVal = -1;
				if (menu != null) {
					for (var index = 0; index < menu.items.length; index++) {
						var menuitem = menu.items[index];
						if (menuitem.label == name) {
							retVal = index;
							break;
						}
					}
				}
				return retVal;
			},
			getMenuCount: function() {
				var menu = Menu.getApplicationMenu();
				if (menu == null) {
					return 0;
				}
				return menu.items.length;
			},
			addMenuItem: function(menuName, menuitem, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addMenuItem(menuName, menuitem, callback)));
			},
			insertMenuItem: function(index, menuName, menuitem, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertMenuItem(index, menuName, menuitem, callback)));
			},
			removeMenuItem: function(menuName, menuItemName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenuItem(menuName, menuItemName)));
			},
			removeMenuItemByIndex: function(menuName, menuItemIndex) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenuItemByIndex(menuName, menuItemIndex)));
			},
			getMenuItemIndexByName: function(menuName, menuItemName) {
				var menu = Menu.getApplicationMenu().items;
				for (var index = 0; index < menu.length; index++) {
					if (menu[index].label == menuName) {
						var items = menu[index].submenu.items;
						for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
							if (menuItemName == items[itemIndex].label) {
								return itemIndex;
							}
						}
					}
				}
				return -1;
			},
			getMenuItemsCount: function(menuName) {
				var menu = Menu.getApplicationMenu().items;
				for (var index = 0; index < menu.length; index++) {
					if (menu[index].label == menuName) {
						return menu[index].submenu.items.length;
					}
				}
				return -1;
			},
			removeAllMenuItems: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeAllMenuItems(menuName)));
			},
			removeAllMenus: function() {
				Menu.setApplicationMenu(Menu.buildFromTemplate(clearMenu()));
			},
			setMenuBarVisibility: function(visible) {
				remote.getCurrentWindow().setMenuBarVisibility(visible); //Windows, Linux
			}
		}
	}
	else {
		return {
			addMenu: function() {console.log("not in ngdesktop");},
			insertMenu: function() {console.log("not in ngdesktop");},
			removeMenu: function() {console.log("not in ngdesktop");},
			getMenuIndexByName: function() {console.log("not in ngdesktop");},
			getMenuCount: function() {console.log("not in ngdesktop");},
			addMenuItem: function() {console.log("not in ngdesktop");},
			insertMenuItem: function() {console.log("not in ngdesktop");},
			removeMenuItem: function() {console.log("not in ngdesktop");},
			removeMenuItemByIndex: function() {console.log("not in ngdesktop");},
			getMenuItemIndexByName: function() {console.log("not in ngdesktop");},
			getMenuItemsCount: function() {console.log("not in ngdesktop");},
			removeAllMenuItems: function() {console.log("not in ngdesktop");},
			removeAllMenus: function() {console.log("not in ngdesktop");},
			setMenuBarVisibility: function() {console.log("not in ngdesktop");}
		}
	}
})