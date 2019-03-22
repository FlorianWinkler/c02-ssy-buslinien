const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const index = require('./routes/index');
// const part_tickets = require('./routes/part-tickets');
const tickets = require('./routes/tickets');
const kmpreis = require('./routes/kmpreis');
const fahrt = require('./routes/fahrt');


// Generic application setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', index);
app.use('/tickets', tickets);
app.use('/kmpreis', kmpreis);
app.use('/fahrt', fahrt);

// for (let linie of ['Gelbe-Linie', 'Blaue-Linie', 'Rote-Linie', 'Orange-Linie']) {
//   app.use('/linientickets/'+linie, part_tickets(linie));
// }


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.send('Not found');
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.stack);
  res.send(err.stack);
});

module.exports = app;
