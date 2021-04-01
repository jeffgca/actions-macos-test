const midi = require('midi');
const _ = require('lodash');

/*
  Simple class that returns info about the current state of midi interfaces on the system.
*/
class Info {

  constructor() {
    this._midi = midi;
  }

  get inputs() {
    let _in = new midi.Output();
    return this._getNames(_in, 'in');
  }

  _getNames(handle, dir) {
    let _out = {};
    let _len = handle.getPortCount();
    _.each(_.range(_len), (i) => {
      let _obj = {};
      _obj[dir] = i;
      _out[handle.getPortName(i)] = _obj;
    });
    return _out;
  }

  get outputs() {
    let _out = new midi.Output();
    return this._getNames(_out, 'out');
  }

  get devices() {
    return _.merge(this.inputs, this.outputs);
  }
}



module.exports.Info = Info;