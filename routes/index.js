const routes = require('express').Router();
const indexController = require('../controllers/index');
 
routes.get('/', indexController.helloRoute);
routes.get('/hi', indexController.hiRoute);

module.exports = routes;