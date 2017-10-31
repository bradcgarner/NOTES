'use strict';

let objOriginal = {
  a: 'a',
  b: 'b',
  c: 'c'
};

let objClone = { ...objOriginal };
/* {
  a: 'a',
  b: 'b',
  c: 'c'
} */

let objClone2 = { ...objOriginal , ...objOriginal };
/* {
  a: 'a',
  b: 'b',
  c: 'c'
} */

let objClone3 = { ...objOriginal , {d: 'd'} };
/* syntax error */

let objClone4 = { ...objOriginal , d: 'd' };
/* {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd'
} */

let objClone5 = { ...objOriginal , d: {e: 'e'} };
/* {
  a: 'a',
  b: 'b',
  c: 'c',
  d: {
    e: 'e'
  }
} */

let objClone6 = { ...objOriginal , b: 'z' };
/* {
  a: 'a',
  b: 'z',
  c: 'c',
} */

let objExtra = {
  foo: 'foo',
  bar: 'bar',
  biz: 'biz'
}

let objClone7 = { ...objOriginal , objExtra };
// syntax error

let objClone8 = { ...objOriginal , {objExtra} };
//syntax error

let objClone9 = { ...objOriginal , ...objExtra };
/* {
  a: 'a',
  b: 'z',
  c: 'c',
  foo: 'foo',
  bar: 'bar',
  biz: 'biz'
} */

let objDecon = {objExtra};
/* {
  objExtra: {
  foo: 'foo',
  bar: 'bar',
  biz: 'biz'
  }
} */

let {...objExtra} = objExtra;
/* syntax error: objExtra has already been defined */

let {foo, bar, biz} = objExtra;
/*
foo === 'foo';
bar === 'bar';
biz === 'biz';
*/

let robotA = { name: "Bender" };
let robotB = { name: "Flexo" };

let { name: nameA } = robotA;
// nameA === 'Blender'

let { name: nameB } = robotB;
// nameB === 'Flexo'

let objWithArr1 = {
  arrayProp: [
    {
      firstName: 'first',
      lastName: 'last'
    }
  ]
}

let {arrayProp: [{firstName, lastName}]} = objWithArr1;
/* firstName === 'first';
   lastName === 'last'; */

let {arrayProp} = objWithArr1;
/* arrayProp === [
    {
      firstName: 'first',
      lastName: 'last'
    }
] */

let objWithArr2 = {
  arrayProp: [
    'first',
    { lastName: 'last' }
  ]
}

let {arrayProp: [firstName2, {lastName}]} = objWithArr2;
/* firstName === 'first';
   lastName === 'last'; */

let {arrayProp: [firstName2, {lastName: lastName3}]} = objWithArr2;
  /* firstName === 'first';
    lastName === 'last'; */