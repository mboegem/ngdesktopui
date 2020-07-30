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
		function addMenuItem(menuName, menuitemName, callback) {
			if (!isMacDefaultMenu) {
				for (var index = 0; index < mainMenuTemplate.length; index++) {
					if (mainMenuTemplate[index].label == menuName) {
						var myItem = {
							label: menuitemName,
							type: "normal"
						};
						if (callback != null) {
							myItem.click = function(clickedItem, browserWindow, event) {
								$window.executeInlineScript(callback.formname, callback.script, [menuName, clickedItem.label, clickedItem.type, clickedItem.checked]);
							}
						}
						mainMenuTemplate[index].submenu = mainMenuTemplate[index].submenu.concat([myItem]);
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function insertMenuItem(index, menuName, menuitemName, callback) {
			if (!isMacDefaultMenu) {
				for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
					if (mainMenuTemplate[menuIndex].label == menuName) {
						var submenu = mainMenuTemplate[menuIndex].submenu;
						var myItem = {
							label: menuitemName,
							type: "normal"
						};
						if (callback != null) {
							myItem.click = function(clickedItem, browserWindow, event) {
								$window.executeInlineScript(callback.formname, callback.script, [menuName, clickedItem.label, clickedItem.type, clickedItem.checked]);
							}
						}
						submenu.splice(index, 0, myItem);
						mainMenuTemplate[menuIndex].submenu = submenu;
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
		function addCheckBox(menuName, checkboxName, checked, callback) {
			if (!isMacDefaultMenu) {
				for (var index = 0; index < mainMenuTemplate.length; index++) {
					if (mainMenuTemplate[index].label == menuName) {
						var myItem = {
							label: checkboxName,
							type: "checkbox"
						};
						myItem.checked = false;
						if (checked === true) {
							myItem.checked = checked
						}
						if (callback != null) {
							myItem.click = function(clickedItem, browserWindow, event) {
								$window.executeInlineScript(callback.formname, callback.script, [menuName, clickedItem.label, clickedItem.type, clickedItem.checked]);
							}
						}
						mainMenuTemplate[index].submenu = mainMenuTemplate[index].submenu.concat([myItem]);
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function addRadioButton(menuName, radioName, selected, callback) {
			if (!isMacDefaultMenu) {
				for (var index = 0; index < mainMenuTemplate.length; index++) {
					if (mainMenuTemplate[index].label == menuName) {
						var myItem = {
							label: radioName,
							type: "radio"
						};
						myItem.checked = false;
						if (selected === true) {
							myItem.checked = true
						}
						if (callback != null) {
							myItem.click = function(clickedItem, browserWindow, event) {
								$window.executeInlineScript(callback.formname, callback.script, [menuName, clickedItem.label, clickedItem.type, clickedItem.checked]);
							}
						}
						mainMenuTemplate[index].submenu = mainMenuTemplate[index].submenu.concat([myItem]);
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function insertCheckBox(index, menuName, checkboxName, checked, callback) {
			if (!isMacDefaultMenu) {
				for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
					if (mainMenuTemplate[menuIndex].label == menuName) {
						var submenu = mainMenuTemplate[menuIndex].submenu;
						var myItem = {
							label: checkboxName,
							type: "checkbox"
						};
						myItem.checked = false;
						if (checked === true) {
							myItem.checked = true
						}
						if (callback != null) {
							myItem.click = function(clickedItem, browserWindow, event) {
								$window.executeInlineScript(callback.formname, callback.script, [menuName, clickedItem.label, clickedItem.type, clickedItem.checked]);
							}
						}
						submenu.splice(index, 0, myItem);
						mainMenuTemplate[menuIndex].submenu = submenu;
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function insertRadioButton(index, menuName, radioName, selected, callback) {
			if (!isMacDefaultMenu) {
				for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
					if (mainMenuTemplate[menuIndex].label == menuName) {
						var submenu = mainMenuTemplate[menuIndex].submenu;
						var myItem = {
							label: radioName,
							type: "radio"
						};
						myItem.checked = false;
						if (selected === true) {
							myItem.checked = true
						}
						if (callback != null) {
							myItem.click = function(clickedItem, browserWindow, event) {
								$window.executeInlineScript(callback.formname, callback.script, [menuName, clickedItem.label, clickedItem.type, clickedItem.checked]);
							}
						}
						submenu.splice(index, 0, myItem);
						mainMenuTemplate[menuIndex].submenu = submenu;
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function addSeparator(menuName) {
			if (!isMacDefaultMenu) {
				for (var index = 0; index < mainMenuTemplate.length; index++) {
					if (mainMenuTemplate[index].label == menuName) {
						var myItem = {
							type: "separator"
						};
						mainMenuTemplate[index].submenu = mainMenuTemplate[index].submenu.concat([myItem]);
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		function insertSeparator(index, menuName) {
			if (!isMacDefaultMenu) {
				for (var menuIndex = 0; menuIndex < mainMenuTemplate.length; menuIndex++) {
					if (mainMenuTemplate[menuIndex].label == menuName) {
						var submenu = mainMenuTemplate[menuIndex].submenu;
						var myItem = {
							type: "separator"
						};
						submenu.splice(index, 0, myItem);
						mainMenuTemplate[menuIndex].submenu = submenu;
						break;
					}
				}
			}
			return mainMenuTemplate;
		}
		return {
			addMenu: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addMenu(menuName)));
			},
			insertMenu: function(index, menuName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertMenu(index, menuName)));
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
			getMenuNameByIndex: function(index) {
				var menu = Menu.getApplicationMenu();
				if (index >= 0 && index < menu.items.length) {
					return menu.items[index].label
				}
				return null;
			},
			getMenuCount: function() {
				var menu = Menu.getApplicationMenu();
				if (menu == null) {
					return 0;
				}
				return menu.items.length;
			},
			addMenuItem: function(menuName, menuitemName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addMenuItem(menuName, menuitemName, callback)));
			},
			insertMenuItem: function(index, menuName, menuitemName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertMenuItem(index, menuName, menuitemName, callback)));
			},
			removeMenuItem: function(menuName, menuItemName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenuItem(menuName, menuItemName)));
			},
			removeMenuItemByIndex: function(menuName, menuItemIndex) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenuItemByIndex(menuName, menuItemIndex)));
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
			},
			addCheckBox: function(menuName, checkboxName, checked, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addCheckBox(menuName, checkboxName, checked, callback)));
			},
			addRadioButton: function(menuName, radioName, selected, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addRadioButton(menuName, radioName, selected, callback)));
			},
			insertCheckBox: function(index, menuName, checkboxName, checked, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertCheckBox(index, menuName, checkboxName, checked, callback)));
			},
			insertRadioButton: function(index, menuName, radioName, selected, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertRadioButton(index, menuName, radioName, selected, callback)));
			},
			addSeparator: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addSeparator(menuName)));
			},
			insertSeparator: function(index, menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertSeparator(index, menuName)));
			}
		}
	}
	else {
		return {
			addMenu: function() {console.log("not in ngdesktop");},
			insertMenu: function() {console.log("not in ngdesktop");},
			removeMenu: function() {console.log("not in ngdesktop");},
			getMenuIndexByName: function() {console.log("not in ngdesktop");},
			getMenuNameByIndex: function() {console.log("not in ngdesktop");},
			getMenuCount: function() {console.log("not in ngdesktop");},
			addMenuItem: function() {console.log("not in ngdesktop");},
			insertMenuItem: function() {console.log("not in ngdesktop");},
			removeMenuItem: function() {console.log("not in ngdesktop");},
			removeMenuItemByIndex: function() {console.log("not in ngdesktop");},
			getMenuItemsCount: function() {console.log("not in ngdesktop");},
			removeAllMenuItems: function() {console.log("not in ngdesktop");},
			removeAllMenus: function() {console.log("not in ngdesktop");},
			setMenuBarVisibility: function() {console.log("not in ngdesktop");},
			addCheckBox: function() {console.log("not in ngdesktop");},
			addRadioButton: function() {console.log("not in ngdesktop");},
			insertCheckBox: function() {console.log("not in ngdesktop");},
			insertRadioButton: function() {console.log("not in ngdesktop");},
			addSeparator: function() {console.log("not in ngdesktop");},
			insertSeparator: function() {console.log("not in ngdesktop");}
		}
	}
})