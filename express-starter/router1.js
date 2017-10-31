'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {theModel} = require('./models');

router.get('/', (req, res) => {
  res.json(theModel.get());
});

router.post('/', jsonParser, (req, res) => {
  // validate
  const requiredFields = ['name', 'checked'];  
  requiredFields.forEach((item, index) => {
    const field = requiredFields[index];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }); // validated
  const item = theModel.create(req.body.name, req.body.checked);
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => { // should we catch the error here?
  theModel.delete(req.params.id);
  console.log(`Deleted item \`${req.params.id}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  // validate
  const requiredFields = ['name', 'checked', 'id'];
  requiredFields.forEach((item, index) => {
    const field = requiredFields[index];
    if (!(field in req.body)) {
      const message = `Missing '${field}' in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }); // validation 1 passed
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  } // validated
  console.log(`Updating item '${req.params.id}'`);
  const updatedItem = theModel.update({
    id: req.params.id,
    name: req.body.name,
    checked: req.body.checked
  });
  res.status(204).end(); // why not res.sendStatus(204) or res.status(204).json(updatedItem) ????
});

module.exports = router;
