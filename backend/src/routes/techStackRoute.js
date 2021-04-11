const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/handleJwt');
const techStackController = require('../controllers/techStackController');

router.get('/available-form-dropdowns', verifyAccessToken, techStackController.getFormDropdowns);
router.get('/all-statistics', techStackController.getStatisticsInfo);
router.post('/startup-form-query', verifyAccessToken, techStackController.createFormResult);
router.post('/programming-language-info', verifyAccessToken, techStackController.createProgLangInfo);

module.exports = router;