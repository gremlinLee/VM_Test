'use strict';

const fork = require('child_process').fork;

class ForkedProcess {

  constructor(func, time, id) {
    this.func = func;
    this.time = time;
    this.id = id;
  }

  run() {
    this.perfomed = Date.now();
    this.child = fork(__dirname + '/process_vm/index.js');
    this.setKillTimeout();
    this.setOnMessageHandler();
    this.child.send(this.func);
  }

  setKillTimeout() {
    setTimeout(() => {
      console.log("\nkiller runs " + (Date.now() - this.perfomed) + " " + this.child.pid);
      this.child.kill();
    }, this.time);
  }

  setOnMessageHandler() {
    this.child.on('message', (mess) => {
      console.log('time -- ' + mess);
      this.child.kill();
    });
  }

}

for(var i = 0; i < 100; i++) {
  var child = new ForkedProcess("var now = Date.now(); for(var i = 0; i < 10000; i++) { for(var j = 0; j < 80000; j++) {/*if(j == 10000) console.log(i +' ' + j);*/}} exit(Date.now() - now)", 5000, i);
  child.run();
}
