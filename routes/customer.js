const express = require('express');
const router = express.Router();
const Controller = require('../controllers/CustomerController.js');

router.get('/', Controller.getShowAllCustomerHandler);
router.get('/register', Controller.getRegisterCustomerHandler);
router.get('/:idCustomer/editProfile', Controller.getEditCustomerHandler);
router.get('/:idCustomer/accounts', Controller.getCustomerAccountHandler);
router.get('/:idCustomer/accounts/:idAccount/transfer', Controller.getTransferHandler);

router.post('/register', Controller.postRegisterCustomerHandler);
router.post('/:idCustomer/editProfile', Controller.postEditCustomerHandler);
router.post('/:idCustomer/accounts', Controller.postCustomerAccountHandler);
router.post('/:idCustomer/accounts/:idAccount/transfer', Controller.postTransferHandler);

module.exports = router;