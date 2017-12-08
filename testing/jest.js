/* These are MY notes to help me remember and find Jest expressions.
 * Documentation: http://facebook.github.io/jest/docs/en/getting-started
 * Anyone is free to use this. 
 */

'use strict'; // ...so my linter doesn't bark at me
const element = {};
const anotherElement = {};
/* global expect */

// to use 
// comes out-of-the-box for React, so probably don't need to install anything.
// $ npm install --save-dev jest
// save test files as *.test.js
// no imports needed if inside a React app

// EXAMPLES: https://github.com/facebook/jest/tree/master/examples

/* PREGUNTAS!

create-react-app installs the following (see package.json)
  enzyme
  enzyme-adapter-react-16
  jest
enzyme
  testing utility
  (there are other options, but why use them?)
  https://github.com/airbnb/enzyme
  you can use it with a range of assertion libraries
  we'll use it with jest, since that is native
  to use jest with React, you don't need to import anything (it comes with React);
    i.e. once you type the following:
      import React from 'react';
      you also import jest.
    This conveys to referenced files, which is why you don't need to re-import react in tests files inside the app.
    https://github.com/airbnb/enzyme/blob/HEAD/docs/guides/jest.md
    enzyme is the default assertion library for React, but it's functions need to be imported,
    so type:
      import { shallow, mount, render } from 'enzyme';
      to use those specific enzyme functions.
    enzyme CAN be used with Mocha/Chai
      https://github.com/airbnb/enzyme/blob/master/docs/guides/mocha.md
      ^^^^ This is not default. And... Don't do it. ^^^^^

jest
  Note: Jest can be used outside React 

  E.g. 'describe' function, and 'it' (or 'test') function, 
       'expect()' function, and '.toEqual()' curried function(?) are native jest assertions.
    
    describe('reducer', () => {

      it('should do something', () => {
        expect(element).toEqual(somethingElse);
      });

    });

  new versions of jest include enzyme-expect out-of-the-box.  
    I.e. 'expect' above forked from the old 'enzyme-expect'
    http://npmjs.com/package/expect-enzyme/
    ^^^^^^ IGNORE!  DEPRECATED! ^^^^^

MORE RESEARCH VVVVVVV
what does setupTests.js do ????

*/
 
// ################## OBJECT TYPES ##################

expect(typeof element).toBe('string');  // by Brad, no example found

// ################## EQUALITY ##################

expect(element).toBe(4); // exact equality
expect(element).toBe('value'); 
expect(element).toBe({a:1, b:2}); 
expect(element).not.toBe(5);  // inequality
expect(JSON.stringify(element)).toBe(JSON.stringify(anotherElement)); // good for complex objects


// ################## TRUTHINESS ##################

expect(element).toBeNull();       // exactly null, not generally "falsy"
expect(element).toBeDefined();    // opposite of undefined 
expect(element).toBeUndefined();  // exactly undefined, not other falsy values
expect(element).toBeTruthy();     // normal, generic truthiness
expect(element).toBeFalsy();      // normal, generic falsiness
// see mock functions for expect.anything()

// ################## PRIMITIVE VALUES - NUMBERS ##################

expect(element).toBeGreaterThan(3);
expect(element).toBeGreaterThanOrEqual(3);
expect(element).toBeGreaterThan(3);
expect(element).toBeLessThan(3);
expect(element).toBeLessThanOrEqual(3);
expect(element).toBe(3);          // toBe and toEqual are same for numbers
expect(element).toEqual(3);
expect(0.1+0.2).toBeCloseTo(0.3); // avoid floating-point madness!!!

// ################## PRIMITIVE VALUES - STRINGS ##################

const testString = 'just some words to test strings';
expect(testString).not.toMatch(/just/);     // fail, the regex /just/ is contained in testString
expect(testString).toMatch(/just/);         // pass


// ################## OBJECT KEYS / PROPERTIES ##################

expect(element.propName).toBeDefined();    // by Brad, no example found; this would be same as expect(element).to.have.property('propName') 

// ################## OBJECT VALUES ##################

