const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const entryController = require('../controllers/entry');
const validation = require('../middleware/validate');

router.get('/getAll', entryController.getAll);

router.get('/getSingle/:id', entryController.getSingle);

router.post('/createSingle', validation.saveEntry, entryController.createSingle);

router.put('/updateSingle/:id', validation.saveEntry, entryController.updateSingle);

router.delete('/deleteSingle/:id', entryController.deleteSingle);


module.exports = router;