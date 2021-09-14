const { Router } = require('express');
const masterRouter = Router();

const { protectmaster } = require('../middleware/auth');

const {
  loginMaster,
  registerMaster,
  getMasters,
  getMaster,
  deleteMaster,
  putMaster,
} = require('../controllers/masterController');

masterRouter.route('/').get(getMasters);
masterRouter.route('/register').post(registerMaster);
masterRouter.route('/login').post(loginMaster);
masterRouter.route('/:masterId').get(getMaster);
masterRouter.route('/:masterId').delete(protectmaster, deleteMaster);
masterRouter.route('/:masterId').put(protectmaster, putMaster);

module.exports = { masterRouter };
