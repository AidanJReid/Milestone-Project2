// /*global varname*/ added to remove undefined variable errors 
/*global queue*/
/*global crossfilter*/
/*global dc*/
/*global d3*/

queue()
    .defer(d3.json, "assets/data/ufo.json")
    .await(makeGraphs);
    
// Call Function

function makeGraphs(error, ufoData) {
    let ndx = crossfilter(ufoData);
    let parseDate = d3.time.format("%d/%m/%Y").parse;
    
    ufoData.forEach(function(d){
        d.date = parseDate(d.date);
    });
    
    
    
    show_continent_selector(ndx);
    show_monthly_sightings(ndx);
    show_state_sightings(ndx);
    // show_continent(ndx);
    show_duration(ndx);
    show_shapes(ndx);
    
    
    dc.renderAll();
}

// Continent Selector

function show_continent_selector(ndx) {
    let dim = ndx.dimension(dc.pluck('continent'));
    let group = dim.group();

    dc.selectMenu("#continent-selector")
        .dimension(dim)
        .group(group);
}
    
// Line Chart Showing Dates and Number of Sightings


function show_monthly_sightings(ndx) {
    let date_dim = ndx.dimension(dc.pluck('date'));
    let date_group = date_dim.group();
    
    let minDate = date_dim.bottom(1)[0].date;
    let maxDate = date_dim.top(1)[0].date;

    dc.lineChart("#line-chart")
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 40, left: 50 })
        .useViewBoxResizing(true)
        .dimension(date_dim)
        .group(date_group)
        .transitionDuration(500)
        .brushOn(false)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .yAxisLabel("Number of Sightings")
        .yAxis().ticks(6);

}

// Bar chart showing sightings by US state
    
function show_state_sightings(ndx) {
    let state_dim = ndx.dimension(dc.pluck('state'));
    let state_group = state_dim.group();
    

    dc.barChart('#state')
        .width(1200)
        .height(400)
        .margins({ top: 10, right: 60, bottom: 100, left: 60 })
        .useViewBoxResizing(true)
        .dimension(state_dim)
        .group(state_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("US States")
        .yAxisLabel("Number of Sightings")
        .renderHorizontalGridLines(true)
        .title(function (d) {
                if (d.value === 1) {
                    return d.value + " sighting was reported in the state of " + d.key;
                } else {
                    return d.value + " sightings were reported in the state of " + d.key;
                }
            })
        .elasticX(true)
        .elasticY(true);

}
        
// Pie Chart (country) data

function show_continent(ndx) {
    
    let continent_dim = ndx.dimension(dc.pluck('continent'));
    let continent_group = continent_dim.group();
    
    dc.pieChart("#continent")
        .height(200)
        .dimension(continent_dim)
        .group(continent_group)
        .transitionDuration(1500)
        .useViewBoxResizing(true)
        .drawPaths(true)
        .minAngleForLabel(0.25)
        .legend(dc.legend().x(0).y(0).itemHeight(15).gap(6))
        .title(function (d) {
                if (d.value === 1) {
                    return d.value + " sightings are in " + d.key;
                } else {
                    return d.value + " sightings are in " + d.key;
                }
            });
        
}

// Shapes Pie Chart data

function show_shapes(ndx) {
    let shape_dim = ndx.dimension(dc.pluck('shape'));
    let shape_group = shape_dim.group();

    dc.pieChart("#shapes")
        .height(400)
        .radius(500)
        .useViewBoxResizing(true)
        .innerRadius(60)
        .externalRadiusPadding(10)
        .minAngleForLabel(0.25)
        .drawPaths(true)
        .externalLabels(10)
        .dimension(shape_dim)
        .group(shape_group)
        .transitionDuration(1500);
        
}

// States Pie Chart data

function show_duration(ndx) {
    let duration_dim = ndx.dimension(dc.pluck('timeRange'));
    let duration_group = duration_dim.group();

    dc.pieChart("#duration")
        .height(400)
        .radius(500)
        .useViewBoxResizing(true)
        .innerRadius(60)
        .dimension(duration_dim)
        .group(duration_group)
        .transitionDuration(1500)
        .title(function (d) {
                if (d.value === 1) {
                    return d.value + " sightings lasted " + d.key + " minute";
                } else {
                    return d.value + " sightings lasted " + d.key + " minutes";
                }
            });
        
}


// Scatter Plot 

// function show_duration_of_sightings(ndx) {
    
//     var duration_dim = ndx.dimension(function (d) {
//         return [d.date, d.duration];
//     });
    
//     var duration_group = duration_dim.group();
//     var date_dim = ndx.dimension(dc.pluck('date'));
    
//     var minDate = date_dim.bottom(1)[0].date;
//     var maxDate = date_dim.top(1)[0].date;
    
//     dc.scatterPlot("#duration")
//         .width(700)
//         .height(400)
//         .dimension(duration_dim)
//         .group(duration_group)
//         .x(d3.time.scale().domain([minDate, maxDate]))
//         .brushOn(false)
//         .symbolSize(8)
//         .clipPadding(10)
//         .yAxisLabel("Duration of Sighting")
//         .xAxisLabel("Month");
// }

// Accordion for Read More (top of page)

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
