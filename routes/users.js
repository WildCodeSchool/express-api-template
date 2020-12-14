const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const usersController = require('../controllers/users.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');

router.post('/', requireRequestBody, asyncHandler(usersController.handlePost));

module.exports = router;
