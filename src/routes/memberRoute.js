const { Router } = require('express');
const memberRouter = Router();

const { protectmember } = require('../middleware/auth');

const {
  getMembers,
  getMember,
  deleteMember,
  putMember,
  loginMember,
  registerMember,
} = require('../controllers/memberController');

memberRouter.route('/').get(getMembers);
memberRouter.route('/login').post(loginMember);
memberRouter.route('/register').post(registerMember);
memberRouter.route('/:memberId').get(getMember);
memberRouter.route('/:memberId').delete(protectmember, deleteMember);
memberRouter.route('/:memberId').put(protectmember, putMember);

module.exports = { memberRouter };
