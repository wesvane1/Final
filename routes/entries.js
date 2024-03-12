const routes = require('express').Router();
const entryController = require('../controllers/entries');

routes.get('/getAll', entryController.getAll);
routes.get('/getSingle/:id', entryController.getSingle);
routes.post('/createSingle', entryController.createSingle);
routes.put('/updateSingle/:id', entryController.updateSingle);
routes.delete('/deleteSingle/:id', entryController.deleteSingle);

module.exports = routes;