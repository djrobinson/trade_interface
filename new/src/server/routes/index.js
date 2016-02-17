var express = require('express');
var router = express.Router();
var ohlc = require('./services');
var https = require('https');


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

router.get('/ohlc', function(req, res) {
  var body = '';
  var ohlc = https.get('https://api.kraken.com/0/public/OHLC?pair=ETHXBT', (response) => {
    console.log('statusCode: ', response.statusCode);
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', function(){
      var parsed = JSON.parse(body);
      res.json(parsed);
    })
  }).on('error', (e) => {
    console.error(e);
  });
});

// router.get('/ohlc', function(req, res)

module.exports = router;
