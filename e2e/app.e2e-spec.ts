import { O2cPage } from './app.po';

describe('o2c App', () => {
  let page: O2cPage;

  beforeEach(() => {
    page = new O2cPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
