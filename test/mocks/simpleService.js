const Service = require('../../src/service');

const service = new Service({
  transport: {
    type: 'http',
    port: 3000
  }
});

(async () => {
  await service.start();
})();
