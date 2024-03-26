const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const commController = require('../controllers/comments');
const validation = require('../middleware/validate');

router.get('/getAll', commController.getAll);

router.post('/createSingle', validation.saveComm, commController.createSingle);

router.put('/updateSingle/:id', validation.saveComm, commController.updateSingle);

router.delete('/deleteSingle/:id', commController.deleteSingle);


module.exports = router;