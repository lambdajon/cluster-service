const HttpTransport = require('../transport/http');

if (!process.argv[2]) {
  process.exit(1);
}
const options = JSON.parse(process.argv[2]);

const { port } = options;
const transport = new HttpTransport(port);
transport.createWorker();
transport.start();
