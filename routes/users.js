const router = require('express').Router();

const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/getAll/', requiresAuth(), userController.getAll);

router.get('/getSingle/:id', requiresAuth(), userController.getSingle);

router.post('/createSingle/', requiresAuth(), validation.saveUser, userController.createSingle);

router.put('/updateSingle/:id', requiresAuth(), validation.saveUser, userController.updateSingle);

router.delete('/deleteSingle/:id', requiresAuth(), userController.deleteSingle);

module.exports = router;