/**
 * Requires (Test Modules)
 */
var expect = require('expect.js');

/**
 * Requires (Main App)
 */
var lambda = require('../index');

/**
 * Mock AWS Lambda Context
 */
var context = {
  fail: function() {},
  succeed: function() {}
};

describe('slack-bot', function() {
  this.timeout(5000);

  it('Should list down social stats count for a link', function(done) {
    var output = lambda.handler({
      trigger_word: 'dog',
      text: 'dog <https://lesterchan.net/blog/2016/02/26/singtel-samsung-galaxy-s7-4g-and-galaxy-s7-edge-4g-price-plans/>'
    }, context);

    output.then(function(response) {
      expect(response).to.have.property('attachments');
      expect(response.attachments).to.have.length(1);

      expect(response.attachments[0]).to.have.property('title');
      expect(response.attachments[0].title).to.eql('https://lesterchan.net/blog/2016/02/26/singtel-samsung-galaxy-s7-4g-and-galaxy-s7-edge-4g-price-plans/');

      expect(response.attachments[0]).to.have.property('fields');
      expect(response.attachments[0].fields).to.have.length(6);

      done();
    }).catch(done);
  });
});
