const Service = require('../../src/service');
const HttpTransport = require('../../src/transport/transport');

const service = new Service({ transport: new HttpTransport(3000) });

(async () => {
  await service.start();
})();
