const HttpTransport = require('../../src/transport/http');

const transport = new HttpTransport(3000);
transport.createWorker();
transport.start();
