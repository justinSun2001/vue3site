var express = require('express');
var router = express.Router();

let user_controller = require('../controllers/userController');

router.post('/email',user_controller.user_email_post);
router.get('/email',user_controller.user_email_get);
module.exports = router;
