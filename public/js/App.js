var app = {

  sidebarWidth: 0,
  scrollbarHeight: 40,
  headerH: 50,

  init: function(){
    this.senate = new Senate({
      el: $('.senate')
    });

    this.population = new Population({
      el: $('.population')
    });

    this.scrollbar = new Scrollbar({
      el: $('.scroll-bar')
    });

    this.scaleToWindow();
    this.setYear(1900);

    // event handlers:
    $(window).resize(_.bind(this._onWindowResized,this));
    this.scrollbar.on('changed',_.bind(this._onScrollbarChanged,this));

    this.scrollbar._startStop();
  },

  scaleToWindow: function(){
    var w = this.wWidth()
      , h = this.wHeight() - this.headerH
      , facesWidth = w - this.sidebarWidth
      , facesHeight = (h - this.scrollbarHeight) / 2;

    this.population.$el.css({ height: facesHeight + 'px', top: (this.headerH + facesHeight + this.scrollbarHeight) + 'px' });
    this.senate.$el.css({ height: facesHeight + 'px', top: this.headerH + "px"});
    this.scrollbar.$el.css({ top: facesHeight + 'px', top: facesHeight + this.headerH + "px"});

    this.senate.chart.updateSize(w,facesHeight);
    this.senate.faces.updateSize(facesWidth,facesHeight);
    this.population.chart.updateSize(w,facesHeight);
    this.population.faces.updateSize(facesWidth,facesHeight);

    this.scrollbar.updateSize(w,this.scrollbarHeight);
  },

  setYear: function(year){
    this.senate.setYear(year);
    this.population.setYear(year);
    this.scrollbar.setYear(year);
  },

  _onScrollbarChanged: function(year){
    this.setYear(year);
  },

  _onWindowResized: function(e){
    this.scaleToWindow();
  },


  // utils for cross-browser width/height measurement:

  wWidth: function(){
    return (window.innerWidth !=null) ? window.innerWidth : (document.body != null) ? document.body.clientWidth : null;
  },

  wHeight: function(){
    return (window.innerHeight !=null) ? window.innerHeight : (document.body != null) ? document.body.clientHeight : null;
  }

};


$(document).ready(function(){
  app.init();
});

