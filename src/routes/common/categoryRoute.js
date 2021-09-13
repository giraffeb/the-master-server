const express = require('express');
const categoryRoute = express.Router();

const {
    getServices
  } = require('../../controllers/common/categoryController');
  
categoryRoute.route('/servicelist').get(getServices);

module.exports = categoryRoute;