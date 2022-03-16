const http = require('http');
const routing = require('./routing');

class HttpTransport {
  server;

  constructor(port) {
    this.port = port;
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`http server start on ${this.port} port`);
    });
  }

  createWorker(cb, workers) {
    if (typeof cb === 'function') {
      this.server = http.createServer((...args) => {
        cb(...args, workers);
      });
    } else {
      this.server = http.createServer(this._dispatcher);
    }
  }

  _dispatcher(req, res) {
    const types = {
      object: JSON.stringify,
      string: (s) => s,
      number: (n) => n.toString(),
      undefined: () => 'not found',
      function: (fn, par, client) => JSON.stringify(fn(client, par))
    };

    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    res.end(serializer(data, req, res));
  }

  beforeStop(cb) {
    this.server.on('close', cb);
  }
}

module.exports = HttpTransport;
