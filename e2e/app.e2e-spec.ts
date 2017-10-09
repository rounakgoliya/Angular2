import { B2bPage } from './app.po';

describe('b2b App', () => {
  let page: B2bPage;

  beforeEach(() => {
    page = new B2bPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
