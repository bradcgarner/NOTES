/* These are MY notes to help me remember and find Chai expressions.
 * Documentation at http://chaijs.com/ orders by syntax.
 * This orders by uses cases.
 * I use 'expect' here (vs 'should'), since that is the example used on the Chai website.
 * Anyone is free to use this. 
 * If you'd like to help improve this, let me know, and I can add you as a collaborator.
 */

'use strict'; // ...so my linter doesn't bark at me
/* global expect */

// ################## OBJECT TYPES ##################

expect('foo').to.be.a('string');
expect({a: 1}).to.be.an('object');
expect(null).to.be.a('null');
expect(undefined).to.be.an('undefined');

expect([1, 2]).to.be.an('array').that.does.not.include(3);
expect([]).to.be.an('array').that.is.empty;

expect(1).to.be.a('string', 'nooo why fail??'); // the 'a' assertion allows a 2nd message parameter
expect(1, 'nooo why fail??').to.be.a('string'); // 2nd message parameter in 'expect'

// ################## OBJECT PRIMITIVE VALUES ##################

expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2}); // When the target is an object, .include asserts that the given object val’s properties are a subset of the target’s properties.

expect(1).to.equal(1);
expect(true).to.be.true;
expect(NaN).to.be.NaN;

expect('foobar').to.include('foo');
expect('foobar').to.have.string('bar');
expect('foobar').to.not.have.string('taco');


// ################## OBJECT KEYS / PROPERTIES ##################
expect({a: 1}).to.not.have.property('b');
expect({b: 2}).to.have.a.property('b');

expect({b: 2}).to.not.have.property('a');

expect({a: 1}).to.have.own.property('a');
expect({a: 1}).to.have.property('b').but.not.own.property('b'); 

expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});

expect({a: 3}).to.have.property('a', 3);

expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');

expect({a: 1, b: 2}).to.have.all.keys('a', 'b');

// ################## OBJECT VALUES ##################
expect({a: 1}).to.deep.equal({a: 1}); // Target object deeply (but not strictly) equals `{a: 1}`

expect([{a: 1}]).to.deep.include({a: 1}); // Target array deeply (but not strictly) includes `{a: 1}`
expect([{a: 1}]).to.not.include({a: 1});

expect({a: 1}).to.own.include({a: 1});
expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});

expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});


// ################## ARRAY VALUES ##################

expect([1, 2]).to.have.ordered.members([1, 2])
  .but.not.have.ordered.members([2, 1]);

expect([1, 2, 3]).to.include(2); // When the target is an array, .include asserts that the given val is a member of the target.

expect(['x', 'y']).to.have.all.keys(0, 1);


// COMPARITORS (ALL BELOW 'NOT RECOMMENDED' IN PREFERENCE OF EQUAL)
expect(2).to.be.above(1);
expect('foo').to.have.lengthOf.above(2); // always use lengthOf, as there are compatibility chaining issues with a.length...
expect([1, 2, 3]).to.have.lengthOf.above(2); 
expect([1, 2, 3]).to.have.lengthOf.at.least(2);

expect(2).to.be.at.least(1);
expect(1).to.be.below(2);





