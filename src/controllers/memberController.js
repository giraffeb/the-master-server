const { Member } = require('../models/Member');
const config = require('../config/key');
const { generateToken } = require('../utils/generateToken');
const mongoose = require('mongoose');
require('express-async-errors');

// @desc      Register Member
// @route     POST auth/register
// @access    Public
const registerMember = async (req, res, next) => {
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

  const member = await Member.create({
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
};

// @desc      Login member
// @route     POST auth/login
// @access    Public
const loginMember = async (req, res, next) => {
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
      address: member.address,
      lat: member.lat,
      lng: member.lng,
      token: generateToken(member._id),
    });
  } else {
    res
      .status(401)
      .json({ message: '멤버 로그인 정보가 정확하지 않습니다.!!' });
  }
};

// @desc      Get  Members
// @route     Get /
// @access    Public
const getMembers = async (req, res, next) => {
  const members = await Member.find({});

  if (!members) return { message: '마스터 정보를 불러올 수 없습니다. !!' };

  return res.json({ members });
};

// @desc      Get a Member
// @route     Get /:memberId
// @access    Private
const getMember = async (req, res, next) => {
  const { memberId } = req.params;
  if (!mongoose.isValidObjectId(memberId))
    return res.status(400).json({ error: 'invalid memberId' });
  const member = await Member.findOne({ _id: memberId });
  return res.send({ member });
};

// @desc      Delete a Master
// @route     delete /:masterId
// @access    Private
const deleteMember = async (req, res, next) => {
  const { memberId } = req.params;
  if (!mongoose.isValidObjectId(memberId))
    return res.status(400).send({ err: 'invalid memberId' });

  if (req.member._id.toString() === memberId) {
    const member = await Member.findOneAndDelete({ _id: memberId }).select(
      '-password -gender'
    );
    return res.json({ member });
  }
  return res.status(400).json({ message: '인증정보가 일치하지 않습니다. !!' });
};

// @desc      Put a Master
// @route     put /:masterId
// @access    Private
const putMember = async (req, res, next) => {
  const { memberId } = req.params;

  // Debug
  // 1. MasterId 형식 점검
  if (!mongoose.isValidObjectId(memberId))
    return res.status(400).send({ err: 'invalid memberId' });

  if (req.member._id.toString() === memberId) {
    const { name, gender, email, status, phone, password, address, lat, lng } =
      req.body;

    // 3. 형식 점검

    // // 5. Update Data 생성 (mongodb에서 수정과 업데이트를 동시에 진행, 장점 속도빠름 ,단점:여러정도 바꿀때 불편)
    // let updateBody = {};
    // if (age) updateBody.age = age;
    // if (name) updateBody.name = name;

    // // 6. 데이터 변경 시작
    // const user = await User.findByIdAndUpdate(
    //   // 1) 변경 대상 찾기
    //   userId,
    //   // 2) 변경 데이터 입력
    //   updateBody,
    //   // 3) 데이터를 변경후 변경된 정보를 가져오기 위해 new:true를 입력한다.
    //   { new: true }
    // );

    // 7. Update 데이터를 찾고 찾은 데이터를 바꾸는 로직. 데이터구조가 복잡할때
    let member = await Member.findById(memberId).select('-password');

    if (name) member.name = name;
    if (gender) member.gender = gender;
    if (email) member.email = email;
    if (password) member.password = password;
    if (phone) member.phone = phone;
    if (status) member.status = status;
    if (address) member.address = address;
    if (lat) member.lat = lat;
    if (lng) member.lng = lng;

    await member.save();

    return res.send({ member });
  }

  return res.status(400).json({ message: '유저 정보가 일치하지 않습니다. !!' });
};

module.exports = {
  loginMember,
  registerMember,
  getMembers,
  getMember,
  deleteMember,
  putMember,
};
