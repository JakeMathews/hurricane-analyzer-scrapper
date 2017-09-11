const request = require('request-promise')
const cheerio = require('cheerio')

class Fetcher {
  fetchFromUrl(url) {
    var options = {
      uri: url,
      transform: function(body) {
        return cheerio.load(body);
      }
    }

    var text = null
    text = request(options).then(function($) {
      $('.textproduct ').filter(function() {
        var data = $(this);
        text = data.children().first().text()
      })
      return text
    })

    return text
  }
}

module.exports = Fetcher
