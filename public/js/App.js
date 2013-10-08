var app = {

  sidebarWidth: 0,
  scrollbarHeight: 40,
  headerHeight: 50,

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
    this.setYear(1950);

    // event handlers:
    $(window).resize(_.bind(this._onWindowResized,this));
    this.scrollbar.on('changed',_.bind(this._onScrollbarChanged,this));

    $('.flip-dots').bind('click',_.bind(this._onFlipDots,this));
    $('.flip-faces').bind('click',_.bind(this._onFlipFaces,this));

    this.scrollbar._startStop();
  },

  scaleToWindow: function(){
    var w = this.wWidth()
      , h = this.wHeight()
      , sectionHeight = (h - this.headerHeight - this.scrollbarHeight) / 2

      , senateTop = this.headerHeight
      , scrollTop = this.headerHeight + sectionHeight
      , populationTop = scrollTop + this.scrollHeight;

    this.senate.updateSize(sectionHeight,senateTop);
    this.population.updateSize(sectionHeight,populationTop);

    this.scrollbar.updateSize(w,scrollTop);
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

  _onFlipDots: function(e){
    e.preventDefault();

    if(!this._isFlipped){ return; }
    $('.active').removeClass('active');
    $('body').removeClass('flipped');
    $('.flip-dots').addClass('active');
    this._isFlipped = false;
  },

  _onFlipFaces: function(e){
    e.preventDefault();

    if(this._isFlipped){ return; }
    $('.active').removeClass('active');
    $('body').addClass('flipped');
    $('.flip-faces').addClass('active');
    this._isFlipped = true;
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

