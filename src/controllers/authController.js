const asyncHandler = require('express-async-handler');
const { Member } = require('../models/Member');
const { Master } = require('../models/Master');
const { generateToken } = require('../utils/generateToken');
const config = require('../config/key');

// @desc      Register Member
// @route     POST auth/register
// @access    Public
const registerMember = asyncHandler(async (req, res, next) => {
  const {
    name,
    gender,
    email,
    status,
    phone,
    password,
    address,
    token,
    lat,
    lng,
  } = req.body;

  const memberExists = await Member.findOne({ email });

  if (memberExists) {
    return res.status(400).send('유저가 존재합니다. !!');
  }

  const member = await User.create({
    name,
    gender,
    email,
    status,
    phone,
    password,
    address,
    token,
    lat,
    lng,
  });

  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      gender: member.gender,
      email: member.email,
      status: member.status,
      phone: member.phone,
      password: member.password,
      address: member.address,
      lat: member.lat,
      lng: member.lng,
      token: generateToken(member._id),
    });
  } else {
    return res.status(400).json({ message: '멤버가 존재하지 않습니다.!!' });
  }
});

// @desc      Login member
// @route     POST auth/login
// @access    Public
const loginMember = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const member = await Member.findOne({ email }).select('+password');

  if (member && (await member.matchPassword(password))) {
    res.json({
      _id: member._id,
      name: member.name,
      gender: member.gender,
      email: member.email,
      status: member.status,
      phone: member.phone,
      password: member.password,
      address: member.address,
      lat: member.lat,
      lng: member.lng,
      token: generateToken(member._id),
    });
  } else {
    res.status(401).send('멤버 로그인 정보가 정확하지 않습니다.!!');
  }
});

// @desc      Get current logged in member
// @route     Get auth/member/me
// @access    Private
const getProfileMember = asyncHandler(async (req, res, next) => {
  const member = await Member.findById(req.member.id);

  if (member) {
    res.json({
      _id: member._id,
      name: member.name,
      gender: member.gender,
      email: member.email,
      status: member.status,
      phone: member.phone,
      password: member.password,
      address: member.address,
      lat: member.lat,
      lng: member.lng,
    });
  } else {
    return res.status(404).send('유저를 찾을 수 없습니다 !!');
  }
});

// @desc      Register Master
// @route     POST master/register
// @access    Public
const registerMaster = asyncHandler(async (req, res, next) => {
  const {
    name,
    gender,
    email,
    password,
    phone,
    authentication,
    fromtime,
    totime,
    payment,
    category,
    career,
    employeesNum,
    businessRegistration,
    certificate,
    address,
    lat,
    lng,
    token,
  } = req.body;

  const masterExists = await Master.findOne({ email });

  if (masterExists) {
    res.status(400).json({ message: '유저가 존재합니다.!!' });
  }

  const master = await Master.create({
    name,
    gender,
    email,
    password,
    phone,
    authentication,
    fromtime,
    totime,
    payment,
    category,
    career,
    employeesNum,
    businessRegistration,
    certificate,
    address,
    lat,
    lng,
    token,
  });

  if (master) {
    res.status(201).json({
      _id: master._id,
      name: master.name,
      gender: master.gender,
      email: master.email,
      password: master.password,
      phone: master.phone,
      authentication: master.authentication,
      fromtime: master.fromtime,
      totime: master.totime,
      payment: master.payment,
      category: master.category,
      career: master.career,
      employeesNum: master.employeesNum,
      businessRegistration: master.businessRegistration,
      certificate: master.certificate,
      address: master.address,
      lat: master.lat,
      lng: master.lng,
      token: generateToken(master._id),
    });
  } else {
    return res.status(400).json({ message: '마스터 정보가 없습니다.!!' });
  }
});

// @desc      Login Master
// @route     POST master/login
// @access    Public
const loginMaster = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const master = await Master.findOne({ email }).select('+password');

  if (master && (await master.matchPassword(password))) {
    res.json({
      _id: master._id,
      name: master.name,
      gender: master.gender,
      email: master.email,
      phone: master.phone,
      authentication: master.authentication,
      fromtime: master.fromtime,
      totime: master.totime,
      payment: master.payment,
      category: master.category,
      career: master.career,
      employeesNum: master.employeesNum,
      businessRegistration: master.businessRegistration,
      certificate: master.certificate,
      address: master.address,
      lat: master.lat,
      lng: master.lng,
      token: generateToken(master._id),
    });
  } else {
    res.status(401).send('로그인 정보가 정확하지 않습니다.!!');
  }
});

// @desc      Get current logged in user
// @route     Get auth/me
// @access    Private
const getProfileMaster = asyncHandler(async (req, res, next) => {
  const master = await Master.findById(req.master.id);

  if (user) {
    res.json({
      _id: master._id,
      name: master.name,
      gender: master.gender,
      email: master.email,
      phone: master.phone,
      authentication: master.authentication,
      fromtime: master.fromtime,
      totime: master.totime,
      payment: master.payment,
      category: master.category,
      career: master.career,
      employeesNum: master.employeesNum,
      businessRegistration: master.businessRegistration,
      certificate: master.certificate,
      address: master.address,
      lat: master.lat,
      lng: master.lng,
      token: generateToken(master._id),
    });
  } else {
    return res.status(404).send('마스터를 찾을 수 없습니다 !!');
  }
});

module.exports = {
  loginMember,
  loginMaster,
  registerMember,
  registerMaster,
  getProfileMember,
  getProfileMaster,
};
