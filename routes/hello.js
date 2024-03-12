const routes = require('express').Router();
const indexController = require('../controllers/index');

routes.get('/', indexController.getAll);
routes.get('/:id', indexController.getSingle);

module.exports = routes;