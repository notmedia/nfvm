'use strict';

const jsonfile: any = jest.genMockFromModule('jsonfile');

function test() {
  console.log('test');
}

jsonfile.test = test;

export = jsonfile;
