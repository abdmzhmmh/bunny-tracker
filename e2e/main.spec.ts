import { expect } from 'chai';
import { SpectronClient } from 'spectron';
import commonSetup from './common-setup';

describe('bunny-tracker application', function () {
  commonSetup.apply(this);

  let client: SpectronClient;

  beforeEach(function () {
    client = this.app.client;
  });

  it('should display navigation bar', async function () {
    const addBunnyText = await client.getText('[data-test="add-bunny-nav"]');
    expect(addBunnyText).to.equal('Add Bunny');
    const addBunnyIsEnabled = await client.isEnabled('[data-test="add-bunny-nav"]');
    expect(addBunnyIsEnabled).to.equal(true);

    const searchBunniesText = await client.getText('[data-test="search-bunnies-nav"]');
    expect(searchBunniesText).to.equal('Search Bunnies');
    const searchBunniesIsEnabled = await client.isEnabled('[data-test="search-bunnies-nav"]');
    expect(searchBunniesIsEnabled).to.equal(true);
  });

  it('should show add bunny page', async function () {
    await client.waitUntilWindowLoaded();
    // await client.pause(10000);
    // This doesn't work :(
    await client.click('[data-test="add-bunny-nav"] span');
    // await client.pause(1000);
    // client.getHTML('[data-test="add-bunny-nav"] span').then((thing) => {
    //   console.log(thing);
    // });
    // const addBunnyIsEnabled = await client.isEnabled('[data-test="add-bunny-nav"]');
    // expect(addBunnyIsEnabled).to.equal(true);
    //
    // const searchBunniesIsEnabled = await client.isEnabled('[data-test="search-bunnies-nav"]');
    // expect(searchBunniesIsEnabled).to.equal(false);
  });


  it('creates initial window', async function () {
    const count = await client.getWindowCount();
    expect(count).to.equal(1);
  });

});
