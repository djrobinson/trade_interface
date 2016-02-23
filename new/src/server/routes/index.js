var express = require('express');
var router = express.Router();
var tick = require('./tickService');
var last = require('./lastService');
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
      // addTicks();
      res.json(parsed);
    })
  }).on('error', (e) => {
    console.log(e);
  });
});


//Need to add set interval
router.post('/tick', tick.create);

router.get('/tick', tick.get);

router.post('/last', last.create);

router.get('/last', last.get);
var lastTick;

setInterval(addTicks, 5000);

function addTicks(){
  https.get('https://api.kraken.com/0/public/Trades?pair=ETHXBT&since='+lastTick , (response) => {
    var body = '';
    console.log('internal status code: ', response.statusCode);
    response.on('data', (d) => {
       body += d;
    }).on('end', () => {
      var parsed = JSON.parse(body);
      parsed.result.XETHXXBT.forEach(function(tick){
          var options = {
          method: 'POST',
          url: 'http://localhost:5000/tick',
          headers: {
            'content-type': 'application/json'
          },
          //Cahnge this to the proper model for Ticks
          body: {
            price: tick[0],
            volume: tick[1],
            time: tick[2],
            buysell: tick[3],
            marketlimit: tick[4],
            misc: tick[5]
          },
          json: true
        }
        lastTick = parsed.result.last;
        request.post(options, (err, response, body) => {
          console.log(lastTick);
        })
        var lastOptions = {
          method: 'POST',
          url: 'http://localhost:5000/last',
          headers: {
            'content-type': 'application/json'
          },
          body: {
            last: lastTick
          },
          json: true
        }
        request.post(lastOptions, (err, response, body) =>{
          if (err) {
            console.error(err);
          } else {
            console.log("Tick added")
          }
        })
      })

    })
  });
}

//TODO create the route that will call the mongoose connection

module.exports = router;
