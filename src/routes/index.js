const router = require("express").Router();

const memberRouter = require('./memberRoute');
const masterRouter = require('./masterRoute');
const serviceRouter = require('./serviceRouter');
const reviewRouter = require('./reviewRouter');
const categoryRoute = require('./common/categoryRoute');
const mainRouter = require('./mainRoute');

router.use('/member', memberRouter);
router.use('/master', masterRouter);
router.use('/service', serviceRouter);
router.use('/service/:serviceId/review', reviewRouter);
router.use('/common', categoryRoute);
router.use('/', mainRouter);

module.exports = router;