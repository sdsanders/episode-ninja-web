import { EpisodeNinjaWebPage } from './app.po';

describe('episode-ninja-web App', function() {
  let page: EpisodeNinjaWebPage;

  beforeEach(() => {
    page = new EpisodeNinjaWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
