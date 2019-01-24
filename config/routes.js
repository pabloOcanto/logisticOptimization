/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  /*
  Metodos de Inbox Controller
  */

  'GET /inbox':{
    controller:'InboxController',
    action:'get'
  },

  'POST /inbox':{
    controller:'InboxController',
    action:'create'
  },

  'PUT /inbox':{
    controller:'InboxController',
    action:'update'
  },

  'DELETE /inbox':{
    controller:'InboxController',
    action:'delete'
  },


  /*
    Metodos de Offices controller
  */


  'GET /offices':{
    controller:'OfficesController',
    action:'get'
  },

  'POST /offices':{
    controller:'OfficesController',
    action:'create'
  },

  'PUT /offices':{
    controller:'OfficesController',
    action:'update'
  },

  'DELETE /offices':{
    controller:'OfficesController',
    action:'delete'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
