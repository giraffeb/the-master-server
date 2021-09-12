const { Router } = require('express');
const masterRouter = Router();

const {
  getMasters,
  getMaster,
  deleteMaster,
  putMaster,
} = require('../controllers/masterController');

const { protect } = require('../middleware/auth');

masterRouter.route('/').get(getMasters);
masterRouter.route('/:masterId').get(protect, getMaster);
masterRouter.route('/:masterId').delete(protect, deleteMaster);
masterRouter.route('/:masterId').put(protect, putMaster);

module.exports = { masterRouter };
