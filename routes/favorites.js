const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const favController = require('../controllers/favorites');
const validation = require('../middleware/validate');

router.get('/getAll', favController.getAll);

router.post('/createSingle', validation.saveEntry, favController.createSingle);

router.put('/moveToFav/:id', favController.moveToFav);

router.put('/moveFromFav/:id', favController.moveFromFav);

router.delete('/deleteSingle/:id', favController.deleteSingle);


module.exports = router;