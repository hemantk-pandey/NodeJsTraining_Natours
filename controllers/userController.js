const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res
    .status(200)
    .json({ status: 'Success', result: users.length, data: { users: users } });
});

exports.createUser = (req, res) => {
  res.status(500).json({ status: 'Error', message: 'Not yet defined' });
};

exports.getUser = (req, res) => {
  res.status(500).json({ status: 'Error', message: 'Not yet defined' });
};

exports.updateUser = (req, res) => {
  res.status(500).json({ status: 'Error', message: 'Not yet defined' });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({ status: 'Error', message: 'Not yet defined' });
};
