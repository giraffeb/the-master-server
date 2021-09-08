const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: { type: String, required: true },
    password: {
      type: String,
      require: true,
    },
  },
  //   timestamps: true =>모델의 CreatedAt , UpdatedAt 생성
  { timestamps: true }
);

Drow.io;

const User = model('user', UserSchema);

module.exports = { User };
