const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 保护路由：验证Token
exports.protect = async (req, res, next) => {
  let token;

  // 从请求头获取Token（格式：Bearer <token>）
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: '未授权，需登录' });
  }

  try {
    // 验证Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 将用户信息挂载到req.user
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token无效' });
  }
};