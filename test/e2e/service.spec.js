require('jest-extended');
const path = require('path');
const { spawn } = require('child_process');

describe('Service tests', () => {
  it('should start simple service', (done) => {
    const simpleService = path.join(__dirname, '../mocks/simpleService.js');

    const testApp = spawn('node', [simpleService]);

    testApp.stdout.on('data', (data) => {
      const stdOut = data.toString();
      expect(stdOut).toBeDefined();
      testApp.kill('SIGINT');
      done();
    });
    testApp.on('error', (err) => {
      console.log(err);
    });
  });
});
