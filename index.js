let { Info } = require('./lib/midi-info.js');


if (require.main === module) {
  let midi_devices = new Info();

  console.log(midi_devices.inputs, midi_devices.outputs, midi_devices.devices);
}

module.exports.Info = Info;




