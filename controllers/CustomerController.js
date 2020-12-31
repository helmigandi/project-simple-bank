const { Customer, Account } = require('../models');

class CustomerController {
  static getShowAllCustomerHandler(req, res) {
    Customer.findAll({
      order: [['fullName', 'ASC']]
    })
      .then(customerData => {
        res.render('customer', { customerData });
      })
      .catch(errors => { res.send(errors) });
  }

  static getRegisterCustomerHandler(req, res) {
    // TODO: GET Form untuk menambahkan data Customer
  }

  static postRegisterCustomerHandler(req, res) {
    // TODO: POST Form untuk menambahkan data Customer
  }

  static getEditCustomerHandler(req, res) {
    // TODO: GET Mengupdate data profile Customer
  }

  static postEditCustomerHandler(req, res) {
    // TODO: POST Mengupdate data profile Customer
  }

  static getCustomerAccountHandler(req, res) {
    // TODO : - GET data Account yang dibuka oleh Customer tersebut
    //        - GET Form untuk menambah Account
  }

  static postCustomerAccountHandler(req, res) {
    // TODO : POST Form untuk menambah Account
  }

  static getTransferHandler(req, res) {
    // TODO: GET form untuk transfer ke Account lain
  }
  
  static postTransferHandler(req, res){
    // TODO: POST form untuk transfer ke Account lain
  }

  // Develepment Only
  static getDeleteCustomerHandler(req, res){
    // TODO: GET delete one custmer data
  }
}

module.exports = CustomerController;