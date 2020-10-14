import { expect, assert } from 'chai';
import { SpectronClient } from 'spectron';

import commonSetup from './common-setup';

describe('bunny-tracker application', function () {
  commonSetup.apply(this);

  let client: SpectronClient;

  beforeEach(function () {
    client = this.app.client;
  });

  it('should display message saying Search for Bunnies', async function () {
    // client.$('app-home h1');
    const element = await client.element('[data-test="add-bunny-nav"]');
    expect(element).to.have.text('Add Bunny');
  });


  it('creates initial windows', async function () {
    const count = await client.getWindowCount();
    expect(count).to.equal(1);
  });

});
