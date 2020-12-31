const express = require('express');
const router = express.Router();
const customerRouter = require('./customer.js');
const Controller = require('../controllers/IndexController.js');

router.get('/', Controller.getHomeHandler);
router.use('/customers', customerRouter);

module.exports = router;