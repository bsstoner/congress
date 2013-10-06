var width = 960,
	height = 550;

var quantize = d3.scale.quantize()
	.domain([0, .10])
	.range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var path = d3.geo.path();

var svg = d3.select("#map").append("svg")
	.attr("width", width)
	.attr("height", height);

function ready(error, us, immfb) {
	var rateById = {};

	immfb.forEach(function(d) { rateById[d.id] = +d.pctfb; });

	svg.append("g")
	   	.attr("id", "counties")
		.attr("class", "counties")
	    .selectAll("path")
			.data(topojson.object(us, us.objects.counties).geometries)
	    .enter().append("path")
			.attr("class", function(d) { return quantize(rateById[d.id]); })
			.attr("d", path);

}

var gradcolors = [{ "offset": "0%", "stopcolor": "rgb(198, 219, 239)", "stopopacity": "1" },
	            { "offset": "100%", "stopcolor": "rgb(8, 48, 107)", "stopopacity": "1" }];

	svg.append('svg:defs')
		.append("linearGradient")
			.attr('id', 'legendgrad')

	var diventer = d3.select("#legendgrad").selectAll("stop")
		.data(gradcolors)
		.enter().append("stop")
			.attr("offset", function(d) { return d.offset; })
			.style("stop-color", function(d) { return d.stopcolor; })
			.style("stop-opacity", function(d) { return d.stopopacity; });

	svg.append('svg:rect')
		.attr('id','legend')
		.attr('transform', 'translate(405, 505)')
		.attr('width','150')
		.attr('height','20')
		.attr('fill', 'url(#legendgrad)')

	svg.append('svg:text')
		.attr('id','minlabel')
		.attr('transform', 'translate(405, 500)')
		.attr('font-family','Arial')
		.text('0%')

		svg.append('svg:text')
		.attr('id','maxlabel')
		.attr('transform', 'translate(555, 500)')
		.attr('text-anchor', 'end')
		.attr('font-family','Arial')
		.text('>10%')

		svg.append('svg:text')
		.attr('id','legendlabel')
		.attr('transform', 'translate(480, 545)')
		.attr('text-anchor', 'middle')
		.attr('font-family','Arial')
		.text('Immigrant Population by county')


function changemapcolor() {
	var county_yn = document.getElementById("county_yn").value;
	if (county_yn==1) {
		d3.selectAll(".q0-9").style("fill","rgb(247,251,255)");
		d3.selectAll(".q1-9").style("fill","rgb(222,235,247)");
		d3.selectAll(".q2-9").style("fill","rgb(198,219,239)");
		d3.selectAll(".q3-9").style("fill","rgb(158,202,225)");
		d3.selectAll(".q4-9").style("fill","rgb(107,174,214)");
		d3.selectAll(".q5-9").style("fill","rgb(66,146,198)");
		d3.selectAll(".q6-9").style("fill","rgb(33,113,181)");
		d3.selectAll(".q7-9").style("fill","rgb(8,81,156)");
		d3.selectAll(".q8-9").style("fill","rgb(8,48,107)");
		d3.select("#legend").style("display","block");
		d3.select("#minlabel").style("display","block");
		d3.select("#maxlabel").style("display","block");
		d3.select("#legendlabel").style("display","block");
		}
}

queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.tsv, "data/immfb.tsv")
    .await(ready);