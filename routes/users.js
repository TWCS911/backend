var express = require('express');
var router = express.Router();

const UserController = require("../controller/users.js")

/* GET users listing. */
router.post('/',UserController.signUp);
router.post('/login',UserController.login);

module.exports = router;
