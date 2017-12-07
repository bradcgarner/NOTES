/* These are MY notes to help me remember and find Enzyme expressions.
 * Documentation: http://npmjs.com/package/expect-enzyme/
 * Anyone is free to use this. 
 */

'use strict'; // ...so my linter doesn't bark at me
/* global expect */

// to use 
// $ npm install --save-dev expect@1.x.x expect-enzyme
import expect from 'expect';
import enzymify from 'expect-enzyme';
expect.extend(enzymify())

// ################## OBJECT TYPES ##################

const element = {};
expect(element).toBeA('video');

// ################## OBJECT PRIMITIVE VALUES ##################




// ################## OBJECT KEYS / PROPERTIES ##################

expect(element).toContain('highScore'); 
expect(element).toHaveState({clicks: 1});

// ################## OBJECT VALUES ##################

expect(element).toEqual({a: 1}); // Same as deep.equal in chai



// ################## ARRAY VALUES ##################










