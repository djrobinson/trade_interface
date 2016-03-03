var Tick = require('mongoose').model('Tick');

//TODO: Transfer the following to JS
exports.get = function(req, res, next){
  {$project:{
        date: 1,
        volume: 1,
        price: 1,
        range: {
          $concat: [{
            $cond: [ { "$lte": ["$price", 100] }, "range 0-100", "" ]
          }, {
            $cond: [ { "$and": [
              { $gte: ["$price", 101] },
              { $lt:  ["$price", 125] }
            ] }, "range 101-125", "" ]
          }, {
            $cond: [ { "$and": [
              { $gte: ["$price", 126] },
              { $lt:  ["$price", 150] }
            ] }, "range 126-150", "" ]
          }, {
            $cond: [ { "$and": [
              { $gte: ["$price", 151] },
              { $lt:  ["$price", 175] }
            ] }, "range 151-175", "" ]
          }, {
            $cond: [ { "$and": [
              { $gte: ["$price", 176] },
              { $lt:  ["$price", 200] }
            ] }, "range 176-200", "" ]
          }, {
            $cond: [ { "$and": [
              { $gte: ["$price", 201] },
              { $lt:  ["$price", 225] }
            ] }, "range 201-225", "" ]
          },{
            $cond: [ { "$and": [
              { $gte: ["$price", 226] },
              { $lt:  ["$price", 250] }
            ] }, "range 226-250", "" ]
          },{
            $cond: [ { "$and": [
              { $gte: ["$price", 250] },
              { $lt:  ["$price", 275] }
            ] }, "range 250-275", "" ]
          },  ]
        } }},
    {$group:
        {_id : "$range",
         volume: {"$sum": "$volume"}}
         }
}