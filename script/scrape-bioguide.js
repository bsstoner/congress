var input = require('../data/senators-lite')
  , senators = []
  , fs = require('fs')
  , async = require('async')
  , request = require('request')
  , jsdom = require('jsdom')

  , counter = 0
  , startFrom = 30;

var downloadImage = function(uri, filename){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename));
  });
};

var existingImages = fs.readdirSync('../public/images/senate');

var isMissing = function(id){
  var imgName = id + '.jpg';
  return (existingImages.indexOf(imgName) < 0);
}

// turn the hash into an array:

for(var key in input){
  senators.push(key);
}

async.forEachSeries(senators, function(id,fn){
  counter++;
  console.log("starting ", counter, " out of ",senators.length);

  if(counter >= startFrom && isMissing(id)){
    var url = 'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + id;

    jsdom.env(url,['http://code.jquery.com/jquery-latest.min.js'],function(err,window){
      var $ = window.jQuery
        , tables = $('table')
        , contentTable = tables && tables[1]
        , images = contentTable && $(contentTable).find('img')
        , profileImage = images && images[0]
        , imageSrc = profileImage && $(profileImage).attr('src')
        , imageUrl = imageSrc && imageSrc.replace('/','http:/');

      if(imageUrl){
        console.log("downloading: ",id);
        downloadImage(imageUrl, '../public/images/senate/' + id + '.jpg');
        setTimeout(fn,7000);
      } else {
        console.log("missing image url",id);
        fn();
      }
    });
  } else {
    console.log("have image already");
    fn();
  }
});


