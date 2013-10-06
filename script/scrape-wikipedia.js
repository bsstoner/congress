var input = require('../data/legislators-historical-c')
  , fs = require('fs')
  , async = require('async')
  , jsdom = require('jsdom')
  , request = require('request')

  , utils = require('./utils')
  , startFrom = 0
  , counter = 0;

var downloadImage = function(uri, filename){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename));
  });
};

var hasWikipediaLink = function(record){
  return record.id && record.id.wikipedia;
}

async.forEachSeries(input, function(record,fn){
  counter++;
  console.log("starting ", counter, " out of ",input.length);

  if(counter >= startFrom && utils.isSenator(record) && hasWikipediaLink(record)){
    var wUrl = 'https://en.wikipedia.org/wiki/' + record.id.wikipedia.replace(' ','_');
    jsdom.env(wUrl,['http://code.jquery.com/jquery-latest.min.js'],function(err,window){
      var $ = window.jQuery
        , rightImages = $('.infobox.vcard img')
        , profileImage = rightImages && rightImages.length && rightImages[0]
        , imageSrc = profileImage && $(profileImage).attr('src')
        , imageUrl = imageSrc && imageSrc.replace('/','http:/')
        , bestId = utils.getBestId(record);

      if(imageUrl){
        downloadImage(imageUrl, '../public/images/senate/' + bestId + '.jpg');
        setTimeout(fn,7000);
      } else {
        console.log("missing image url",record.name);
        fn();
      }
    });
  } else {
    fn();
  }
});