// treat same as primitive value
expect(element.someKey).toBe(3);          // by Brad, no example found; toBe and toEqual are same for numbers


// ################## ARRAY VALUES ##################

expect(element).toContain('beer');  // true in case of element = ['beer','wine','other random booze']

// ################## EXCEPTIONS ##################

const someFunction = () => {
  throw new ConfigError('WTF?!');
};
expect(someFunction).toThrow();            // pass, it throws
expect(someFunction).toThrow(ConfigError); // pass, it throws ConfigError
expect(someFunction).toThrow('WFT?!');     // pass, it throws this specific message

// ################## ASYNC CALLBACKS - NOT PROMISES ##################

const fetchData = () => { return 'some async function';};

// the argument done basically says wait until I am called (like .then on a promise, or .await) before moving on
test('the data is peanut butter', done => {
  
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});

// ################## ASYNC PROMISES ##################

// use standard promise format for promises, .then, not done()
test('the data is peanut butter', () => {
  expect.assertions(1);  // 1 is the # of assertions before it ends
  return fetchData()
    .then(data => {
      expect(data).toBe('peanut butter');
    });
});

// promise resolves (.rejects is similar)
test('the data is peanut butter', () => {
  expect.assertions(1);
  return expect(fetchData())
    .resolves.toBe('peanut butter');
});

// promise error is caught
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData()
    .catch(e => expect(e).toMatch('error'));
});

test('the data is peanut butter', async() => {
  expect.assertions(1);
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async() => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter', async () => {
  expect.assertions(1);
  await expect(fetchData())
    .resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  await expect(fetchData())
    .rejects.toMatch('error');
});

// ################## SETUP & TEARDOWN ##################

// same as Mocha/Chai
beforeAll(() => {
  return initializeCityDatabase(); // return if the function returns a promise
});

beforeEach(() => {
  initializeCityDatabase(); // no return assumes this function does not return a promise
});

afterEach(() => {
  clearCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

// ################## SCOPING ##################

describe('matching cities to foods', () => {
  beforeEach(() => {   // Applies only to tests in this describe block
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

});

// it.only and it.skip are same as Mocha/Chai

// ################## MOCK FUNCTIONS ##################

const mockCallback = jest.fn();
forEach([0, 1], mockCallback);

expect(mockCallback.mock.calls.length).toBe(2); // The mock function is called twice
expect(mockCallback.mock.calls[0][0]).toBe(0);  // The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[1][0]).toBe(1);  // The first argument of the second call to the function was 1

// More on mock calls here... not including for now... http://facebook.github.io/jest/docs/en/mock-functions.html#content

const myMock = jest.fn();
console.log(myMock()); // undefined

myMock
.mockReturnValueOnce(10)
.mockReturnValueOnce('x')
.mockReturnValue('y'); // repeats as many times as it is called

console.log(myMock(), myMock(), myMock(), myMock(), myMock()); // 10, x, y, y, y

// ~~~~~~~~
myMock.mockReturnValueOnce(true).mockReturnValueOnce(false); // Make mock return `true` on 1st call, and `false` on 2nd

const result = [11, 12].filter(myMock);

console.log('result',result); // []
console.log(myMock.mock.calls); // [ [ 11, 0, [ 11, 12 ] ], [ 12, 1, [ 11, 12 ] ] ]

// ~~~~~~~~

const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val)); // true

// ~~~~~~~~

test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
});

// much more on mock functions at http://facebook.github.io/jest/docs/en/mock-functions.html#mock-implementations

// ################## DIY MATCHERS!!!! ##################

expect.extend({
  toBeDivisibleBy(received, argument) {
    const pass = received % argument == 0;
    if (pass) {
      return {
        message: () => `expected ${received} not to be divisible by ${argument}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be divisible by ${argument}`,
        pass: false,
      };
    }
  },
});

test('even and odd numbers', () => {
  expect(100).toBeDivisibleBy(2);
  expect(101).not.toBeDivisibleBy(2);
});

// much more on make your own matchers at http://facebook.github.io/jest/docs/en/expect.html#reference

