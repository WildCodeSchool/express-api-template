const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');

router.post('/login', requireRequestBody, asyncHandler(authController.login));

module.exports = router;