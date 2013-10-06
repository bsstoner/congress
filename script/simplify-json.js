var input = require('../data/legislators-historical')
  , input2 = require('../data/legislators-current')
  , fs = require('fs')
  , async = require('async')

  , utils = require('./utils')
  , years = []
  , senators = {}
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

input = input.concat(input2);

input.forEach(function(record){
  counter++;

  if(utils.isSenator(record)){
    var id = utils.getBestId(record)
      , servedYears = utils.getYearsServedInSenate(record);

    senators[id] = {
      name: record.name,
      ethnicity: 'white'
    };

    servedYears.forEach(function(yearNum){
      var year = years[yearNum - startYear];

      if(year){
        year.senators.push(id);
      }
    })
  }
});

var byYearFile = fs.createWriteStream("../public/data/senators-by-year.js")
  , senatorFile = fs.createWriteStream("../public/data/senators.js");

senatorFile.write("var senatorData = " + JSON.stringify(senators));
byYearFile.write("var senatorDataByYear = " + JSON.stringify(years));
