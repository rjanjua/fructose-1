/* globals describe beforeEach beforeAll afterAll */
var log = require('npmlog')

const Client = require("../../client");
const { setup, teardown } = require("./setup");

export default config => {
  let first = true;

  beforeAll(async () => {
    if (first) {
      log.verbose("setting up")
      await setup(config).then(() => log.info("setup complete"));
      first = false;
    }
  }, 180000);

  afterAll(async () => {
    await teardown();
  });

  const withComponent = (component, description, tests) => {
    describe(description, () => {
      const hashed = JSON.stringify(component);
      let client;

      beforeAll(async () => {
        client = Client(7811);
        log.verbose("client address", client.socket);
      }, 60000);

      afterAll(async () => client.disconnect());

      beforeEach(async () => {
        return await client.loadComponent(hashed).then( () => log.verbose('loadComponent', hashed))
      });
      tests();
    });
  };

  global.withComponent = withComponent;
};
