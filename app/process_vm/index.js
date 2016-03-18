'use strict';

const vm = require('vm');
var sandBox = {
  i: 0,
  console,
  exit
};

function exit(value) {
  process.send(value);
}

function runContext(func) {
  var context = vm.createContext(sandBox);
  var script = new vm.Script(func, {
    timeout: 5000
  });
  script.runInContext(context);
}

process.on('message', (mess) => {
  if (typeof mess == 'string') {
    runContext(mess);
  }
});
