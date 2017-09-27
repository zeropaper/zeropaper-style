var VisualDiff = require('./visual-diff');

describe('Visual Regression', function() {
  var visualDiff;

  before(function() {
    visualDiff = new VisualDiff(browser);
  });

  it('shoots', async function() {
    await browser.url('/');

    await visualDiff.shootAll('bla');
  });
});