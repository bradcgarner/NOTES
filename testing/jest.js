/* These are MY notes to help me remember and find Jest expressions.
 * Documentation: http://facebook.github.io/jest/docs/en/getting-started
 * Anyone is free to use this. 
 */

'use strict'; // ...so my linter doesn't bark at me
const element = {};
/* global expect */

// to use 
// comes out-of-the-box for React, so probably don't need to install anything.
  // $ npm install --save-dev jest
// save test files as *.test.js
// no imports needed if inside a React app

// ################## OBJECT TYPES ##################


// ################## EQUALITY ##################

expect(element).toBe(4); // exact equality
expect(element).toBe('value'); 
expect(element).toBe({a:1, b:2}); 
expect(element).not.toBe(5);  // inequality

// ################## TRUTHINESS ##################

expect(element).toBeNull();       // exactly null, not generally "falsy"
expect(element).toBeDefined();    // opposite of undefined 
expect(element).toBeUndefined();  // exactly undefined, not other falsy values
expect(element).toBeTruthy();     // normal, generic truthiness
expect(element).toBeFalsy();      // normal, generic falsiness

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


// ################## OBJECT VALUES ##################



// ################## ARRAY VALUES ##################

expect(element).toContain('beer');  // true in case of element = ['beer','wine','other random booze']

// ################## EXCEPTIONS ##################

const someFunction = () => {
  throw new ConfigError('WTF?!');
};
expect(someFunction).toThrow();            // pass, it throws
expect(someFunction).toThrow(ConfigError); // pass, it throws ConfigError
expect(someFunction).toThrow('WFT?!');     // pass, it throws this specific message


