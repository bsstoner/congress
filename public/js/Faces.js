var Faces = function(ops){
  this.$el = ops.el;

  this.render();
}

Faces.prototype = {

  rows: 5,
  cols: 20,

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
            '<div class="face-dot white"></div>',
          '</li>'
        ].join(""));
      }
    }

    this.$faces = this.$el.find('li');
    this.updateDotsSize();
  },

  sortOrder: ['white','black','asian','hispanic','natives','american_indian'],

  sortByEthnicity: function(data){
    return _.sortBy(data,function(f){
      return this.sortOrder.indexOf(f.ethnicity);
    },this);
  },

  setData: function(data){
    data = this.sortByEthnicity(data);

    // hack to massage the data so we always
    // have 100...
    if(data.length>100){
      data.splice(0,data.length - 100);
    }

    while(data.length<100){
      data.unshift({ ethnicity: 'white' });
    }

    _.forEach(this.$faces,function(face,i){
      var faceData = data[i]
        , $face = $(this.$faces[i])

      if(faceData){
        var imgTag = (faceData.image) ? '<img src="' + faceData.image + '" />' : '';

        $face.html(imgTag + '<div class="face-dot ' + faceData.ethnicity + '"></div>');
      } else {
        $face.empty();
      }
    },this);

    this.updateDotsSize();
  },

  useDots: function(){
    if(this._usingDots){
      this.$el.removeClass('use-dots');
    } else {
      this.$el.addClass('use-dots');
    }
  },

  updateSize: function(h,top){
    this.height = h;

    this.$el.css({
      height: this.height + 'px',
      top: (top || 0) + 'px'
    });
  },

  updateDotsSize: function(){
    var faceHeight = this.height / this.rows
      , margin = (faceHeight / 2) - 12.5;

    this.$el.find('.face-dot').css({
      'margin': margin + 'px auto'
    });
  }

}
