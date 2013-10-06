var csv = require('csv')
  , fs = require('fs')
  , data = []
  , input = '../data/population_data.csv'
  , output = '../public/data/population.js';

csv()
  .from.path(input, { delimiter: ','})
  .on('record', function(row,index){
    // skip first row column headers:
    if(index){
      data.push({
        year: parseInt(row[0]),
        white: parseFloat(row[1]),
        black: parseFloat(row[2]),
        natives: parseFloat(row[3]),
        asian: parseFloat(row[4]),
        hispanic: parseFloat(row[5])
      });
    }
  })
  .on('end',function(){
    var out = fs.createWriteStream(output);
    out.write("var populationData = " + JSON.stringify(data));
  });
