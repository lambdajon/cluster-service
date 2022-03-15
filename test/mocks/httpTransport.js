const HttpTransport = require('../../src/transport/transport');

const transport = new HttpTransport(3000);
transport.createWorker();
transport.start();
