var Population = function(ops){
  this.$el = ops.el;

  this.render();
}

Population.prototype = {

  startYear: 1900,

  render: function(){
    this.chart = new BarChart({
      el: this.$el.find('.bar-chart')
    });

    this.faces = new Faces({
      el: this.$el.find('.faces')
    });
  },

  setYear: function(year){
    this.chart.setData(this.getPopulationDataForYear(year));
    this.faces.setData(this.getFaceDataForYear(year));
  },

  getPopulationDataForYear: function(year){
    var idx = (year - this.startYear) / 10
      , data = populationData[idx];

    return data || {};
  },

  getFaceDataForYear: function(year){
    var senators = senatorDataByYear[year - Senate.prototype.startYear] || {}
      , numSenators = senators.senators && senators.senators.length || 0
      , percentages = this.getPopulationDataForYear(year)
      , faces = [];

    console.log(senators,numSenators,percentages);

    for(var key in percentages){
      if(key !== 'year'){
        var numFaces = Math.floor(percentages[key] * numSenators);
        for(var i=0;i<numFaces;i++){
          faces.push({
            imageId: null,
            ethnicity: key
          });
        }
      }
    }

    console.log(faces);

    return faces;
  }
}

