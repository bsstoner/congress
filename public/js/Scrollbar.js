var Scrollbar = function(ops){
  this.$el = ops.el

  this.$play = this.$el.find('.play-button');
  this.$track = this.$el.find('.scroll-bar-track');
  this.$handle = this.$el.find('.scroll-bar-handle');

  this.$track.bind('mouseup',_.bind(this._onTrackMouseUp,this));
  this.$handle.bind('mousedown',_.bind(this._onHandleMouseDown,this));

  this.handleWidth = this.$handle.innerWidth();
  this.handleLeft = 0;

  this._onMouseMoveFn = _.bind(this._onMouseMove,this);
  this._onMouseUpFn = _.bind(this._onMouseUp,this);

  this._clickOffset = 0;
  this._callbacks = [];

  this.$play.bind("click", _.bind(this._startStop, this));
}

Scrollbar.prototype = {

  startYear: 1900,
  endYear: 2010,

  trackLeftMargin: 100,
  trackRightMargin: 30,

  updateSize: function(w,h){
    this.top = this.$el.offset().top;
    this.width = (w - this.trackLeftMargin - this.trackRightMargin);
    this.maxPct = 100 - ((this.handleWidth / this.width)*100);
    this.scrollableWidth = this.width * (this.maxPct/100);

    this.$track.css({
      width: this.width + 'px'
    });
  },

  on: function(evt,fn){
    if(!this._callbacks[evt]){
      this._callbacks[evt] = [fn];
    } else {
      this._callbacks[evt].push(fn);
    }
  },

  trigger: function(evt,data){
    if(!this._callbacks[evt]){ return; }
    _.forEach(this._callbacks[evt],function(fn){
      fn(data);
    });
  },

  setYear: function(year,pct){
    if(year === this.year){ return; }

    this.year = year;
    this.year = Math.min(this.year,this.endYear);
    this.year = Math.max(this.year,this.startYear);

    pct = ((this.year - this.startYear) * 100) / (this.endYear - this.startYear);

    this.handleLeft = this.scrollableWidth * (pct/100);

    this.$handle.css({
      left: this.handleLeft + 'px'
    }).text(this.year);

    this.trigger('changed',this.year);
  },

  jumpToPercent: function(pct){
    this.setYear(Math.round(((this.endYear - this.startYear) * pct) + this.startYear));
  },

  _attachMouseDownEvents: function(){
    $(document).bind('mousemove',this._onMouseMoveFn);
    $(document).bind('mouseup',this._onMouseUpFn);
  },

  _removeMouseDownEvents: function(){
    $(document).unbind('mousemove',this._onMouseMoveFn);
    $(document).unbind('mouseup',this._onMouseUpFn);
  },

  _toLocalPos: function(e){
    return ((e.touches) ? e.touches[0].pageX : e.clientX) - this.trackLeftMargin - this._clickOffset;
  },

  _toPercent: function(e){
    return this._toLocalPos(e) / this.scrollableWidth;
  },

  _onTrackMouseUp: function(e){
    this.isPlaying = false;
    this._clickOffset = 0;
    this.jumpToPercent( this._toPercent(e) );
  },

  _onHandleMouseDown: function(e){
    e.stopPropagation();
    this.isPlaying = false;

    var localX = this._toLocalPos(e)
    this._clickOffset = localX - this.handleLeft;

    this._attachMouseDownEvents();
  },

  _onMouseMove: function(e){
    e.stopPropagation();
    this.jumpToPercent( this._toPercent(e) );
  },

  _onMouseUp: function(e){
    e.stopPropagation();
    this._removeMouseDownEvents();
  },

  _addOneYear: function() {
    if (!this.isPlaying){
      this.$play.text('4');
      return;
    }
    if (this.year > 2009) {
      this._startStop();
    } else {
      this.setYear(this.year + 1);
      window.setTimeout(_.bind(this._addOneYear, this), 500);
    }
  },

  _startStop: function(e) {
      if (this.isPlaying) {
        this.isPlaying = false;
      } else {
        this.$play.text('5');
        this.isPlaying = true;
        this._addOneYear();
      }
      return;
  }

}
