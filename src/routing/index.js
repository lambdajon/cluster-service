module.exports = {
  '/': 'welcome to homepage',
  '/status': () => `Status :OK <br/> process id: ${process.pid}`
};
