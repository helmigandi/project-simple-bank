const express = require('express');
const app = express();
const PORT = 3000;
const indexRouter = require('./routes');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('HELLO BANK')
// });

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});