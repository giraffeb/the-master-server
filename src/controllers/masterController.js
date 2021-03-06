const asyncHandler = require("express-async-handler");
const { Master } = require("../models/Master");
const { generateToken } = require("../utils/generateToken");
const config = require("../config/key");
const { Review } = require("../models");

// @desc      Get a Master
// @route     Get /
// @access    Public
const getMasters = asyncHandler(async (req, res, next) => {
  try {

    var list = await Master.aggregate([
      { $lookup:
          {
             from: "reviews",
             foreignField: "masterID",          // field in the servicecategories collection
             localField: "_id",            // field in the QuotStep collection
             as: "review",                   
          }
          //$group: {_id: "$$review.masterID", avg_score:{$avg: "$$review.score"}}
      },
      { $unwind: { path: "$review", preserveNullAndEmptyArrays: true }
      },
      {$project: {_id:1, score: "$review.score", updatedAt: "$review.updatedAt"}}      
      /*, 
      { $group: {
        _id: "$_id", avg_score: {$avg: "$score"}
      }}
      */
      /*, 
      { $group: {
        _id: "$review.masterID", avg_score: {$avg: "$review.score"}
      }}*/
    ]);

    /*
    var list = await Review.aggregate([
      {$group: {_id: "$masterID", avg_score:{$avg: "$score"}, total:{$sum:1}}},
      {$unwind: {
        path: "$_id"
      }},
      {$lookup:
          {
             from: "masters",
             foreignField: "_id",          // field in the servicecategories collection
             localField: "_id",            // field in the QuotStep collection
             as: "master",                   
          }
      },
      {$unwind: {
        path: "$master"
      }},
      {$sort: {total: -1}}
    ]);
   */

    console.log('list', list.length);
    return res.json({ list });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({ list });
  }
});

// @desc      Get a Master
// @route     Get /:masterId
// @access    Private
const getMaster = asyncHandler(async (req, res, next) => {
  const { masterId } = req.params;
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).json({ error: "invalid masterId" });
  const master = await Master.findOne({ _id: masterId });
  return res.send({ master });
});

// @desc      Delete a Master
// @route     delete /:masterId
// @access    Private
const deleteMaster = asyncHandler(async (req, res, next) => {
  const { masterId } = req.params;
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).send({ err: "invalid masterId" });

  const master = await Master.findOneAndDelete({ _id: masterId });
  return res.json({ master });
});

// @desc      Put a Master
// @route     put /:masterId
// @access    Private
const putMaster = asyncHandler(async (req, res, next) => {
  const { masterId } = req.params;

  // Debug
  // 1. MasterId ?????? ??????
  if (!mongoose.isValidObjectId(masterId))
    return res.status(400).send({ err: "invalid masterId" });

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

  // 2. age or name ??? ??????????????? ??????
  if (!name) return res.status(400).send({ err: "name is required" });
  if (!gender) return res.status(400).send({ err: "gender is required" });
  if (!email) return res.status(400).send({ err: "email is required" });
  if (!password) return res.status(400).send({ err: "password is required" });
  if (!phone) return res.status(400).send({ err: "phone is required" });
  if (!authentication)
    return res.status(400).send({ err: "authentication is required" });
  if (!fromtime) return res.status(400).send({ err: "fromtime is required" });
  if (!totime) return res.status(400).send({ err: "totime is required" });
  if (!payment) return res.status(400).send({ err: "payment is required" });
  if (!category) return res.status(400).send({ err: "category is required" });
  if (!career) return res.status(400).send({ err: "career is required" });
  if (!employeesNum)
    return res.status(400).send({ err: "employeesNum is required" });
  if (!businessRegistration)
    return res.status(400).send({ err: "businessRegistration is required" });
  if (!certificate)
    return res.status(400).send({ err: "certificate is required" });
  if (!address) return res.status(400).send({ err: "address is required" });
  if (!lat) return res.status(400).send({ err: "lat is required" });
  if (!lng) return res.status(400).send({ err: "lng is required" });

  // 3. ?????? ??????
  if (typeof authentication !== "boolean")
    return res.status(400).send({ err: "authentication must be a boolean" });

  // 4. name.first and name.last??? ??????????????? ????????? type??? String?????? ??????
  if (typeof businessRegistration !== "boolean")
    return res
      .status(400)
      .send({ err: "businessRegistration must be boolean" });

  // // 5. Update Data ?????? (mongodb?????? ????????? ??????????????? ????????? ??????, ?????? ???????????? ,??????:???????????? ????????? ??????)
  // let updateBody = {};
  // if (age) updateBody.age = age;
  // if (name) updateBody.name = name;

  // // 6. ????????? ?????? ??????
  // const user = await User.findByIdAndUpdate(
  //   // 1) ?????? ?????? ??????
  //   userId,
  //   // 2) ?????? ????????? ??????
  //   updateBody,
  //   // 3) ???????????? ????????? ????????? ????????? ???????????? ?????? new:true??? ????????????.
  //   { new: true }
  // );

  // 7. Update ???????????? ?????? ?????? ???????????? ????????? ??????. ?????????????????? ????????????
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
