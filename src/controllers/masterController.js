const asyncHandler = require('express-async-handler');
const { Master } = require('../models/Master');
const { generateToken } = require('../utils/generateToken');
const config = require('../config/key');

// @desc      Get a Master
// @route     Get /
// @access    Public
const getMasters = asyncHandler(async (req, res, next) => {
  const masters = await Master.find({});

  if (!master) return { message: '마스터 정보를 불러올 수 없습니다. !!' };

  return res.json({ masters });
});

// @desc      Get a Master
// @route     Get /:masterId
// @access    Private
const getMaster = asyncHandler(async (req, res, next) => {
  const { masterId } = req.params;
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).json({ error: 'invalid masterId' });
  const master = await Master.findOne({ _id: masterId });
  return res.send({ master });
});

// @desc      Delete a Master
// @route     delete /:masterId
// @access    Private
const deleteMaster = asyncHandler(async (req, res, next) => {
  const { masterId } = req.params;
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).send({ err: 'invalid masterId' });

  const master = await Master.findOneAndDelete({ _id: masterId });
  return res.json({ master });
});

// @desc      Put a Master
// @route     put /:masterId
// @access    Private
const putMaster = asyncHandler(async (req, res, next) => {
  const { masterId } = req.params;

  // Debug
  // 1. MasterId 형식 점검
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).send({ err: 'invalid masterId' });

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

  // 2. age or name 이 존재하는지 점검
  if (!name) return res.status(400).send({ err: 'name is required' });
  if (!gender) return res.status(400).send({ err: 'gender is required' });
  if (!email) return res.status(400).send({ err: 'email is required' });
  if (!password) return res.status(400).send({ err: 'password is required' });
  if (!phone) return res.status(400).send({ err: 'phone is required' });
  if (!authentication)
    return res.status(400).send({ err: 'authentication is required' });
  if (!fromtime) return res.status(400).send({ err: 'fromtime is required' });
  if (!totime) return res.status(400).send({ err: 'totime is required' });
  if (!payment) return res.status(400).send({ err: 'payment is required' });
  if (!category) return res.status(400).send({ err: 'category is required' });
  if (!career) return res.status(400).send({ err: 'career is required' });
  if (!employeesNum)
    return res.status(400).send({ err: 'employeesNum is required' });
  if (!businessRegistration)
    return res.status(400).send({ err: 'businessRegistration is required' });
  if (!certificate)
    return res.status(400).send({ err: 'certificate is required' });
  if (!address) return res.status(400).send({ err: 'address is required' });
  if (!lat) return res.status(400).send({ err: 'lat is required' });
  if (!lng) return res.status(400).send({ err: 'lng is required' });

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
  let master = await Master.findById(masterId);
  console.log({ masterBeforeEdit: master });

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

  console.log({ masterAfterEdit: master });

  await master.save();

  return res.send({ master });
});

module.exports = { getMasters, getMaster, deleteMaster, putMaster };
