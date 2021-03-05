//import React from 'react';
import {searchFun,sortFun,pageFun} from './App.js'

test('Pageination, Total Page count', () => {
    expect(pageFun(100,9)).toEqual(12);
});

test('Searching the string object within title and description', () => {
    expect(searchFun([{name:"ab",description:"ok"},{name:"zz",description:"zzaw"},{name:"bc",description:"ok2"}],"a"))
    .toEqual([ { name: 'ab',description:"ok" }, { name: 'zz',description:"zzaw" }]);
});

test('Searching the string object with double quote', () => {
    expect(searchFun([{name:"ab cd ef",description:"ok"},{name:"aa ab ef",description:"okq1"},{name:"bc cd ef",description:"zas"}],'"cd ef"'))
    .toEqual([ {name:"ab cd ef",description:"ok"},{name:"bc cd ef",description:"zas"}]);
});

test('Sorting the string date object dateLastEdited', () => {
    expect(sortFun([{dateLastEdited:"2018-05-19T12:33:25.545Z"},{dateLastEdited:"2017-11-28T04:59:13.759Z"},{dateLastEdited:"2018-07-27T21:33:53.485Z"}],"dateLastEdited"))
    .toEqual([{dateLastEdited:"2018-07-27T21:33:53.485Z"},{dateLastEdited:"2018-05-19T12:33:25.545Z"},{dateLastEdited:"2017-11-28T04:59:13.759Z"}]);
});

test('Sorting the string object ascending order', () => {
    expect(sortFun([{name:"ab"},{name:"aa"},{name:"bc"}],"title-ASC"))
    .toEqual([ { name: 'aa' }, { name: 'ab' }, { name: 'bc' } ]);
});

test('Sorting the string object descending order', () => {
    expect(sortFun([{name:"ab"},{name:"aa"},{name:"bc"}],"title-DES"))
    .toEqual([ { name: 'bc' }, { name: 'ab' }, { name: 'aa' } ]);
});