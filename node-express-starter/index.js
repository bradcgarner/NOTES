'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// mongoose only
const mongoose = require('mongoose');
// knex
const createKnex = require('knex');

const {DATABASE_URL, PORT, CLIENT_ORIGIN} = require('./config');

const app = express();

const router1 = require('./router1'); // <<<<< RE-NAME !!!!!
const router2 = require('./router2');

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(express.static('public'));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/endpoint1', router1);
app.use('/endpoint2', router2);

let server; // declare `server` here, then runServer assigns a value.
let knex = null;

// connect to database, then start server
// MONGO !!!!!
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
        console.error('Express failed to start');
        reject(err);
      });
    });
  });
}

// POSTGRES !!!!!
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  knex = createKnex({
    client: 'pg',
    connection: databaseUrl
  });
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => { // always
      console.log(`Your app is listening on port ${port}`);
      resolve();
    }).on('error', err => {
      closeServer();
      console.error('Express failed to start');
      reject(err);
    });
    
  });
}

// close the server, and return a promise. we'll handle the promise in integration tests.
// MONGO !!!!!
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

// POSTGRES !!!!!
function closeServer() {
  return knex.destroy();
}

if (require.main === module) { // i.e. if server.js is called directly (so indirect calls, such as testing, don't run this)
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
