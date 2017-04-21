import { Angular2MeanAppPage } from './app.po';

describe('angular2-mean-app App', () => {
  let page: Angular2MeanAppPage;

  beforeEach(() => {
    page = new Angular2MeanAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
