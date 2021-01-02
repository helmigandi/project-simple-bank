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
    res.render('register');
  }

  static postRegisterCustomerHandler(req, res) {
    const { identityNumber, fullName, address, birthDate, gender } = req.body;

    Customer.create({ identityNumber, fullName, address, birthDate, gender })
      .then(() => { res.redirect('/customers') })
      .catch(errors => { res.send(errors) });
  }

  static getEditCustomerHandler(req, res) {
    const id = req.params.idCustomer;

    Customer.findOne({ where: { id } })
      .then(customerData => {
        // make birthDate: YYYY-MM-DD
        const newBirthDate = customerData.getBirthDate;
        res.render('profile', { customerData, newBirthDate })
      })
      .catch(errors => { res.send(errors) });
  }

  static postEditCustomerHandler(req, res) {
    const id = req.params.idCustomer;
    const { identityNumber, fullName, address, birthDate, gender } = req.body;

    Customer.update({ identityNumber, fullName, address, birthDate, gender },
      { where: { id } })
      .then(() => { res.redirect('/customers') })
      .catch(errors => { res.send(errors) });
  }

  static getCustomerAccountHandler(req, res) {
    const id = req.params.idCustomer;
    Customer.findOne({ where: { id }, include: Account })
      .then(customerData => {
        // console.log(JSON.stringify(customerData, null, 2));
        res.render('account', { customerData });
      })
      .catch(errors => { res.send(errors) });
  }

  static postCustomerAccountHandler(req, res) {
    const id = req.params.idCustomer;
    const { type, balance } = req.body;
    Account.create({ type, balance, CustomerId: id })
      .then(() => res.redirect(`/customers/${id}/accounts`))
      .catch(errors => { res.send(errors) });
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