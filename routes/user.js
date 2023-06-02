var express = require('express');
var router = express.Router();

let user_controller = require('../controllers/userController');

router.post('/login',user_controller.user_login);
router.post('/register',user_controller.user_register);
router.get('/',user_controller.user_list);
module.exports = router;
