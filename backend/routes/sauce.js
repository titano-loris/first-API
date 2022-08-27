const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');//ajouter 'auth' (en premier!) sur toute les routes pour les authentifier d'abord
const multer = require('../middleware/multer-config');//mettre multer egalement dans les routes

const sauceCtrl = require('../controllers/sauce');

// Routes
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;