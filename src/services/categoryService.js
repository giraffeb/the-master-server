const { Master } = require("../models/Master");

const findAllCategoriesByLocation = async (location)=>{
  
  //TODO: 지역내 고수들의 모든 카테고리 리스트
  const masters = await Master.find().select('category');

  return masters;
};

module.exports = {
  findAllCategoriesByLocation
};