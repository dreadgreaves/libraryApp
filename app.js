var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(app.router);
routes.initialize(app);
*/

//app.use('/', indexRouter);
app.use('/', booksRouter);

// catch 404 

app.use((req, res, next) => {
  console.log("404 handler called")
  res.status(404).render('page-not-found')
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log("GLOBAL ERROR @@@@@@@@@@@@@@@@@@@@@@@@@@@")
  res.render('error',{ message: 'An error has occurred on the server', error : err});
});

/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error: res.locals.error});
});
*/
module.exports = app;