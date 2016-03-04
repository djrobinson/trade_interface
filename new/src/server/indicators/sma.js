var http = require('http');

function getTicks(){
  http.get('http://localhost:5000/tick', (res)=>{
    var ticks = [];
    res.on('data', (data)=>{
      ticks.push(data);
    }).on('end', () =>{
      totalTicks(JSON.parse(ticks));
    })
  })
}

var totalTicks = function(ticks){
  var total = 0;
  ticks.map((tick)=>{
    console.log(tick.price);
    total += tick.price;
  });
  console.log("average is", total/(ticks.length+1));
};

module.exports = getTicks;