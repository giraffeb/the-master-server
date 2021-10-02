const { Master } = require("../models/Master");

const findAllMastersByLocation = async (location, options)=>{
  
  //TODO: 지역별 고수 리스트 출력
  //option 평점 등
};

const findAllMastersByLocationAndCategory = async (location, category, options)=>{

  //TODO: 지역과 카테고리에 속하는 모든 마스터 리스트 출력
  //option 평점 등
}



module.exports = {
  findAllMastersByLocationAndCategory
};