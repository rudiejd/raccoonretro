require('dotenv').config({ path: './config.env' });
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const dbo = require('./db/conn')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();


app.use(cors())
app.use(express.json());
app.use(require('./routes/cards'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
});
module.exports = app;
