var Scrollbar = function(ops){
  this.$el = ops.el

  this.$play = this.$el.find('.play-button');
  this.$track = this.$el.find('.scroll-bar-track');
  this.$handle = this.$el.find('.scroll-bar-handle');
}

Scrollbar.prototype = {

  trackLeftMargin: 100,
  trackRightMargin: 30,
  trackW: 0,

  updateSize: function(w,h){
    this.trackW = w;
    this.$track.css({
      width: (w - this.trackLeftMargin - this.trackRightMargin) + 'px'
    });
  },

  setYear: function(year){
    var left = (year - 1950) * this.trackW / 60;
    this.$handle.html(year).css({ 
      "margin-left": left,
      transition: "margin-left 1s"
    });
  }

}
