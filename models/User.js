const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '请输入用户名'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, '请输入邮箱'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, '请输入有效的邮箱']
  },
  password: {
    type: String,
    required: [true, '请输入密码'],
    minlength: [6, '密码至少6位'],
    select: false  // 查询时默认不返回密码
  }
}, { timestamps: true });

// 密码加密（保存前执行）
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // 加密密码
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 验证密码（实例方法）
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;