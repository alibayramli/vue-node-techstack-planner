const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/handleJwt');
const startupController = require('../controllers/startupController');

router.get('/user-startups', verifyAccessToken, startupController.getStartups);
router.post('/new-startup', verifyAccessToken, startupController.createStartup);
router.patch('/edit-startup/:startupId', verifyAccessToken, startupController.editStartup);
router.delete('/delete-startup/:startupId', verifyAccessToken, startupController.deleteStartup);

module.exports = router;