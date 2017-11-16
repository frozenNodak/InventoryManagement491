var app = angular.module('app');

/**
 * The Inventory service requires the $http service as a dependency,
 * and allows for the connection of and retrieval of data from the items
 * table
 */
app.factory('InventoryService', function($http, localStorageService) {
	
	return {
		
		/**
		 * getInventory fetches all of the items in the inventory database
		 */
		getInventory: function() {
			var req = {
          method: 'GET',
          url: SERVER_URL+'items',
          headers: {
              'Content-Type': "application/json",
              'Authorization': "JWT " + localStorageService.get("token")
          }
      }

			return $http(req).then(function(res) {
				return res.data.data;
			})
		},


		getDepartments: function() {
			var req = {
          method: 'GET',
          url: SERVER_URL+'departments',
          headers: {
              'Content-Type': "application/json",
              'Authorization': "JWT " + localStorageService.get("token")
          }
      }

			return $http(req).then(function(res) {
				return res.data.data;
			})
		},

		getBuildings: function() {
			var req = {
          method: 'GET',
          url: SERVER_URL+'buildings',
          headers: {
              'Content-Type': "application/json",
              'Authorization': "JWT " + localStorageService.get("token")
          }
      }

			return $http(req).then(function(res) {
				return res.data.data;
			})
		},

		getRooms: function() {
			var req = {
          method: 'GET',
          url: SERVER_URL+'rooms',
          headers: {
              'Content-Type': "application/json",
              'Authorization': "JWT " + localStorageService.get("token")
          }
      }

			return $http(req).then(function(res) {
				return res.data.data;
			})
		},

		search: function(department, building, room) {

			var query = '';

			if (typeof department != 'undefined') {
				query += department;
				if (typeof building != 'undefined') {
					query += '/'+ building;
					if (typeof room != 'undefined') query += '/'+ room;
				}
			}

			var req = {
          method: 'GET',
          url: SERVER_URL+'items/search/'+query,
          headers: {
              'Content-Type': "application/json",
              'Authorization': "JWT " + localStorageService.get("token")
          }
      }

			return $http(req).then(function(res) {
				return res.data.data;
			})
		},
		
		/**
		 * filterInventory fetches items from the inventory database matching a specific filter and query
		 * @arg filter The key to filter by
		 * @arg query The query which the key value needs to match
		 */
		filterInventory: function(filter, query) {
			return $http.get('../inventory-api/get_items.php', { params: {filter: filter, query: query}})
				.then(function(res) {
					return res.data;
				})
		},
		
		/**
		 * addInventory adds a specified item to the database
		 * @arg item The item to be added to the database
		 */
		addInventory: function(item) {
			return $http.post('../inventory-api/add_item.php', item)
				.then(function(res) {
					return res.data;
				})
		},
		
		/**
		 * updateInventory updates a specific item in the inventory database
		 * @arg item The item to be updated in the database
		 */
		updateInventory: function(item) {
			return $http.post('../inventory-api/update_item.php', item)
				.then(function(res) {
					return res.data;
				})
		},
		
		/**
		 * removeInventory removes an item from the database
		 * @arg item The item to be removed from the database
		 */
		removeInventory: function(item) {
			var req = {
          method: 'DELETE',
          url: SERVER_URL+'items/'+item.id,
          headers: {
              'Content-Type': "application/json",
              'Authorization': "JWT " + localStorageService.get("token")
          }
      }

			return $http(req).then(function(res) {
				return res.data.data;
			})
		}
		
	}
	
});

/**
 * The Inventory controller manages the inventory view of the application, and requires the rootScope,
 * scope, mdDialog, mdToast, timeout, uiGridConstants, and InventoryService dependencies. It effectively 
 * constructs the grid and sets the search query object. Additionally, it controls the autocomplete for search.
 */
