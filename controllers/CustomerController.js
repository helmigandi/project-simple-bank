const { Customer, Account } = require('../models');
const idrBalance = require('../helpers/currency.js');

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
    let errorMessages = [];
    if (req.query.errorMessages) {
      errorMessages = req.query.errorMessages.split(',');
    }
    res.render('register', { errorMessages });
  }

  static postRegisterCustomerHandler(req, res) {
    const { identityNumber, fullName, address, birthDate, gender } = req.body;

    Customer.create({ identityNumber, fullName, address, birthDate, gender })
      .then(() => { res.redirect('/customers') })
      .catch(errorData => {
        const errorMessages = errorData.errors.map(err => {
          return err.message;
        });
        res.redirect(`/customers/register?errorMessages=${errorMessages}`);
      });
  }

  static getEditCustomerHandler(req, res) {
    const id = req.params.idCustomer;
    let errorMessages = [];
    if (req.query.errorMessages) {
      errorMessages = req.query.errorMessages.split(',');
    }

    Customer.findOne({ where: { id } })
      .then(customerData => {
        // make birthDate: YYYY-MM-DD
        const newBirthDate = customerData.getBirthDate;
        res.render('profile', { customerData, newBirthDate, errorMessages })
      })
      .catch(errors => { res.send(errors) });
  }

  static postEditCustomerHandler(req, res) {
    const id = req.params.idCustomer;
    const { identityNumber, fullName, address, birthDate, gender } = req.body;

    Customer.update({ id, identityNumber, fullName, address, birthDate, gender },
      { where: { id } })
      .then(() => { res.redirect('/customers') })
      .catch(errorData => {
        const errorMessages = errorData.errors.map(err => {
          return err.message;
        });
        res.redirect(`/customers/${id}/editProfile?errorMessages=${errorMessages}`);
      });
  }

  static getCustomerAccountHandler(req, res) {
    const id = req.params.idCustomer;
    let errorMessages = [];
    if (req.query.errorMessages) {
      errorMessages = req.query.errorMessages.split(',');
    }

    Customer.findOne({ where: { id }, include: Account })
      .then(customerData => {
        res.render('account', { customerData, errorMessages, idrBalance });
      })
      .catch(errors => { res.send(errors) });
  }

  static postCustomerAccountHandler(req, res) {
    const id = req.params.idCustomer;
    const { type, balance } = req.body;
    Account.create({ type, balance, CustomerId: id })
      .then(() => res.redirect(`/customers/${id}/accounts`))
      .catch(errorData => {
        const errorMessages = errorData.errors.map(err => {
          return err.message;
        });
        res.redirect(`/customers/${id}/accounts?errorMessages=${errorMessages}`);
      });
  }

  static getTransferHandler(req, res) {
    // TODO: GET form untuk transfer ke Account lain
  }

  static postTransferHandler(req, res) {
    // TODO: POST form untuk transfer ke Account lain
  }

  // Develepment Only
  static getDeleteCustomerHandler(req, res) {
    // TODO: GET delete one custmer data
  }
}

module.exports = CustomerController;