const asyncHandler = require('express-async-handler');
const { Member } = require('../models/Member');
const { generateToken } = require('../utils/generateToken');
const config = require('../config/key');

// @desc      Get  Members
// @route     Get /
// @access    Public
const getMembers = asyncHandler(async (req, res, next) => {
  const members = await Member.find({});

  if (!members) return { message: '마스터 정보를 불러올 수 없습니다. !!' };

  return res.json({ members });
});

// @desc      Get a Member
// @route     Get /:memberId
// @access    Private
const getMember = asyncHandler(async (req, res, next) => {
  const { memberId } = req.params;
  if (!mongoose.isValidObjectId(memberId))
    return res.status(400).json({ error: 'invalid memberId' });
  const member = await Member.findOne({ _id: memberId });
  return res.send({ member });
});

// @desc      Delete a Master
// @route     delete /:masterId
// @access    Private
const deleteMember = asyncHandler(async (req, res, next) => {
  const { memberId } = req.params;
  if (!mongoose.isValidObjectId(memberId))
    return res.status(400).send({ err: 'invalid memberId' });

  const member = await Member.findOneAndDelete({ _id: memberId });
  return res.json({ member });
});

// @desc      Put a Master
// @route     put /:masterId
// @access    Private
const putMember = asyncHandler(async (req, res, next) => {
  const { masterId } = req.params;

  // Debug
  // 1. MasterId 형식 점검
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).send({ err: 'invalid masterId' });

  const { name, gender, email, status, phone, password, address, lat, lng } =
    req.body;

  // 2. age or name 이 존재하는지 점검
  if (!name) return res.status(400).send({ err: 'name is required' });
  if (!gender) return res.status(400).send({ err: 'gender is required' });
  if (!email) return res.status(400).send({ err: 'email is required' });
  if (!password) return res.status(400).send({ err: 'password is required' });
  if (!phone) return res.status(400).send({ err: 'phone is required' });
  if (!status) return res.status(400).send({ err: 'status is required' });
  if (!address) return res.status(400).send({ err: 'address is required' });
  if (!lat) return res.status(400).send({ err: 'lat is required' });
  if (!lng) return res.status(400).send({ err: 'lng is required' });

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
  let master = await Master.findById(masterId);
  console.log({ memberBeforeEdit: member });

  if (name) member.name = name;
  if (gender) member.gender = gender;
  if (email) member.email = email;
  if (password) member.password = password;
  if (phone) member.phone = phone;
  if (status) member.status = status;
  if (address) member.address = address;
  if (lat) member.lat = lat;
  if (lng) member.lng = lng;

  console.log({ memberAfterEdit: member });

  await member.save();

  return res.send({ member });
});

module.exports = { getMembers, getMember, deleteMember, putMember };
