class Service {
  constructor(options) {
    this.transport = options.transport;
    this.isClusterMode = !!options.cluster;
    if (this.isClusterMode) {
      this.clusterOptions = options.cluster;
    }
  }

  async start() {
    await this._startWorker();
    await this._startTransport();
  }

  async _startTransport() {
    this.transport.start();
  }

  async _startWorker() {
    this.transport.createWorker();
  }
}

module.exports = Service;
