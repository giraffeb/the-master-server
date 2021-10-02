const fs = require("fs");
const config = require('./src/config/key');
const mongoose = require('mongoose');

async function start(){

  await mongoose.connect(config.mongoURI);
  
  const { ServiceCategory } = require("./src/models/base/ServiceCategory");
  
  const txt = fs.readFileSync("./categoryData.txt", "utf-8");
  
  for(let line of txt.trim().split("\r\n")){
    const [categoryCode, categoryLevel, categoryName, parentCategoryCode, categoryOrder, releaseDate] = line.split("\t");
    const data = {
      categoryCode,
      categoryLevel,
      categoryName,
      parentCategoryCode,
      categoryOrder,
      releaseDate,
    }
  
    console.log(data);
    await ServiceCategory.create(data)
  }

}

start();


