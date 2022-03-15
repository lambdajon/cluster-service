require('jest-extended');
const path = require('path');
const { spawn } = require('child_process');

describe('HTTP transport tests', () => {
  it('should start transport', (done) => {
    const testHttpAppFilePath = path.join(
      __dirname,
      '../mocks/httpTransport.js'
    );
    console.log(testHttpAppFilePath);

    const testApp = spawn('node', [testHttpAppFilePath]);

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
