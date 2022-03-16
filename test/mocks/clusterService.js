const Service = require('../../src/service');

const service = new Service({
  transport: {
    type: 'http',
    port: 3000
  },
  cluster: {
    instances: 4, // 'max' | number
    mode: 'random', // round-robin
    instancePorts: 'increment', // none | random
    restart: 'always' // on-failure | no
  }
});

(async () => {
  await service.start();
})();
