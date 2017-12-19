'use strict';

// ################## NODE NOCK ##################
/* 

https://www.npmjs.com/package/nock#isdone

https://semaphoreci.com/community/tutorials/mocking-external-http-requests-in-node-tests-with-nock

$ npm install nock --save-dev
$ npm install superagent --save

Not helpful
https://hackernoon.com/redux-testing-step-by-step-a-simple-methodology-for-testing-business-logic-8901670756ce

*/

// ################## EXAMPLE 1 ACTION FILE ##################

var request = require('superagent');

var someActionToTest = function(username, callback) {
  request
    .get(`https://api.github.com/users/${username}/followers`)
    .end(function(err, res) {
      if (!err) {
        var users = res.body.map(function(user) {
          return user.login;
        });
        callback(null, users);
      } else {
        callback('Error Occurred!');
      }
    });
};

// ################## EXAMPLE 1 TEST FILE ##################

// example showed this, for node
const nock = require('nock');
// would we do this instead, in react?
import nock from 'nock';

// example showed this, for node
const someActionToTest = require('../actions/users').someActionToTest;
// would we do this instead, in react?
import { someActionToTest } from '../actions/users';

describe('GET followers', function() {
  beforeEach(function() {
    const expectedResponse = [
      {
        "login": "octocat",
        "id": 583231,
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      {
        "login": "nanocat",
        "id": 583233,
        "avatar_url": "https://avatars.githubusercontent.com/u/583233?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/nanocat",
        "html_url": "https://github.com/nanocat",
        "followers_url": "https://api.github.com/users/nanocat/followers",
        "following_url": "https://api.github.com/users/nanocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/nanocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/nanocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/nanocat/subscriptions",
        "organizations_url": "https://api.github.com/users/nanocat/orgs",
        "repos_url": "https://api.github.com/users/nanocat/repos",
        "events_url": "https://api.github.com/users/nanocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/nanocat/received_events",
        "type": "User",
        "site_admin": false
      }
    ];

    // Mock the TMDB configuration request response
    nock('https://api.github.com')
      .get('/users/octocat/followers')
      .reply(200, expectedResponse);
  });

  it('returns users followers', function(done) {

    var username = 'octocat';

    someActionToTest(username, function(err, followers) {
      
      expect(Array.isArray(followers)).to.equal(true); // Return an array
      expect(followers).to.have.length.above(1);       // At least 1 item in array
      followers.forEach(function(follower) {           // Each item is a string
        expect(follower).to.be.a('string');
      });

      done();
    });

  });
});

// ################## EXAMPLE 2 TEST FILE ##################
//https://medium.com/@kellyrmilligan/testing-async-actions-in-redux-with-isomorphic-fetch-and-fetch-mock-35f98c6c2ee7

import * as actions from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const mockResult = { ...someData }
describe('action creators', () => {

  it('should create SEARCH_SUCCESS when searching', () => {
    fetchMock.getOnce('/search?q=searchterm', mockResult)

    const expectedActions = [
      { type: actions.SEARCH_LOADING },
      { type: actions.SEARCH_SUCCESS, payload: mockResult  }
    ]
    const store = mockStore({
      search: {
      result: {}
      }
    })

    return store.dispatch(actions.search('searchterm'))
      .then((data) => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })

  })

})

// ################## EXAMPLE 3 ACTIONS FILE ##################
// https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md

import 'cross-fetch/polyfill'

function fetchTodosRequest() {
  return {
    type: FETCH_TODOS_REQUEST
  }
}

function fetchTodosSuccess(body) {
  return {
    type: FETCH_TODOS_SUCCESS,
    body
  }
}

function fetchTodosFailure(ex) {
  return {
    type: FETCH_TODOS_FAILURE,
    ex
  }
}

export function fetchTodos() {
  return dispatch => {
    dispatch(fetchTodosRequest())
    return fetch('http://example.com/todos')
      .then(res => res.json())
      .then(body => dispatch(fetchTodosSuccess(body)))
      .catch(ex => dispatch(fetchTodosFailure(ex)))
  }
}

// is this the same?
export const fetchTodos = () => dispatch => {
  dispatch(fetchTodosRequest())
  return fetch('http://example.com/todos')
    .then(res => res.json())
    .then(body => dispatch(fetchTodosSuccess(body)))
    .catch(ex => dispatch(fetchTodosFailure(ex)))
}


// ################## EXAMPLE 3 TEST FILE ##################

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/TodoActions'
import * as types from '../../constants/ActionTypes'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock
      .getOnce('/todos', { 
        body: { todos: ['do something'] }, 
        headers: { 'content-type': 'application/json' } 
      })

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos())
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})


// ################## EXAMPLE 4 ACTIONS FILE ##################
// https://medium.com/@ferrannp/unit-testing-with-jest-redux-async-actions-fetch-9054ca28cdcd

import 'whatwg-fetch';

export function fetchData(id) {
  return (dispatch, getState) => {
    if(getState().id === id)) {
      return; // No need to fetch
    }
    dispatch(requestData(id));
    return fetch('/api/data/' + id)
      .then(checkResponse)
      .then(response => response.json())
      .then(json => dispatch(receiveDataSuccess(json)))
      .catch(error => dispatch(receiveDataFailure(error)))
  }
}

// ################## EXAMPLE 4 TEST FILE ##################

import { fetchData } from '../api';
import configureMockStore from 'redux-mock-store' // change to configureStore per http://arnaudbenard.com/redux-mock-store/
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);  

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

it('calls request and success actions if the fetch response was successful', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, '{"ids":{"provider":' + id + '}}')));

  return store.dispatch(fetchData(id))
    .then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(2);
      expect(expectedActions).toContainEqual({type: types.FETCH_DATA_REQUEST});
      expect(expectedActions).toContainEqual({type: types.FETCH_DATA_SUCCESS, data });
    })
});

it('calls request and failure actions if the fetch response was not successful', () => {
  
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(400, 'Test' +
    ' Error', '{"status":400, "statusText": Test Error!}')));
  
  return store.dispatch(fetchData(id))
    .then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(2);
      expect(expectedActions).toContainEqual({"type": types.FETCH_DATA_REQUEST});
      expect(expectedActions).toContainEqual({type: types.FETCH_DATA_FAILURE,
        error: {status: 400, statusText: 'Test Error'}});
    })
});


it('does check if we already fetched that id and only calls fetch if necessary', () => {
  const store = mockStore({id: 1234, isFetching: false });
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve());  
  
  store.dispatch(fetchData(1234)); // Same id
  expect(window.fetch).not.toBeCalled();

  store.dispatch(fetchData(1234 + 1)); // Different id
  expect(window.fetch).toBeCalled();
});