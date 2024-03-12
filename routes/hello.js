const routes = require('express').Router();
const indexController = require('../controllers/index');

routes.get('/', indexController.getAll);
routes.get('/:id', indexController.getSingle);
routes.post('/', indexController.createSingle);
routes.put('/:id', indexController.updateSingle);
routes.delete('/:id', indexController.deleteSingle);

module.exports = routes;