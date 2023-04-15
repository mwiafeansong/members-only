const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./passport-config');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const compression = require('compression');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signUpRouter = require('./routes/sign-up');
const membershipRouter = require('./routes/membership');
const logInRouter = require('./routes/log-in');
const logoutRouter = require('./routes/logout');
const newMessageRouter = require('./routes/new-message');
const deleteMessageRouter = require('./routes/delete-message');

const mongoDB = process.env.MONGODB_URI || process.env.mongoDB_CONN_STRING;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const sessionStore = MongoStore.create({
  mongoUrl: mongoDB,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1 day
    },
  })
);

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign-up', signUpRouter);
app.use('/membership', membershipRouter);
app.use('/log-in', logInRouter);
app.use('/logout', logoutRouter);
app.use('/new-message', newMessageRouter);
app.use('/message', deleteMessageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
