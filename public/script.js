(function() {
    //d3.json("../data/historical-national.json", function (data) {
        d3.csv("../data/historical.csv", function(d) {
            return {
                year: new Date(+d.Year, 0, 1),
                white: d.white,
                black: d.Black,
                indian: d.American_indian,
                asian: d.Asian,
                hispanic: d.Hispanic
            };
            }, function(error, data){

                    var allData = [];
                    for (var j = 0; j < data.length; j++) {
                      var first = data[j];
                      var white = Math.floor(first.white*100),
                          black = Math.floor(first.black*100),
                          asian = Math.floor(first.asian*100),
                          hispanic = Math.floor(first.hispanic*100),
                          indian = 100 - white - black - asian - hispanic;                      
                      var this_data = []
                      for (var i = 0; i < 100; i++) {
                          if (i < white) 
                              this_data.push("steelblue");
                          else if (i >= white && i < white + black)
                              this_data.push("black");
                          else if (i >= white + black && i < white + black + asian)
                              this_data.push("purple");
                          else if (i >= white + black + asian && i < white + black + asian + hispanic)
                              this_data.push("red");
                          else
                              this_data.push("green");
                        }
                        allData.push(this_data);
                  }

        var margin = { top: 50, right: 0, bottom: 100, left: 30 },
                width = 1200 - margin.left - margin.right,
                height = 430 - margin.top - margin.bottom;
                colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0"],
                cell = 50;
        var svg = d3.select("#chart").append("svg")
                              .attr("width", width + margin.left + margin.right)
                              .attr("height", height + margin.top + margin.bottom)
                              .append("g")
                              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


              var tweenDate = function () {
                  var day = d3.interpolateNumber(0, 11);
                  return function (t) { updateAll(day(t)); };
              };

              var updateAll = function (day) {
                  day = Math.floor(day);
                  if (day >= 0 && day < 11) {
                      update(day);
                  }
              };

                      var grid = function (rects) {
                            rects
                                  .attr("x", function(d, i) { return (i % 20) * cell; })
                                  .attr("y", function(d, i) { return Math.floor(i/20) * cell; })
                                  .attr("rx", 4)
                                  .attr("ry", 4)
                                  .style("fill", function(d){ return d; })
                                  .attr("class", "hour bordered")
                      }     

        var heatMap = svg.selectAll(".hour")
                                  .data(allData[0])
                                  .enter().append("rect")
                                  .attr("rx", 4)
                                  .attr("ry", 4)
                                  .attr("class", "hour bordered")
                                  .attr("width", cell)
                                  .attr("height", cell)
                                  .style("stroke", "#fff")
                                .style("stroke-width", "1px")
                                .call(grid);
              var update = function (day) {
                    heatMap.data(allData[day]).call(grid);
                };

              svg.transition()
                .duration(10000)
                .ease("linear")
                .tween("day", tweenDate);






    /*    heatMap.transition().duration(1000)
                            .style("fill", function(d) { return colorScale(d.value); });*/
  });
})();