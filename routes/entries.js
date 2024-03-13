const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const entryController = require('../controllers/entry');
const validation = require('../middleware/validate');

router.get('/getAll', requiresAuth(), entryController.getAll);

router.get('/getSingle/:id', requiresAuth(), entryController.getSingle);

router.post('/createSingle', requiresAuth(), validation.saveEntry, entryController.createSingle);

router.put('/updateSingle/:id', requiresAuth(), validation.saveEntry, entryController.updateSingle);

router.delete('/deleteSingle/:id', requiresAuth(), entryController.deleteSingle);


module.exports = router;