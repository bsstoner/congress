var Faces = function(ops){
  this.$el = ops.el;

  this.render();
}

Faces.prototype = {

  rows: 5,
  cols: 20,

  imgPrefix: 'images/senate/',
  imgExtension: '.jpg',

  render: function(){
    var numFaces = this.rows * this.cols
      , width = (1/this.cols)*100
      , height = (1/this.rows)*100;

    for(var i=0;i<this.rows;i++){
      var top = i * height;

      for(var j=0;j<this.cols;j++){
        var left = j * width;

        this.$el.append([
          '<li style="width:' + width + '%;height:' + height + '%;top:' + top + '%;left:' + left + '%">',
            '<img src="" />',
            '<div class="face-overlay white"></div>',
          '</li>'
        ].join(""));
      }
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
    this.$el.css({
      width: w + 'px',
      height: h + 'px'
    });
  }

}
