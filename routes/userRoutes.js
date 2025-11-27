const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// 注册
router.post('/register', registerUser);
// 登录
router.post('/login', loginUser);

module.exports = router;