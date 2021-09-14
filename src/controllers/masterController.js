const { Master } = require('../models/Master');
const config = require('../config/key');
const { generateToken } = require('../utils/generateToken');
const mongoose = require('mongoose');

// @desc      Register Master
// @route     POST master/register
// @access    Public
const registerMaster = async (req, res, next) => {
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
};

// @desc      Login Master
// @route     POST master/login
// @access    Public
const loginMaster = async (req, res, next) => {
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
};

// @desc      Get a Master
// @route     Get /master
// @access    Public
const getMasters = async (req, res, next) => {
  const masters = await Master.find({}).select('-password');

  if (!masters) return { message: '마스터 정보를 불러올 수 없습니다. !!' };

  return res.json({ masters });
};

// @desc      Get a Master
// @route     Get /master/:masterId
// @access    Public
const getMaster = async (req, res, next) => {
  const { masterId } = req.params;
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).json({ error: 'invalid masterId' });
  const master = await Master.findOne({ _id: masterId }).select('-password');
  return res.send({ master });
};

// @desc      Delete a Master
// @route     delete /master/:masterId
// @access    Private
const deleteMaster = async (req, res, next) => {
  const { masterId } = req.params;

  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).send({ err: 'invalid masterId' });

  if (req.master._id.toString() === masterId) {
    const master = await Master.findOneAndDelete({ _id: masterId }).select(
      '-password'
    );
    return res.json({ master });
  }
  return res.status(400).json({ message: '인증정보가 정확하지 않습니다.!!' });
};

// @desc      Put a Master
// @route     put /master/:masterId
// @access    Private
const putMaster = async (req, res, next) => {
  const { masterId } = req.params;

  // Debug
  // 1. MasterId 형식 점검
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).send({ err: 'invalid masterId' });

  if (!req.master._id.toString() === masterId) {
    return res.status(400).json({ message: '인증정보가 일치하지 않습니다!!' });
  }

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
  } = req.body;

  // 3. 형식 점검
  if (typeof authentication !== 'boolean')
    return res.status(400).send({ err: 'authentication must be a boolean' });

  // 4. name.first and name.last가 존재하는지 그리고 type이 String인지 점검
  if (typeof businessRegistration !== 'boolean')
    return res
      .status(400)
      .send({ err: 'businessRegistration must be boolean' });

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
  let master = await Master.findById(masterId).select('-password');

  if (name) master.name = name;
  if (gender) master.gender = gender;
  if (email) master.email = email;
  if (password) master.password = password;
  if (phone) master.phone = phone;
  if (authentication) master.authentication = authentication;
  if (fromtime) master.fromtime = fromtime;
  if (totime) master.totime = totime;
  if (payment) master.payment = payment;
  if (category) master.category = category;
  if (career) master.career = career;
  if (employeesNum) master.employeesNum = employeesNum;
  if (businessRegistration) master.businessRegistration = businessRegistration;
  if (certificate) master.certificate = certificate;
  if (address) master.address = address;
  if (lat) master.lat = lat;
  if (lng) master.lng = lng;

  await master.save();

  return res.send({ master });
};

module.exports = {
  loginMaster,
  registerMaster,
  getMasters,
  getMaster,
  deleteMaster,
  putMaster,
};
