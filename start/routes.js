'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/users', 'UserController.store').validator('User/store')
Route.post('/sessions', 'SessionController.store').validator('session')

Route.group(() => {
  Route.put('/users/:id', 'UserController.update').validator('User/update')
  Route.get('/meetups', 'MeetupController.index')
  Route.post('/meetups', 'MeetupController.store').validator('Meetup/store')
  Route.get('/meetups/:id', 'MeetupController.show')
  Route.post('/meetups/:id/subscribe', 'SubscribeMeetupController.store')
  Route.get('/files/:id', 'FileController.show')
  Route.post('/files', 'FileController.store').validator('File/store')
}).middleware(['auth'])
