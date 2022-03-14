class Service {
    constructor(options) {
      this.transport = options.transport;
      this.isClusterMode = !!options.cluster;
      if (this.isClusterMode) {
        this.clusterOptions = options.cluster;
      }
    }
  
    async start() {
      if (this.isClusterMode) {
        if (this.isMaster) {
          await this.startCluster();
          if (this.transport.isPermanentConnection) {
            await this.startTransport();
          }
        } else {
          await this.startWorker();
          if (!this.transport.isPermanentConnection) {
            await this.startTransport();
          }
        }
      } else {
        await this.startWorker();
        await this.startTransport();
      }
    }
  
    async startTransport() {}
  
    async startWorker() {}
  
    async startCluster() {}
  }
  