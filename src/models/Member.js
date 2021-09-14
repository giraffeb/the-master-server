const { Schema, model } = require('mongoose');

const memberSchema = Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    status: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
    token: { type: String },
    admin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
memberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
memberSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// Match user entered password to hashed password in database
memberSchema.methods.matchPassword = async function (enteredPasswrd) {
  return await bcrypt.compare(enteredPasswrd, this.password);
};

const Member = model('member', memberSchema);
module.exports = { Member };
