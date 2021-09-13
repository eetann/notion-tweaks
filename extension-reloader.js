const red = '\u001b[31m';
const reset = '\u001b[0m';
const green = '\u001b[32m';
const WebSocket = require('ws');
class ExtensionReloader {
  constructor() {
    // create server to tell clients when to reload
    this.wss = new WebSocket.Server({port: 8000});
    this.wss.on('connection', (ws) => {
      ws.on('error', (event) => {
        consle.log(red + 'ExtensionReloader error:' + event + reset);
      });
      ws.on('message', (data) => {
        if (data == 'options') {
          this.openOptionsPage = true;
        } else if (data == 'reloaded') {
          if (this.openOptionsPage) {
            ws.send('options');
            this.openOptionsPage = false;
          }
        } else {
          console.log(data);
        }
      });
    });
    this.openOptionsPage = false;
  };
  apply(compiler) {
    compiler.hooks.done.tap('ExtensionReloader', () => {
      // count to divide "reload" and "restart"
      let clients_count = 0;
      let clients_len = this.wss.clients.size;

      // send "reload" or "restart"
      this.wss.clients.forEach((client) => {
        clients_count++;
        if (clients_count == clients_len) {
          // send "restart" to the last client to reload tab and extension
          client.send('restart');
        } else {
          // send "reload" to reload tab
          client.send('reload');
        }
      })
      console.log('reloaded!');
    })

    // register file to reload with webpack entry
    let entry = compiler.options.entry;
    let content_reload = './content_reload.js';
    if (entry.content) {
      if (Array.isArray(entry.content)) {
        entry.content.push(content_reload);
      } else {
        entry.content = [entry.content, content_reload];
      }
    }
    let options_reload = './options_reload.js';
    if (entry.options) {
      if (Array.isArray(entry.options)) {
        entry.options.push(options_reload);
      } else {
        entry.options = [entry.options, options_reload];
      }
    }
    let background_reload = './background_reload.js';
    if (entry.background) {
      if (Array.isArray(entry.background)) {
        entry.background.push(background_reload);
      } else {
        entry.background = [entry.background, background_reload];
      }
    }
  };
}
module.exports = ExtensionReloader
