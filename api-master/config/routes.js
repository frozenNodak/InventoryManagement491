"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
  	'GET /v1/departments/:id/building' : 'DepartmentController.building',
  	'GET /v1/departments/buildings' : 'DepartmentController.buildings',

  	'GET /v1/buildings/:id/room' : 'BuildingController.room',
  	'GET /v1/buildings/rooms' : 'BuildingController.rooms',
    'GET /v1/buildings/department/:id' : 'BuildingController.department',

  	'GET /v1/rooms/:id/item' : 'RoomController.item',
  	'GET /v1/rooms/:id/item/:tid' : 'RoomController.itemTypes',
  	'GET /v1/rooms/items' : 'RoomController.items',
    'GET /v1/rooms/building/:id' : 'RoomController.building',

  	'GET /v1/itemtypes/:id/items' : 'ItemtypeController.item',

    'GET /v1/items/search/:did' : 'ItemController.search',
    'GET /v1/items/search/:did/:bid' : 'ItemController.search',
    'GET /v1/items/search/:did/:bid/:rid' : 'ItemController.search',
    'GET /v1/items/barcode/:barcode' : 'ItemController.barcode',
    'GET /v1/items/:item' : 'ItemController.findOne'
  }
};
