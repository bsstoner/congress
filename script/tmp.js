var input = require('../data/legislators-current.json')
  , async = require('async')
  , jsdom = require('jsdom');

async.forEachSeries(input, function(record){
  if(record.id.wikipedia){
    var wUrl = 'https://en.wikipedia.org/wiki/' + record.id.wikipedia.replace(' ','_');


    jsdom.env({
      html: 
    }, function(err,window){

    });
  } else {
    console.log("No Wikipedia",record.name);
  }
});


