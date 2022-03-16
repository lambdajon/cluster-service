const cp = require('child_process');
const path = require('path');
const http = require('http');

const HttpTransport = require('./transport/http');
const balancers = require('./balancers');

const wokrersFolderPath = path.join(__dirname, 'worker');

class Service {
  workers = [];

  constructor(options) {
    this.isClusterMode = !!options.cluster;
    this.masterPort = options.transport.port;
    if (options.transport.type === 'http') {
      this.transport = new HttpTransport(options.transport.port);
    }
    if (this.isClusterMode) {
      this.clusterOptions = options.cluster;
    }
  }

  async start() {
    if (this.isClusterMode) {
      this._startCluster();
      await this._startWorker();
      await this._startTransport();
    } else {
      await this._startWorker();
      await this._startTransport();
    }
  }

  async balancer(req, res, workers) {
    const workerId = balancers.random(0, workers.length);
    const worker = workers[workerId];
    worker.weight += 1;
    const workerAdress = '127.0.0.1';

    const options = {
      host: workerAdress,
      port: worker.port,
      method: req.method,
      path: req.url
    };
    let responseBody = '';
    const forward = http.request(options, (response) => {
      response.on('data', (chunk) => {
        responseBody += chunk;
      });
    });
    forward.on('close', () => {
      res.end(responseBody);
    });
    forward.end();
  }

  async _startTransport() {
    this.transport.start();
  }

  async _startWorker() {
    if (this.isClusterMode) {
      this.transport.createWorker(this.balancer, this.workers);
    } else {
      this.transport.createWorker();
    }
  }

  async _startCluster() {
    const workerPath = path.join(wokrersFolderPath, 'httpWorker.js');
    const workerOptions = {
      port: this.masterPort
    };

    for (let i = 0; i < this.clusterOptions.instances; ++i) {
      if (this.clusterOptions.instancePorts === 'increment') {
        workerOptions.port += 1;
      }
      const worker = cp.fork(workerPath, [JSON.stringify(workerOptions)]);
      const node = {
        weight: 0,
        id: worker.pid,
        port: workerOptions.port
      };
      this.workers.push(node);
    }
    process.on('SIGINT', () => {
      console.log('Before exit');
      process.exit(1);
    });
  }
}

module.exports = Service;
