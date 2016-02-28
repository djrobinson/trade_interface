var express = require('express');
var router = express.Router();

var https = require('https');
var http = require('http');
var request = require('request');

var ohlc = require('./ohlcService');
var tick = require('./tickService');
var last = require('./lastService');



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

// router.get('/ohlc', (req, res) => {
//   var body = '';
//   https.get('https://api.kraken.com/0/public/OHLC?pair=ETHXBT', (response) => {
//     response.on('data', (d) => {
//       body += d;
//     });
//     response.on('end', () => {
//       var parsed = JSON.parse(body);
//       // addTicks();
//       res.json(parsed);
//     })
//   }).on('error', (e) => {
//     console.log(e);
//   });
// });


//Need to add set interval

router.post('/tick', tick.create);

router.get('/tick', tick.get);

router.post('/last', last.create);

router.get('/last', last.get);

router.get('/ohlc', ohlc.get);


setInterval(addTicks, 10000);

function addTicks(){
  http.get('http://localhost:5000/last', (response) => {
    var last = '';
    response.on('data', (data) => {
      last += JSON.parse(data).last;
      console.log('Last tick to be used in request is ', last);
      }).on('end', () =>{
        https.get('https://api.kraken.com/0/public/Trades?pair=ETHXBT&since='+last , (response) => {
          var body = '';
          response.on('data', (d) => {
             body += d;
          }).on('end', () => {
            var parsed = JSON.parse(body);
            var resultArr = parsed.result.XETHXXBT;
            var lastTick = parsed.result.last;
            if (resultArr.length > 0){
              resultArr.forEach(function(tick){
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

                request.post(options, (err, response, body) => {
                })
              });
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
                }
              });
            }
          });
        });
      });
    });
}

//TODO create the route that will call the mongoose connection

module.exports = router;
