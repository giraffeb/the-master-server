// 이번 강의에서 하단에 있는 코드로 가짜 데이터를 생성할거에요. faker라는 모듈을 사용할겁니다.
// 루트 경로(packege.json이 있는 곳)에 faker.js를 생성해주시고 아래 코드를 복사해서 삽입해주세요.
// 그리고 npm i faker로 faker를 꼭 설치해주세요.

const faker = require('faker');
const { User, Blog, Comment, Review } = require('./src/models');

const cList = [
  "너무 친절하게 설명해주시고 청소 상태도 백퍼센트 만족합니다!",
  "정말 꼼꼼하게 신경써서 잘해주세요! 청소 중에 다시 요청하는 부분은 다시 꼼꼼하게 해주시고, 청소하시면서 설명도 친절하게 해주시더라구요 :) 시간이 촉박했는데도 꼼꼼히 잘해주시더라구요!! 이후 어떻게 관리해야되는지도 설명해주셔서 너무 좋았어요~~ 다음에도 청소해야되면 이용하고싶어요 ",
  "꼼꼼하게 정말잘해주시네요 집에먼지가 너무 많아 엄두가 안났는데 정성껏해주셔서 진심으로 감사해요!!!!",
  "너무 깔끔하게 해주셔서 이사할 때마다 요청드려요!",
  "곰팡이가 엄청 많았는데 깨끗하게 지워졌어요ㅎ\n" + 
  "사장님께서도 너무 친절하셔서 청소시간 기다리며 즐거웠습니다~~"
]

const mList = [
  "6139f616d64fa882f3e9bf70",
  "6139f616d64fa882f3e9bf6f",
  "6139f616d64fa882f3e9bf80",
  "6139f616d64fa882f3e9bfbf",
  "6139f616d64fa882f3e9bfc8"
]

generateFakeData = async (reviewCount) => {
  try {
    const reviews = [];
    var j = 0;
    
    for (let i = 0; i < reviewCount + 4; i++) {
      reviews.push(
        new Review({
          masterID: "613b88d5a14834b5670e3c14",
          saleID: faker.internet.userName() + parseInt(Math.random() * 100),
          memberID: mList[j],
          content: cList[j],
          score: i
        })
      );
        j++;
      if (j>4) j = 0;
    }

    console.log('reviews', reviews);

    await Review.insertMany(reviews);
    console.log('fake data inserting to database...');
  } catch (err) {
    console.log(err);
  }

  /*
  if (typeof userCount !== 'number' || userCount < 1)
    throw new Error('userCount must be a positive integer');
  if (typeof blogsPerUser !== 'number' || blogsPerUser < 1)
    throw new Error('blogsPerUser must be a positive integer');
  if (typeof commentsPerUser !== 'number' || commentsPerUser < 1)
    throw new Error('commentsPerUser must be a positive integer');
  const users = [];
  const blogs = [];
  const comments = [];
  console.log('Preparing fake data.');

  for (let i = 0; i < userCount; i++) {
    users.push(
      new User({
        username: faker.internet.userName() + parseInt(Math.random() * 100),
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
        age: 10 + parseInt(Math.random() * 50),
        email: faker.internet.email(),
      })
    );
  }

  users.map(async (user) => {
    for (let i = 0; i < blogsPerUser; i++) {
      blogs.push(
        new Blog({
          title: faker.lorem.words(),
          content: faker.lorem.paragraphs(),
          islive: true,
          user,
        })
      );
    }
  });

  users.map((user) => {
    for (let i = 0; i < commentsPerUser; i++) {
      let index = Math.floor(Math.random() * blogs.length);
      comments.push(
        new Comment({
          content: faker.lorem.sentence(),
          user,
          blog: blogs[index]._id,
        })
      );
    }
  });

  console.log('fake data inserting to database...');
  await User.insertMany(users);
  console.log(`${users.length} fake users generated!`);
  await Blog.insertMany(blogs);
  console.log(`${blogs.length} fake blogs generated!`);
  await Comment.insertMany(comments);
  console.log(`${comments.length} fake comments generated!`);
  console.log('COMPLETE!!');
  */
};

module.exports = { generateFakeData };
