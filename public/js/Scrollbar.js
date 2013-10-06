var Scrollbar = function(ops){
  this.$el = ops.el

  this.$play = this.$el.find('.play-button');
  this.$track = this.$el.find('.scroll-bar-track');
}

Scrollbar.prototype = {

  trackLeftMargin: 100,
  trackRightMargin: 30,

  updateSize: function(w,h){
    this.$track.css({
      width: (w - this.trackLeftMargin - this.trackRightMargin) + 'px'
    });
  }

}
