const { Router } = require('express');
const memberRouter = Router();

const {
  getMembers,
  getMember,
  deleteMember,
  putMember,
} = require('../controllers/memberController');

const { protect } = require('../middleware/auth');

memberRouter.route('/').get(getMembers);
memberRouter.route('/:masterId').get(protect, getMember);
memberRouter.route('/:masterId').delete(protect, deleteMember);
memberRouter.route('/:masterId').put(protect, putMember);

module.exports = { memberRouter };
