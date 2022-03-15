const HttpTransport = require('../../src/transport');

const transport = new HttpTransport(3000);
transport.createWorker();
transport.start();
