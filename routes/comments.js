const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const commController = require('../controllers/comments');
const validation = require('../middleware/validate');

router.get('/getAll', requiresAuth(), commController.getAll);

router.post('/createSingle', requiresAuth(), validation.saveComm, commController.createSingle);

router.put('/updateSingle/:id', requiresAuth(), validation.saveComm, commController.updateSingle);

router.delete('/deleteSingle/:id', requiresAuth(), commController.deleteSingle);


module.exports = router;