var Parser = require('./parser/parser.js')
var Fetcher = require('./parser/textFetcher.js')

var fetcher = new Fetcher()
var parser = new Parser()

var result = fetcher.fetchFromUrl('http://www.nhc.noaa.gov/archive/2017/al11/al112017.discus.001.shtml')
result.then(function(text) {
  var parsed = parser.parse(text)
  console.log(JSON.stringify(parsed))

})
