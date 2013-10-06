var Faces = function(ops){
  this.$el = ops.el;

  this.render();
}

Faces.prototype = {

  numFaces: 50,
  marginPercent: 0.10,

  imgPrefix: 'images/senate/',
  imgExtension: '.jpg',

  render: function(){
    for(var i=0;i<this.numFaces;i++){
      this.$el.append([
        '<li>',
          '<img src="" />',
          '<div class="face-overlay white"></div>',
        '</li>'
      ].join(""));
    }

    this.$faces = this.$el.find('li');
  },

  setData: function(data){
    _.forEach(this.$faces,function(face,i){
      var faceData = data[i]
        , $face = $(this.$faces[i])

      if(faceData){
        var img = faceData.imageId
          , imgTag = (img) ? '<img src="' + this.imgPrefix + img + this.imgExtension + '" />' : '';

        $face.html(imgTag + '<div class="face-overlay ' + faceData.ethnicity + '"></div>');
      } else {
        $face.empty();
      }
    },this);
  },

  useDots: function(){
    if(this._usingDots){
      this.$el.removeClass('use-dots');
    } else {
      this.$el.addClass('use-dots');
    }
  },

  updateSize: function(w,h){
    // figure out size/margin
    // for each face based on
    // the total available area:

    var area = w*h
      , faceArea = area / this.numFaces
      , faceWidth = Math.sqrt(faceArea)
      , faceMargin = faceWidth * this.marginPercent;

    faceWidth = faceWidth - faceMargin;

    this.$el.css({
      width: w + 'px',
      height: h + 'px'
    });

    this.$faces.css({
      width: faceWidth + 'px',
      height: faceWidth + 'px',
      margin: (faceMargin/2) + 'px'
    });
  }

}
