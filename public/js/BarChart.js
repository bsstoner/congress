var BarChart = function(ops){
  this.$el = ops.el;

  this.render();
};

BarChart.prototype = {

  races: [
    {
      id: 'white',
      label: 'White'
    },{
      id: 'black',
      label: 'Black'
    },{
      id: 'natives',
      label: 'Native American'
    },{
      id: 'asian',
      label: 'Asian'
    },{
      id: 'hispanic',
      label: 'Hispanic'
    }
  ],

  render: function(){
    this.$list = this.$el.find('ul');

    _.forEach(this.races,function(race){
      this.$list.append([
        '<li class="',race.id,'"></li>'
      ].join(""));
    },this);

    this.$bars = this.$el.find('li');
  },

  setData: function(data){
    _.forEach(this.races,function(race,i){
      var pct = data[race.id] || 0
        , $bar = $(this.$bars[i]);

      pct = Math.round(pct * 100);

      this.$bars[i].className = race.id;

      $(this.$bars[i]).css({
        width: pct + '%'
      });
    },this);
  }

}
