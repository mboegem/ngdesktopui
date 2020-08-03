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
		function removeMenuItemByIndex(menuItemIndex, menuName) {
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
			/**
			 * Add specified menu to menu bar
			 * 
			 * //add menus to the menubar
			 * plugins.ngdesktopui.addMenu("Edit");
			 * plugins.ngdesktopui.addMenu("Search");
			 * plugins.ngdesktopui.addMenu("Window")";
			 * ... 
			 */
			addMenu: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addMenu(menuName)));
			},
			/**
			 * Insert menu to the specified position
			 * 
			 * //add menus to the menubar
			 * plugins.ngdesktopui.addMenu("Edit");
			 * plugins.ngdesktopui.addMenu("Search");
			 * plugins.ngdesktopui.addMenu("Window")";
			 * 
			 * //insert menu in the first position
			 * plugins.ngdesktopui.insertMenu(0, "File)";
			 * ... 
			 * 
			 * @param index - zero based position of the inserted menu
			 * @param menuName - the name of the menu to insert.
			 */
			insertMenu: function(index, menuName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertMenu(index, menuName)));
			},
			/**
			 * Remove specified menu from menu bar
			 * 
			 * ... 
			 * //remove menu
			 * plugins.ngdesktopui.removeMenu("Search");
			 * 
			 * @param menuName - the name of the menu to remove.
			 */
			removeMenu: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenu(menuName)));
			},
			/**
			 * Return the menu index from menu bar. The index is zero based.
			 * 
			 * //add menus to the menubar
			 * plugins.ngdesktopui.addMenu("File");
			 * plugins.ngdesktopui.addMenu("Windows)";
			 * plugins.ngdesktopui.addMenu("Help)";
			 * 
			 * ... 
			 * //get the index
			 * var index = plugins.ngdesktopui.getMenuIndexByName("Help");
			 * 
			 * @param menuName - the name of the menu to be queried
			 */
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
			/**
			 * Return the menu name from the menu bar. The index is zero based.
			 * 
			 * //add menus to the menubar
			 * plugins.ngdesktopui.addMenu("File");
			 * plugins.ngdesktopui.addMenu("Windows)";
			 * plugins.ngdesktopui.addMenu("Help)";
			 * 
			 * ... 
			 * //get menu name
			 * var menuName = plugins.ngdesktopui.getMenuNameByIndex(1);
			 * 
			 * @param int - the zero based index to query for menu the name.
			 */
			getMenuNameByIndex: function(index) {
				var menu = Menu.getApplicationMenu();
				if (index >= 0 && index < menu.items.length) {
					return menu.items[index].label
				}
				return null;
			},
			/**
			 * Count menus from the menu bar.
			 * 
			 * //add menus to the menubar
			 * plugins.ngdesktopui.addMenu("File");
			 * plugins.ngdesktopui.addMenu("Windows)";
			 * plugins.ngdesktopui.addMenu("Help)";
			 * 
			 * ... 
			 * //count menus
			 * var menuCount = plugins.ngdesktopui.getMenuCount();
			 */
			getMenuCount: function() {
				var menu = Menu.getApplicationMenu();
				if (menu == null) {
					return 0;
				}
				return menu.items.length;
			},
			/**
			 * Add menu items to existing menu.
			 * 
			 * //add menus to the menubar
			 * plugins.ngdesktopui.addMenu("File");
			 * plugins.ngdesktopui.addMenu("Edit)";
			 * plugins.ngdesktopui.addMenu("Help)";
			 * 
			 * ... 
			 * //add items
			 * plugins.ngdesktopui.addMenuItem("Edit", "Cut", cutCallback);
			 * plugins.ngdesktopui.addMenuItem("Edit", "Copy", copyCallback);
			 * plugins.ngdesktopui.addMenuItem("Edit", "Paste", pasteCallback);
			 * 
			 * @param menuName - the parent menu for the item
			 * @param menuitemName - the name of the item
			 * @param callback - callback function to call when this menuitem is selected.
			 *                   The callback function will receive:
			 *                       - menuName
			 *                       - menuitemName 
			 *                       - menuitemType ("normal", "radio", "checkbox")
			 */
			addMenuItem: function(menuName, menuitemName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addMenuItem(menuName, menuitemName, callback)));
			},
			/**
			 * Insert menu items to existing menu.
			 * 
			 * //add menus to the menubar
			 * plugins.ngdesktopui.addMenu("File");
			 * plugins.ngdesktopui.addMenu("Edit)";
			 * plugins.ngdesktopui.addMenu("Help)";
			 * 
			 * ... 
			 * //add items
			 * plugins.ngdesktopui.addMenuItem("Edit", "Cut", cutCallback);
			 * plugins.ngdesktopui.addMenuItem("Edit", "Copy", copyCallback);
			 * plugins.ngdesktopui.addMenuItem("Edit", "Paste", pasteCallback);
			 * 
			 * //insert menuitem
			 * plugins.ngdesktopui.insertMenuItem(0, "Edit", "Undo", undoCallback);
			 * 
			 * @param index - zero based position where to insert the menuitem
			 * @param menuName - the parent menu for the item
			 * @param menuitemName - the name of the item
			 * @param callback - callback function to call when this menuitem is selected.
			 *                   The callback function will receive:
			 *                       - menuName
			 *                       - menuitemName 
			 *                       - menuitemType ("normal", "radio", "checkbox")
			 */
			insertMenuItem: function(index, menuName, menuitemName, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertMenuItem(index, menuName, menuitemName, callback)));
			},
			/**
			 * Remove menu item from existing menu.
			 * 
			 * //remove menuitem
			 * plugins.ngdesktopui.removeMenuItem("Edit", "Paste");
			 * 
			 * @param menuName - the parent menu for the item
			 * @param menuitemName - the name of the item
			 */
			removeMenuItem: function(menuName, menuItemName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenuItem(menuName, menuItemName)));
			},
			/**
			 * Remove menu item from existing menu. The index is zero based
			 * This function is useful to remove separators - which have no name
			 * 
			 * //remove menuitem
			 * plugins.ngdesktopui.removeMenuItem("Edit", 2);
			 * @param menuItemIndex - item position
			 * @param menuName - the parent menu for the item
			 */
			removeMenuItemByIndex: function(menuItemIndex, menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeMenuItemByIndex(menuItemIndex, menuName)));
			},
			/**
			 * Count menu items for the specified menu
			 * var itemsCount = plugins.ngdesktopui.getMenuItemsCount("Edit");
			 * 
			 * @params menuName
			 */
			getMenuItemsCount: function(menuName) {
				var menu = Menu.getApplicationMenu().items;
				for (var index = 0; index < menu.length; index++) {
					if (menu[index].label == menuName) {
						return menu[index].submenu.items.length;
					}
				}
				return -1;
			},
			/**
			 * Cleanup the specified menu
			 * 
			 * @params menuName
			 */
			removeAllMenuItems: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(removeAllMenuItems(menuName)));
			},
			/**
			 * Cleanup the menubar. For MacOS that means to display a minimal menu
			 */
			removeAllMenus: function() {
				Menu.setApplicationMenu(Menu.buildFromTemplate(clearMenu()));
			},
			/**
			 * Show/hide menubar visibility. This function is working only on Windows/Linux
			 */
			setMenuBarVisibility: function(visible) {
				remote.getCurrentWindow().setMenuBarVisibility(visible); //Windows, Linux
			},
			/**
			 * Add checkbox to the specified menu
			 * 
			 * @params menuName
			 * @params checkboxName, 
			 * @params checked - true, false: initial checkbox state
			 * @params callback - callback function to call when this menuitem is selected.
			 *                   The callback function will receive:
			 *                       - menuName, 
			 *                       - menuitemName
			 *                       - menuitemType ("normal", "radio", "checkbox")
			 *                       - checked (true, false)
			 */
			addCheckBox: function(menuName, checkboxName, checked, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addCheckBox(menuName, checkboxName, checked, callback)));
			},
			/**
			 * Add radio button to the specified menu
			 * 
			 * @params menuName
			 * @params radio button name, 
			 * @params checked - true, false: selection state
			 * @params callback - callback function to call when this radi button is selected.
			 *                   The callback function will receive:
			 *                       - menuName, 
			 *                       - menuitemName
			 *                       - menuitemType ("normal", "radio", "checkbox")
			 */
			addRadioButton: function(menuName, radioName, selected, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addRadioButton(menuName, radioName, selected, callback)));
			},
			/**
			 * Insert checkbox to the specified menu
			 * 
			 * @params index
			 * @params menuName
			 * @params checkboxName, 
			 * @params checked - true, false: initial checkbox state
			 * @params callback - callback function to call when this menuitem is selected.
			 *                   The callback function will receive:
			 *                       - menuName, 
			 *                       - menuitemName
			 *                       - menuitemType ("normal", "radio", "checkbox")
			 *                       - checked (true, false)
			 */
			insertCheckBox: function(index, menuName, checkboxName, checked, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertCheckBox(index, menuName, checkboxName, checked, callback)));
			},
			/**
			 * Insert radio button to the specified menu
			 * 
			 * @params menuName
			 * @params radio button name, 
			 * @params checked - true, false: selection state
			 * @params callback - callback function to call when this radi button is selected.
			 *                   The callback function will receive:
			 *                       - menuName, 
			 *                       - menuitemName
			 *                       - menuitemType ("normal", "radio", "checkbox")
			 */
			insertRadioButton: function(index, menuName, radioName, selected, callback) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(insertRadioButton(index, menuName, radioName, selected, callback)));
			},
			/**
			 * Add separator line to the specified menu
			 */
			addSeparator: function(menuName) {
				Menu.setApplicationMenu(Menu.buildFromTemplate(addSeparator(menuName)));
			},
			/**
			 * Insert separator line to the specified menu at the specified position
			 */
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