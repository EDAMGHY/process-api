const { User } = require('../models');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = asyncHandler(async (req, res) => {
  const { username, lastName, firstName, password } = req.body;
  if (!username || !lastName || !firstName || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //   check if user exists
  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }
  if (password && password.length > 6) {
    res.status(400);
    throw new Error("Password souldn't be greater than 6 charatcters !");
  }
  if (username && /\s/.test(username)) {
    res.status(400);
    throw new Error("Username shouldn't have any whitespace!");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //   create the user
  const user = await User.create({
    username,
    lastName,
    firstName,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      user,
      token: generateToken(user.userId),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && user.status === 0) {
    res.status(400);
    throw new Error('You dont have permission to login!');
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      user,
      token: generateToken(user.userId),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials!');
  }
});

// generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { login, register, getMe };