app.controller('Inventory', function($rootScope, $scope, $mdDialog, $mdToast, $timeout, uiGridConstants, InventoryService) {
	
	// Set up the search items
	$scope.search = {};
	$scope.search.filterBy = "all";
	
	// Set up the grid and specify its settings and columns
	$scope.grid = true;
	$scope.gridOptions = {
		enableHorizontalScrollbar: 0,
		enableVerticalScrollbar: 1,
		enableSorting: true,
		enableGridMenu: true,
		gridMenuShowHideColumns: false,
		exporterCsvFilename: 'inventory-report-' + moment().format('MM-DD-YYYY') + '.csv',
		exporterCsvLinkElement: angular.element(document.querySelectorAll('.custom-csv-link')),
		exporterMenuPdf: false,
		exporterSuppressColumns: ['actions'],
		onRegisterApi: function(gridApi) {
			$scope.gridApi = gridApi;
		},
		rowHeight: 50,
		data: new Array(),
		columnDefs: [
			{
				name: 'barcode',
				field: 'barcode',
				displayName: 'Barcode',
				enableCellEdit: false,
				cellTemplate: './templates/grid/cell_template.html',
				editableCellTemplate: '<form name="inputForm" class="md-grid-input-form"><md-input-container class="md-grid-input"><label>{{ col.displayName }}</label><input type="INPUT_TYPE" ui-grid-editor ng-model="MODEL_COL_FIELD" autocomplete="off"></md-input-container></form>',
				enableColumnResizing: true
			},
			{
				name: 'description',
				field: 'description',
				displayName: 'Description',
				sort: { direction: uiGridConstants.ASC, priority: 1 },
				enableCellEdit: true,
				cellTemplate: './templates/grid/cell_template.html',
				editableCellTemplate: '<form name="inputForm" class="md-grid-input-form"><md-input-container class="md-grid-input"><label>{{ col.displayName }}</label><input type="INPUT_TYPE" ui-grid-editor ng-model="MODEL_COL_FIELD" autocomplete="off"></md-input-container></form>',
				enableColumnResizing: true
			},
			{
				name: 'typeName',
				field: 'typeName',
				displayName: 'Type',
				enableCellEdit: true,
				cellTemplate: './templates/grid/cell_template.html',
				editableCellTemplate: '<form name="inputForm" class="md-grid-input-form"><md-input-container class="md-grid-input"><label>{{ col.displayName }}</label><input type="INPUT_TYPE" ui-grid-editor ng-model="MODEL_COL_FIELD" autocomplete="off"></md-input-container></form>',
				enableColumnResizing: true
			},
			{
				name: 'actions',
				field: 'actions',
				displayName: 'Actions',
				enableCellEdit: false,
				cellTemplate: '<md-button class="md-warn" ng-click="grid.appScope.removeInventory(row.entity)">Delete</md-button><img class="savedIndicator" src="./images/checkmark.png" ng-if="row.entity.saved" />'
			}
		]
	}
	
	// Specify what happens when a cell is edited in the grid
	$scope.gridOptions.onRegisterApi = function(gridApi) {
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
			// If the row is unsaved, ensure all values are entered before saving
			if (rowEntity.unsaved == true) {
				if (rowEntity.item_id == "" || rowEntity.item_description == "") {
					$mdToast.show(
						$mdToast.simple()
							.textContent('Please enter an item ID and item description to save this item.')
							.position('bottom right')
							.hideDelay(3000)
					);
				} else {
					rowEntity.saved = false;
					InventoryService.addInventory(rowEntity)
						.then(function() {
							rowEntity.unsaved = false;
							rowEntity.saved = true;
							$timeout(function() {
								rowEntity.saved = false;
							}, 2000);
						});
				}
			// Else simply update the inventory item with a call to the Inventory service
			} else {
				rowEntity.saved = false;
				InventoryService.updateInventory(rowEntity)
					.then(function() {
						rowEntity.saved = true;
						$timeout(function() {
							rowEntity.saved = false;
						}, 2000);
					});
			}
		});
	};
	
	/**
	 * The getInventory function calls the Inventory service
	 * to retrieve a list of items and set them to the grid's data
	 */
	$scope.getInventory = function() {
		InventoryService.getInventory()
			.then(function(res) {
				$scope.gridOptions.data = res;
			});
	};

	$scope.search = function() {
		$scope.gridOptions.data = new Array();
		InventoryService.search(
			$scope.department,
			$scope.building,
			$scope.room
		).then(function(res) {
			$scope.gridOptions.data = res;
		});
	};
	
	/**
	 * The addItem function adds a new item to the grid.
	 */
	$scope.addItem = function() {
		$scope.gridOptions.data.push({item_id: '', item_description: '', item_building: 'Streibel Hall', item_location: '', saved: false, unsaved: true})
	}
	
	/**
	 * The removeInventory function takes an item and removes it from the inventory database
	 * after confirming that the user wishes to remove it.
	 * @arg item The item to be removed
	 */
	$scope.removeInventory = function(item) {
		// display a confirmation dialog
		var confirm = $mdDialog.confirm()
			.title("Are you sure you'd like to remove item " + item.barcode + "?")
			.ariaLabel("Really remove item?")
			.ok('Yes')
			.cancel('No');
		
		// check to see if the user confirmed or not, and perform the necessary action
		$mdDialog.show(confirm).then(function() {
			InventoryService.removeInventory(item)
				.then(function(res) {
					// refresh inventory
					$scope.getInventory();
				
					// display a success message to the user
					$mdToast.show(
						$mdToast.simple()
							.textContent('Item with ID ' + item.barcode + ' removed successfully.')
							.position('bottom right')
							.hideDelay(3000)
					);
				});
		}, function() {
			// cancelled removal of item.
		})
	};
	
	/**
	 * The searchTextChange function handles the display when the
	 * search text changes.
	 * @arg filterBy the filter to be applied
	 * @arg searchText the search text that the data must match
	 */
	$scope.searchTextChange = function(filterBy, searchText) {
		InventoryService.filterInventory(filterBy, searchText)
			.then(function(res) {
				$scope.gridOptions.data = res;
			})
	};

	$scope.load = function() {
		InventoryService.getDepartments().then(function(res) { $scope.departments = res; });
		InventoryService.getBuildings().then(function(res) { $scope.buildings = res; });
		InventoryService.getRooms().then(function(res) { $scope.rooms = res; });
	};
	
	// Populate our inventory data on load
	$scope.load();
	
});