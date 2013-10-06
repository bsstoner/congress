var Senate = function(ops){
  this.$el = ops.el;

  this.render();
}

Senate.prototype = {

  startYear: 1789,
  chartHeight: 20,

  imagePrefix: 'images/senate/',
  imageExtension: '.jpg',

  render: function(){
    this.chart = new BarChart({
      el: this.$el.find('.bar-chart')
    });

    this.faces = new Faces({
      el: this.$el.find('.faces')
    });
  },

  updateSize: function(height,top){
    this.$el.css({
      height: height + 'px',
      top: top + 'px'
    });

    this.faces.updateSize(height - this.chartHeight,this.chartHeight);
  },

  setYear: function(year){
    this.chart.setData(this.getChartDataForYear(year));
    this.faces.setData(this.getFaceDataForYear(year));
  },


  getYearIdx: function(year){
    return year - this.startYear;
  },

  getIdsForYear: function(year){
    var data = senatorDataByYear[ this.getYearIdx(year) ];
    return (data && data.senators) || [];
  },

  getSenator: function(id){
    return senatorData[id] || {};
  },

  getChartDataForYear: function(year){
    var ids = this.getIdsForYear(year)
      , data = {}
      , total = 0;

    _.forEach(ids, function(id){
      var eth = this.getSenator(id).ethnicity;

      if(!data[eth]){
        data[eth] = 0;
      }

      data[eth]++;
      total++;
    },this);

    // turn sum into %'s:
    if(total){
      for(var key in data){
        data[key] = data[key] / total;
      }
    }

    return data;
  },

  getFaceDataForYear: function(year){
    var ids = this.getIdsForYear(year)
      , data = [];

    _.forEach(ids,function(id){
      var senatorData
      data.push({
        image: this.imagePrefix + id + this.imageExtension,
        ethnicity: this.getSenator(id).ethnicity
      });
    },this);

    return data;
  }

}
