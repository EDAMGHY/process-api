const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log(`${token}`.underline.bold.red);
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   get user from token
      req.user = await User.findOne({
        where: { userId: decoded.id },
        attributes: { exclude: ['password'] },
      });
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});
module.exports = { protect };
