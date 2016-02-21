var express = require('express');
var router = express.Router();
var tick = require('./services');
var https = require('https');
var http = require('http');
var request = require('request');




router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

router.get('/ohlc', (req, res) => {
  var body = '';
  https.get('https://api.kraken.com/0/public/OHLC?pair=ETHXBT', (response) => {
    console.log('statusCode: ', response.statusCode);
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      var parsed = JSON.parse(body);
      addTicks();
      res.json(parsed);
    })
  }).on('error', (e) => {
    console.log(e);
  });
});


//Need to add set interval
router.post('/tick', tick.create);

router.get('/tick', tick.get);

function addTicks(){
  http.get('http://localhost:5000/ohlc', (response) => {
    var body = '';
    console.log('internal status code: ', response.statusCode);
    response.on('data', (d) => {
      body += d;
    }).on('end', () => {
      var options = {
        method: 'POST',
        url: 'http://localhost:5000/tick',
        headers: {
          'content-type': 'application/json'
        },
        //Cahnge this to the proper model for Ticks
        body: { test: 'bliggity blah'},
        json: true
      }
      request.post(options, (err, response, body) => {
        console.log("Checkaroo", body);
      })
      var parsed = JSON.parse(body);
      console.log(parsed);
    })
  });
}

//TODO create the route that will call the mongoose connection

module.exports = router;
