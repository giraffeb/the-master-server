const jwt = require('jsonwebtoken');
const config = require('../config/key');
const { Member } = require('../models/Member');
const { Master } = require('../models/Master');
require('express-async-errors');

/*********************************************/
/*********** Member Protect routes ***********/
/*********************************************/
const protectmember = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    // &&
    // req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, config.jwtSecret);

      req.member = await Member.findById(decoded.id);

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).send('인증에 실패하였습니다.!!');
    }
  }
  if (!token) {
    return res.status(400).send('토큰이 필요합니다.!!');
  }
};

const adminmember = (req, res, next) => {
  if (req.member && req.member.admin) {
    next();
  } else {
    res.status(401).json({ message: '관리자 권한이 필요합니다!!' });
  }
};

/*********************************************/
/*********** Master Protect routes ***********/
/*********************************************/
const protectmaster = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    // &&
    // req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, config.jwtSecret);

      req.master = await Master.findById(decoded.id);

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).send('인증에 실패하였습니다.!!');
    }
  }
  if (!token) {
    return res.status(400).send('토큰이 필요합니다.!!');
  }
};

const adminmaster = (req, res, next) => {
  if (req.master && req.master.admin) {
    next();
  } else {
    res.status(401).json({ message: '관리자 권한이 필요합니다!!' });
  }
};

module.exports = { protectmember, adminmember, protectmaster, adminmaster };
