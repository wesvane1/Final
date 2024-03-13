const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const entryController = require('../controllers/users');
// const validation = require('../middleware/validate');

router.get('/getAll', requiresAuth(), entryController.getAll);

router.get('/getSingle/:id', requiresAuth(), entryController.getSingle);

router.post('/createSingle', requiresAuth(), entryController.createSingle);

router.put('/updateSingle/:id', requiresAuth(), entryController.updateSingle);

router.delete('/deleteSingle/:id', requiresAuth(), entryController.deleteSingle);


module.exports = router;