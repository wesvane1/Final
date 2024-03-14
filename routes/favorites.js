const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const favController = require('../controllers/favorites');
const validation = require('../middleware/validate');

router.get('/getAll', requiresAuth(), favController.getAll);

router.post('/createSingle', requiresAuth(), validation.saveEntry, favController.createSingle);

router.put('/moveToFav/:id', requiresAuth(), favController.moveToFav);

router.put('/moveFromFav/:id', requiresAuth(), favController.moveFromFav);

router.delete('/deleteSingle/:id', requiresAuth(), favController.deleteSingle);


module.exports = router;