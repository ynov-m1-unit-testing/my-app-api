process.env.NODE_ENV = "test";

module.exports = {
    verbose: true,
    testMatch: ["**/test/integration/*.int.test.js"],
    setupFilesAfterEnv: ['./src/test/integration/setup.js']
}