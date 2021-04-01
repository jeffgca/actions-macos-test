let { Info } = require('../lib/midi-info');
const _ = require('lodash');
const midi = require('midi');

let testInterface, name = 'testInterface';

function fakeMidiInterface() {
  console.log('in fakeMidiInterface');
  return new Promise((resolve, reject) => {
    let _in = new midi.Input();
    let _out = new midi.Output();

    _in.openVirtualPort(name);
    _out.openVirtualPort(name);

    testInterface = {
      in: _in,
      out: _out
    };
    resolve(true);
  })
}

beforeAll(() => {
  console.log('in beforeAll');
  return fakeMidiInterface();
});

afterAll(() => {
  testInterface.in.closePort();
  testInterface.out.closePort();
});

test('test we get some info', (done) => {
  
  let info = new Info();
  console.log(info.inputs, info.outputs, info.devices);

  expect(_.has(info.inputs, name)).toEqual(true);
  expect(_.has(info.inputs[name], 'in')).toEqual(true);

  expect(_.has(info.outputs, name)).toEqual(true);
  expect(_.has(info.outputs[name], 'out')).toEqual(true);

  expect(_.has(info.devices, name)).toEqual(true);
  expect(_.has(info.devices[name], 'in')).toEqual(true);
  expect(_.has(info.devices[name], 'out')).toEqual(true);

  
  done();
});
