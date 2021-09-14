const express = require('express');
const { Master } = require('../models');
const { ServiceCategory } = require('../models/base/ServiceCategory');
const categoryRoute = express.Router();

categoryRoute.get('/', async (req, res) => {
  console.log('call main');

  try {
    if (typeof req.body['limit'] === 'string') {
      var dataLength = Number(req.body['limit']);
    } else {
      var dataLength = 7;
    }

    console.log('dataLength', dataLength);

    var list = await Master.aggregate([
      { $group: { _id: '$category', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: dataLength },
      {
        $lookup: {
          from: 'servicecategories',
          foreignField: 'categoryCode', // field in the servicecategories collection
          localField: '_id', // field in the QuotStep collection
          as: 'category',
        },
      },
    ]);

    var newList = await ServiceCategory.aggregate([
      { $sort: { releaseDate: -1, categoryName: 1 } },
      { $limit: dataLength },
    ]);

    return res.status(200).json({
      popular: list,
      newList: newList,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({ err: err.message });
  }
});

module.exports = categoryRoute;
