var express = require('express');
var router = express.Router();
// var ohlc = require('./services');
// var https = require('https');


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

// router.get('/ohlc', function(req, res) {
//   var data = https.request('https://api.kraken.com/0/public/OHLC?pair=ETHXBT&since=1455572580', function(res){
//     res.on('data', function(d){
//       // console.log('body' + d);
//       // console.log('body'+ d)
//       res.json(d);
//     })
//   }).end();
//   console.log(data);
//   res.send(data);
// });

// router.get('/ohlc', function(req, res)

module.exports = router;
