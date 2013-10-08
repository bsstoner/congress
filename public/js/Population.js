var Population = function(ops){
  this.$el = ops.el;

  this.render();
}

Population.prototype = {

  startYear: 1900,
  chartHeight: 20,

  imageCounts: {
    white: 100,
    asian: 17,
    black: 34,
    hispanic: 16,
    natives: 4
  },
  imagePrefix: 'images/population/',
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
    this.chart.setData(this.getPopulationDataForYear(year));
    this.faces.setData(this.getFaceDataForYear(year));
  },

  getPopulationDataForYear: function(year){
    var idx = (year - this.startYear) / 10
      , interpolated = this.interpolateData(populationData, idx);

    return interpolated || {};
  },

  interpolateData: function(data, idx) {
    var id0 = Math.floor(idx)
      , idF = (idx == id0)? id0 + 1 : Math.ceil(idx)
      , this_data = {};

    for (var i in data[id0]) {
      if (i !== "year" && idF < 12) {
        this_data[i] = data[id0][i] + (idx - id0) * (data[idF][i] - data[id0][i]);
      } else {
        this_data[i] = data[id0][i]; 
      }
    }

    return this_data;
  },

  getRandomImage: function(ethnicity){
    var num = this.imageCounts[ethnicity]
      , randomNum = Math.ceil(num * Math.random());

    return this.imagePrefix + ethnicity + '/' + randomNum + this.imageExtension;
  },

  getFaceDataForYear: function(year){
    var senators = senatorDataByYear[year - Senate.prototype.startYear] || {}
      , numSenators = 100//senators.senators && senators.senators.length || 0
      , percentages = this.getPopulationDataForYear(year)
      , faces = [];

    for(var key in percentages){
      if(key !== 'year'){
        var numFaces = Math.round(percentages[key] * numSenators);
        for(var i = 0; i < numFaces; i++){
          faces.push({
            image: this.getRandomImage(key),
            ethnicity: key
          });
        }
      }
    }

    return faces;
  }
}

