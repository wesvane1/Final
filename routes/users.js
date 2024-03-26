const router = require('express').Router();

const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/getAll/', userController.getAll);

router.get('/getSingle/:id', userController.getSingle);

router.post('/createSingle/', validation.saveUser, userController.createSingle);

router.put('/updateSingle/:id', validation.saveUser, userController.updateSingle);

router.delete('/deleteSingle/:id', userController.deleteSingle);

module.exports = router;