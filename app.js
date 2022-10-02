var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/music');

var app = express();

//https://stackoverflow.com/a/6661431/19625369
app.use(function(req, res, next) {
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
