'use strict';

const uuid = require('uuid'); // not needed if handled via database

function StorageException(message) {
  this.message = message;
  this.name = 'StorageException';
}

const myModel = { // this model is for local storage; handle differently via db
  create: function(name, checked) {
    console.log('Creating new shopping list item');
    const item = {
      name: name,
      id: uuid.v4(),
      checked: checked
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving shopping list items');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(id) {
    console.log(`Deleting shopping list item '${id}'`);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Deleting shopping list item '${updatedItem.id}'`);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(`Can't update item '${id}' because doesn't exist.`);
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};

function createMyModel() {
  const storage = Object.create(myModel); // create a new object, modeled after myModel
  storage.items = {}; // set the property items to an empty object (this could be done in the model)
  return storage; // return the new object
}

module.exports = {
  theModel: createMyModel() // notice we are not returning a function, we are returning the object
};