var input = require('../data/legislators-historical')
  , fs = require('fs')
  , async = require('async')

  , utils = require('./utils')
  , years = []
  , startYear = 1789
  , endYear = 2013;


// for each year, go through and create an object 
// with an empty array for senators:

for(var i=startYear;i<=endYear;i++){
  years.push({
    year: i,
    senators: []
  });  
}

// now go through the people and slot
// them into the year buckets based on the
// terms served:

var counter = 0;

input.forEach(function(record){
  counter++;
  //console.log(counter,"of",input.length);

  if(utils.isSenator(record)){
    var id = utils.getBestId(record)
      , servedYears = utils.getYearsServedInSenate(record);

    servedYears.forEach(function(yearNum){
      var year = years[yearNum - startYear];

      console.log(yearNum,yearNum-startYear);

      if(year){
        year.senators.push({
          id: id,
          name: record.name,
          bio: record.bio
        });
      }
    })
  }
});

var outStream = fs.createWriteStream("../public/data/senators-by-year.js");

outStream.write(JSON.stringify(years));
