var https = require('https');

https.request('https://api.kraken.com/0/public/OHLC?pair=ETHXBT&since=1455572580', function(res){
  res.on('data', function(d){
    console.log('body' + d);
  })
}).end();


