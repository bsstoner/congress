function truncate(str, maxLength, suffix) {
    if(str.length > maxLength) {
        str = str.substring(0, maxLength + 1);
        str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
        str = str + suffix;
    }
    return str;
}

var margin = {top: 70, right: 55, bottom: 0, left: 25},
    width = 960,
    height = 140;

var start_year = 1950,
    end_year = 2010;

var c = d3.scale.category20();

var x = d3.scale.linear()
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var formatYears = d3.format("0000");
xAxis.tickFormat(formatYears);

var svg = d3.select("#bubble-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", margin.left + "px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*
var data = [ [1850, 9.7], [1860, 13.2], [1870, 14.4], [1880, 13.3], [1890, 14.8],
                    [1900, 13.6], [1910, 14.7], [1920, 13.2], [1930, 11.6], [1940, 8.8],
                    [1950, 6.9], [1960, 5.4], [1970, 4.7], [1980, 6.2], [1990, 7.9],
                    [2000, 11.1], [2010, 13]];
                    */
var data = [ [1950, 6.9], [1960, 5.4], [1970, 4.7], [1980, 6.2], [1990, 7.9],
                    [2000, 11.1], [2010, 13]];

var dataAbs = [ [1950, 10347395], [1960, 9738091], [1970, 9619302], [1980, 14079906], [1990, 19767316],
                    [2000, 31107889], [2010, 40377757]];

    x.domain([start_year, end_year]);
    var xScale = d3.scale.linear()
        .domain([start_year, end_year])
        .range([0, width]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(xAxis);

        var g = svg.append("g").attr("class","journal");

        var circles = g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle");

        var aScale = d3.scale.linear()
            .domain([0, 13])
            .range([10, 8000]);

        var text = g.selectAll(".absolutes")
            .data(dataAbs)
            .enter().append("text")
            .attr("class", "absolutes")
            .style("fill", c[0])
            .style("display", "none")
            .attr("y", 79)
            .attr("x",function(d, i) { return xScale(d[0]); })
            .style("text-anchor", "middle")
            .text(function(d){ return numberWithCommas(d[1]) ; })
            .on("mouseout", mouseout);

        circles
            .attr("cx", function(d, i) { return xScale(d[0]); })
            .attr("cy", 75)
            .attr("r", function(d) { return Math.sqrt(aScale(d[1])) / Math.PI; })
            .attr("class","value")
            .style("fill", function(d) { return c(0); })
            .text(function(d){ return "%" })
            //.on("mousemove", revealAbsolutes);

        var text = g.selectAll(".labels")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "labels");

        text
            .attr("y", 79)
            .attr("x",function(d, i) { return xScale(d[0]); })
            .attr("class","value")
            .style("fill", "#fff")//function(d) { return c(0); })
            .style("text-anchor", "middle")
            .text(function(d){ return d[1] + "%"; })
            .on("mousemove", revealAbsolutes);


    function revealAbsolutes() {
        d3.selectAll(".absolutes").style("display", "block");
        d3.selectAll(".label").style("display", "none");
        d3.selectAll(".value").style("display", "none");
    }

    function mouseover(p) {
        var g = d3.select(this).node().parentNode;
        d3.selectAll(".absolutes").style("display", "block");
        d3.selectAll(".label").style("display", "none");
        d3.select(g).selectAll("circle").style("display","none");
        d3.select(g).selectAll("text.value").style("display","block");
    }

    function mouseout(p) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).selectAll("circle").style("display","block");
        d3.selectAll(".value").style("display", "block");
        d3.selectAll(".absolutes").style("display", "none");
        d3.selectAll(".label").style("display", "block");
    }

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }