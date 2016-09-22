/**
 * Requires
 */
var Promise = require('bluebird');
var rp = require('request-promise');
var moment = require('moment');

var config = require('./config');
var helper = require('./helper');

/**
 * Commands
 */
module.exports = {
  /**
   * Fake a error promise
   *
   * @param {string} error Error Message
   *
   * @return {object} Rejected Request Promise
   */
  error: function(error) {
    return Promise.reject(new Error(error.message));
  },

  /**
   * Get dog Picture
   *
   * @param {object} commandArguments Command Arguments
   *
   * @return {object} Request promise
   */
  dog: function(commandArguments) {
    var link = commandArguments[0] || 'https://lesterchan.net';

    return rp({
      uri: config.apiUrl + '/link/?page=' + link,
      json: true
    }).then(function(body) {
      // Fields
      var fields = [
        {
          title: 'Total',
          value: helper.formatNumber(body.total_count),
          short: true
        },
        {
          title: 'Facebook',
          value: helper.formatNumber(body.count.facebook),
          short: true
        },
        {
          title: 'Twitter',
          value: helper.formatNumber(body.count.twitter),
          short: true
        },
        {
          title: 'Google+',
          value: helper.formatNumber(body.count['google-plus']),
          short: true
        },
        {
          title: 'LinkedIn',
          value: helper.formatNumber(body.count.linkedin),
          short: true
        },
        {
          title: 'Pinterest',
          value: helper.formatNumber(body.count.pinterest),
          short: true
        }
      ];

      // Attachments
      var attachments = [{
        pretext: ':link: *Link Social Stats*',
        title: body.url,
        title_link: body.url, // eslint-disable-line camelcase
        fallback: helper.getFallbackMessage(fields),
        mrkdwn_in: ['pretext', 'text'], // eslint-disable-line camelcase
        color: config.defaultColor,
        fields: fields
      }];

      return {
        attachments: attachments
      };
    });
  }
};
