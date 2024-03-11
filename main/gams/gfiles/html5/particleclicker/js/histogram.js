// A function to draw a histogram of given data.
// The ident parameter is a selector for the DOM element where the histogram will be drawn.
// The vals parameter is an array of data values for which the histogram will be generated.
function draw_hist(ident, vals) {

    // Define a formatter for counts.
    var formatCount = d3.format(",0d");

    // Set the margins and dimensions for the histogram.
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 400 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    // Create a linear scale for the x-axis.
    // The domain is set to [-5, 5] and the range is set to [0, width].
    var x = d3.scale.linear()
        .domain([-5, 5])
        .range([0, width]);

    // Generate a histogram using twenty uniformly-spaced bins.
    // The bins are generated based on the ticks of the x-scale.
    var data = d3.layout.histogram()
        .bins(x.ticks(20))
        (vals);

    // Create a linear scale for the y-axis.
    // The domain is set based on the maximum value of the data and a correction factor.
    // The range is set to [height, 0].
    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y + Math.sqrt(d.y); })])
        .range([height, 0]);

    // Calculate the correction factor for the y-scale.
    correction = y(0);

    // Create an x-axis using the d3.svg.axis function.
    // The scale is set to the x-scale, the ticks are set to 3, and the orientation is set to "bottom".
    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(3)
        .tickFormat(function(d) { return '';})
        .orient("bottom");

    // Create a y-axis using the d3.svg.axis function.
    // The scale is set to the y-scale, the ticks are set to 4, and the orientation is set to "left".
    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(4)
        //.tickFormat(function(d) { return ''; })
        .orient("left");

    // Append an SVG element to the DOM element selected by ident.
    // Set the width and height of the SVG element.
    // Append a g element to the SVG element and translate it by the margins.
    var svg = d3.select(ident).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Append circles to the SVG element for each data bin.
    // The circles are positioned based on the x and y values of the data bin.
    // The radius of the circles is set to 1.
    var bar = svg.selectAll(".bar")
        .data(data)
        .enter().append("svg:circle")
        .attr("stroke", "black")
        .attr("fill", function(d, i) { return "black" })
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .attr("r", function(d, i) { return 1 });

    // Append lines to the SVG element for each data bin.
    // The lines are positioned based on the x and y values of the data bin.
    // The lines are drawn vertically and horizontally from the center of the circles.
    svg.selectAll(".bar")
        .data(data)
        .enter().append("svg:line")
        .attr("x1", 0)
        .attr("x2
