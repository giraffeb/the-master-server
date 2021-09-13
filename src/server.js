const express = require('express');
const app = express();
const config = require('./config/key');
const cookieParser = require('cookie-parser');

const {
  authRouter,
  memberRouter,
  masterRouter,
  reviewRouter,
  serviceRouter,
  commentRouter,
  blogRouter    
} = require('./routes');

const { generateFakeData } = require('../faker');

const mongoose = require('mongoose');

const server = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    mongoose.set('debug', true);
    console.log('MongoDB Connected !!');
    app.use(express.json());

    // Faker Data insert
    // 100명의 유저가 10개의 포스트를 작성하고 30개의 댓글을 입력한다.
    // await generateFakeData(100, 10, 300);

    // Router Setting
    app.use('/auth', authRouter);
    app.use('/member', memberRouter);
    app.use('/master', masterRouter);
    app.use('/blog', blogRouter);
    app.use('/blog/:blogId/comment', commentRouter);
    app.use('/service', serviceRouter);
    app.use('/service/:serviceId/review', reviewRouter);
    app.use('/common', require('./routes/common/categoryRoute'));
    app.use('/main', require('./routes/mainRoute'));

    // Server Port
    app.listen(3000, () => {
      console.log('Server listen on port 3000');
    });
  } catch (err) {
    console.log(err);
  }
};

server();
