const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');
const debug = require('debug');
const Mongoose = require('mongoose');

const conversation = require('./api/conversation');

const app = express();

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/api/conversation', conversation);

app.post('/*', (req, res) => {
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


const startMongoose = () => {
  //const mongoUri = 'mongodb://admin:admin@ds011872.mlab.com:11872/scavenger';
  const mongoUri = process.env.MONGODB_URI;
  const loggableMongoUri = mongoUri.substring(mongoUri.indexOf('@') + 1);

  Mongoose.connect(mongoUri, {
  });

  Mongoose.connection.on('open', () => {
    console.log(`Connected API to ${loggableMongoUri}`);
  });

  Mongoose.connection.on('error', (err) => {
    console.log(`Connection error ${err} for API to ${loggableMongoUri}`);
  });

  Mongoose.connection.on('close', () => {
    console.log(`Connection closed for API to ${loggableMongoUri}`);
  });

  Mongoose.connection.on('reconnected', () => {
    console.log(`Reconnected for API to ${loggableMongoUri}`);
  });

  Mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected for API from ${loggableMongoUri}`);
  });
};

startMongoose();