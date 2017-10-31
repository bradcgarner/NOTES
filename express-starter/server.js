'use strict';

const express = require('express');
const morgan = require('morgan');
// mongoose only
const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');

const app = express();

const router1 = require('./router1');
const router2 = require('./router2');

app.use(morgan('common')); // log the http layer

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/endpoint1', router1);
app.use('/endpoint2', router2);

let server; // declare `server` here, then runServer assigns a value.

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => { // only if mongoose
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => { // always
        console.log(`Your app is listening on port ${port}`);
        resolve();
      }).on('error', err => {
        mongoose.disconnect(); // only if mongoose
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => { // mongoose only. why no error catch here?
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) { // i.e. if server.js is called directly (so indirect calls, such as testing, don't run this)
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
