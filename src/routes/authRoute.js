const { Router } = require('express');
const authRouter = Router();

const {
  loginMaster,
  loginMember,
  registerMaster,
  registerMember,
  getProfileMaster,
  getProfileMember,
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

authRouter.route('/register/master').post(registerMaster);
authRouter.route('/register/member').post(registerMember);
authRouter.route('/login/master').post(loginMaster);
authRouter.route('/login/member').post(loginMember);
authRouter.route('/profile/master').get(protect, getProfileMaster);
authRouter.route('/profile/member').get(protect, getProfileMember);

module.exports = { authRouter };
