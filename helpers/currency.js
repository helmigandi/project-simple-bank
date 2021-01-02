function idrBalance(balance) {
  return balance.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'});
}

module.exports = idrBalance;