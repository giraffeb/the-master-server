const faker = require("faker");
const fs = require("fs");
const config = require('./src/config/key');
const mongoose = require('mongoose');

const start = async ()=>{
  
  await mongoose.connect(config.mongoURI);
  
  const { Master } = require("./src/models/Master")

  for(let index=0;index<10;index++){
    await Master.create({
      name: faker.name.findName(),
      gender: faker.name.gender(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      authentication: true,
      fromtime: new Date(),
      totime:  new Date(),
      payment: false,
      category: "110101",
      career: "경력 항목",
      employeesNum: 3,
      businessRegistration: true,
      certificate: true,
      address: "서울시",
      lat: 37.56385,
      lng: 126.98188,
      token: "토큰",
      admin: false
    })
  }

};

start();