const bcrypt = require("bcryptjs");
const { Schema, model } = require('mongoose');

const MasterSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    authentication: {
      type: Boolean,
      required: true,
    },
    fromtime: { type: String, required: true },
    totime: { type: String, required: true },
    payment: { type: String, required: true },
    category: { type: String, required: true },
    career: { type: String, required: true },
    employeesNum: { type: Number, required: true },
    businessRegistration: { type: Boolean, required: true },
    certificate: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    token: { type: String },
    admin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  //   timestamps: true =>모델의 CreatedAt , UpdatedAt 생성
  { timestamps: true }
);

// Encrypt password using bcrypt
MasterSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
MasterSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// Match user entered password to hashed password in database
MasterSchema.methods.matchPassword = async function (enteredPasswrd) {
  return await bcrypt.compare(enteredPasswrd, this.password);
};

const Master = model('master', MasterSchema);

module.exports = { Master };
