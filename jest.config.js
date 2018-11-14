module.exports = {
  testEnvironment: 'jest-environment-node',
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test.js'),
  collectCoverageFrom: ['**/src/**/*js'],
};
