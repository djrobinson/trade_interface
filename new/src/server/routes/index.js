var express = require('express');
var router = express.Router();

var https = require('https');
var http = require('http');
var request = require('request');
var path = require('path');
var passport = require('passport');

var ohlc = require('./ohlcService');
var tick = require('./tickService');
var last = require('./lastService');

var app = express();
var flash=require("connect-flash");
app.use(flash());

// var getTicks = require('../indicators/sma');

// getTicks();

//Signup form
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client', 'login.html'));
});

router.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

  // //Logout

  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });

router.post('/tick', tick.create);

router.get('/tick/:minDate/:maxDate', tick.get);

router.post('/last', last.create);

router.get('/last', last.get);

router.get('/ohlc', ohlc.get);

router.get('/ohlc/:minDate/:maxDate', ohlc.get);



// setInterval(addTicks, 10000);

function addTicks(){

//////////////// FIRST GET ////////////////////////
  http.get('http://localhost:5000/last', (response) => {
    var last = '';
    response.on('data', (data) => {
      last += JSON.parse(data).last;
      console.log('Last tick to be used in request is ', last);
      }).on('end', () =>{

//////////////// SECOND GET ////////////////////////
        https.get('https://api.kraken.com/0/public/Trades?pair=ETHXBT&since='+last , (response) => {
          var body = '';
          response.on('data', (d) => {
             body += d;
          }).on('end', () => {
            var parsed = JSON.parse(body);
            var resultArr = parsed.result.XETHXXBT;
            var lastTick = parsed.result.last;

            if (resultArr.length > 0){


//////////////// THIRD BREAKPOINT ////////////////////////
              resultArr.forEach(function(tick){
                var d = new Date(0);
                var formDate = d.setUTCSeconds(tick[2]);
                var passDate = new Date(formDate);
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
                    time: passDate,
                    buysell: tick[3],
                    marketlimit: tick[4],
                    misc: tick[5]
                  },
                  json: true
                }


//////////////// FOURTH BREAKPOINT ////////////////////////
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

//////////////// FIFTH BREAKPOINT ////////////////////////
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

module.exports = router;
