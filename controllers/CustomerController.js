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
    const idCustomer = req.params.idCustomer;
    const idAccount = req.params.idAccount;
    let accountDataFromOneCustomer;
    let errorMessages = [];

    if (req.query.errorMessages) {
      errorMessages = req.query.errorMessages.split(',');
    }
    Account.findOne({ where: { id: idAccount } })
      .then(accountData => {
        accountDataFromOneCustomer = accountData;
        return Account.findAll({
          order: [['accountNumber', 'ASC']],
          include: Customer
        })
      })
      .then(allAccountData => {
        // Add exception: User cannot send to same account
        // So, make new array for account without the same account
        let filterAllAccountData = [];
        allAccountData.forEach(accountData => {
          if (accountData.id !== accountDataFromOneCustomer.id) {
            filterAllAccountData.push(accountData);
          }
        });
        res.render('transfer', {
          accountDataFromOneCustomer,
          errorMessages,
          idCustomer,
          filterAllAccountData,
          idrBalance
        });
      })
      .catch(errorData => { res.send(errorData) });
  }

  static postTransferHandler(req, res) {
    const idCustomer = req.params.idCustomer;
    const idTransferFrom = req.params.idAccount;
    const idTransferTo = req.body.idTransferTo;
    const amount = Number(req.body.amount);

    Account.findOne({ where: { id: idTransferFrom } })
      .then(accountDataTransferFrom => {
        accountDataTransferFrom.balance = accountDataTransferFrom.balance - amount;
        return accountDataTransferFrom.update({ balance: accountDataTransferFrom.balance }, {
          where: {
            id: accountDataTransferFrom.id
          }
        })
      })
      .then(() => {
        return Account.findOne({ where: { id: idTransferTo } })
      })
      .then(accountDataTransferTo => {
        accountDataTransferTo.balance = accountDataTransferTo.balance + amount;
        return accountDataTransferTo.update({ balance: accountDataTransferTo.balance }, {
          where: {
            id: accountDataTransferTo.id
          }
        })
      })
      .then(() => {
        res.redirect(`/customers/${idCustomer}/accounts/`);
      })
      .catch(errorData => {
        let errorMessages = [];
        // Check Error from Hooks or Validation
        if (errorData.errors) { // Error From Validation
          errorMessages = errorData.errors.map(err => {
            return err.message;
          });
        } else { // Error From Hooks
          errorMessages.push(errorData.message)
        }
        res.redirect(`/customers/${idCustomer}/accounts/${idTransferFrom}/transfer?errorMessages=${errorMessages}`);
      });
  }

  // Develepment Only
  static getDeleteCustomerHandler(req, res) {
    // TODO: GET delete one custmer data
  }
}

module.exports = CustomerController;