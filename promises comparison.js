/* These are MY notes to help me remember and understand promises.
 * I include a lot of explanation (since I need it), but I am a student... so read and use at your own risk.
 * Code in examples is NOT necessarily in the order it would be written; it is in order of logical explanation. Code might need to be re-ordered (and heavily edited) for actual use.
 * Anyone is free to use this. 
 * If you'd like to help improve this, let me know, and I can add you as a collaborator.
 */

'use strict';
/* global knex app $*/

// ################ NOT A PROMISE - A CALLBACK! #####################

const getJsonCallback = function() {

  $.getJSON(endpoint, query, callback);
  
  let endpoint = '...with route parameters... not query parameters';
  let query = 'object with query parameters';
  let callback = 'function to run after $.getJSON completes';
  // this can result in 'callback hell' if you have many
  // this ONLY uses http method GET and only returns JSON
  // (versus fetch which can use http methods GET, POST, PUT, DELETE)
  
  // variation that returns a promise
  return $.getJSON(endpoint,query).then('...callback function...');
  
};


// ################# NEW PROMISE USE CASE ####################

// Add new Promise() below...


// ################# FETCH PROMISE USE CASE ####################

fetch(URL, init).then(response=>{
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}).then(response=>applyAdvSearchFilters(response));


let URL = 'full url, with route parameters AND query parameters, can be relative url';
// to create URL:
// option to below is just to use a string for the url
const url = new URL('some-url/withEndpoint');
// create a query object (similar to $.getJSON) that includes ONLY search parameters
// append url per below (or manually if we use a string)
Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

let init = 'object: OPTIONAL parameter, used to include other stuff, like headers';
// init can be created per below
const headers = new Headers();
// headers is a special object that will allow the same key to be used more than once
// e.g. so we could have 'myHeaderKey' twice
headers.set('Authorization', `Bearer ${localStorage.getItem('SPOTIFY_ACCESS_TOKEN')}`);
headers.set('Content-Type', 'application/json');
init = {
  headers
};
// init can use a lot of other things beyond headers

// fetch always returns a promise. The response from the promise must then be passed to a .then statement.
// the .then statement can then continue a promise chain, or resolve.  
// technically .then always returns a promise, but we don't have to use the promise. We can just resolve.
// The example above resolves the first promise by returning a json, then applies filters to that JSON (in the global space).

// ################# KNEX PROMISE USE CASE ####################
// NEEDS UPDATING!!!!!!!!!

// simplest version. Just insert.
const knex1 = function() {
  app.post('/restaurants', (req, res)=> {
    knex('restaurants')
      .insert({name: req.body.name, cuisine: req.body.cusine, borough: req.body.borough})
      .then(()=>{ }); // we need to end with a then; nothing else to do (though we likely WANT to do something else)
  });
  
  // more likely simple version
  app.post('/restaurants', (req, res)=> {
    knex('restaurants')
      .insert({name: req.body.name, cuisine: req.body.cusine, borough: req.body.borough})
      .returning('id') // critical to use the id below
      .then( id => res.location(`http://localhost:8080/restaurants/${resId}`).sendStatus(201).send()); // location (headers) must be before sendStatus, send must be last
  });
  
  // nested version / dehydrating
  app.post('/restaurants', (req, res)=> {
    let resId;
    knex('restaurants')
      .insert({name: req.body.name, cuisine: req.body.cusine, borough: req.body.borough})
      .returning('id') // critical to use the id below
      .then(id=>{ // critical to pass in id from above
        resId = parseInt(id[0]); // critical to avoid re-re-re-passing the id, so we can use it in the next then (or anywhere else in this function)
        let promiseArr = req.body.grades.map(item=>{
          return knex('grades') // return is critical since we use {}; map mutates based on what is returned
            .insert({
              grade: item.grade,
              score: item.score,
              restaurant_id: resId,
              date: new Date,
            })
            .then(()=>{ }); // we only need to end each promise (in the array); nothing else to do
        });
        return Promise.all(promiseArr); // our .then() returns a Promise.all; this assures that all parts of this then execute before the next then
      })
      .then( id => res.location(`http://localhost:8080/restaurants/${resId}`).sendStatus(201).send()); // location (headers) must be before sendStatus, send must be last
  });
  
};

const knex2 = function() {
  app.post('/restaurants', (req, res)=> {
    let resId;
    knex('restaurants')
      .insert({name: req.body.name, cuisine: req.body.cusine, borough: req.body.borough})
      .returning('id') // critical to use the id below
      .then(id=>{ // critical to pass in id from above
        resId = parseInt(id[0]); // critical to avoid re-re-re-passing the id, so we can use it in the next then (or anywhere else in this function)
        let promiseArr = req.body.grades.map(item=>{
          return knex('grades') // return is critical since we use {}; map mutates based on what is returned
            .insert({
              grade: item.grade,
              score: item.score,
              restaurant_id: resId,
              date: new Date,
            })
            .then(()=>{ }); // we only need to end each promise (in the array); nothing else to do
        });
        return Promise.all(promiseArr); // our .then() returns a Promise.all; this assures that all parts of this then execute before the next then
      })
      .then( id => res.location(`http://localhost:8080/restaurants/${resId}`).sendStatus(201).send()); // location (headers) must be before sendStatus, send must be last
  });
};

const knex3 = function() {
  app.put('/api/stories/:id', (req, res) => {
    let id = req.params.id;
    knex('news')
      .update({
        title: req.body.title, // if req.body.title is undefined, this line is skipped
        url: req.body.url
      })
      .where('id', req.params.id)
      .then(() => {
        if (req.body.votes === 1) {
          console.log('logging votes',req.body.votes);
          return knex('news') // return on this line returns a promise
            .increment('votes')
            .where('id', req.params.id);
          // .then(()=>{}); // a then does no good here. The .then() says this promise is over and we start something else. But in this case, the next .then() is 7 lines down, and we need to return a promise.
        } else if (req.body.votes === -1) {
          return knex('news')
            .increment('votes' -1)
            .where('id', req.params.id);
        }
      }) // each .then() needs to return a promise if the following .then() is to run after it finishes
      .then(() => { // delete all tags for this story
        console.log('logging id',id);
        return knex('news_tags')
          .where('id_news', id)
          .del();
      })
      .then(()=>{
        const arrayOfPromises = req.body.tags.map(tag => {
          return knex('news_tags')
            .insert({id_news: id, id_tags: tag});
        });
        return Promise.all(arrayOfPromises);
      })
      .then(()=>{
        res.sendStatus(204);
      });
  });
};


