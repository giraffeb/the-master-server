const express = require('express');
const categoryRoute = express.Router();

const { ServiceCategory } = require("../../models/base/ServiceCategory");

// @desc      Get a Master
// @route     Get /
// @access    Public
categoryRoute.get('/servicelist', async (req, res, next) => {
  var list = await ServiceCategory.find().sort('categoryOrder');

  if (!list) return { message: '마스터 정보를 불러올 수 없습니다. !!' };

  return res.status(500).json({
      servicelist: list
  });
});

module.exports = categoryRoute;