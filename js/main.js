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
    // show_continent_sightings(ndx);
    show_monthly_sightings(ndx);
    show_state_sightings(ndx);
    show_continent(ndx);
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

// Composite chart data
    
function show_continent_sightings(ndx) {
    let date_dim = ndx.dimension(dc.pluck('date'));
    
    let minDate = date_dim.bottom(1)[0].date;
    let maxDate = date_dim.top(1)[0].date;

    function sightings_by_continent(continent) {
        return function(d) {
            if (d.continent === continent) {
                return d.duration;
            }
            else {
                return 0;
            }
        };
    }

    let NorthAmericaSightingsByMonth = date_dim.group().reduceSum(sightings_by_continent('North America'));

    let SouthAmericaSightingsByMonth = date_dim.group().reduceSum(sightings_by_continent('South America'));

    let EuropeSightingsByMonth = date_dim.group().reduceSum(sightings_by_continent('Europe'));

    let AsiaSightingsByMonth = date_dim.group().reduceSum(sightings_by_continent('Asia'));

    let AfricaSightingsByMonth = date_dim.group().reduceSum(sightings_by_continent('Africa'));

    let OceaniaSightingsByMonth = date_dim.group().reduceSum(sightings_by_continent('Oceania'));
    
    let SeaSightingsByMonth = date_dim.group().reduceSum(sightings_by_continent('Sea'));
    
    let TotalSightingsByMonth = date_dim.group();

    let compositeChart = dc.compositeChart('#composite-chart');
    

    compositeChart
        .width(1200)
        .height(500)
        .useViewBoxResizing(true)
        .dimension(date_dim)
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .xAxisLabel("Month")
        .yAxisLabel("Sightings")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)

        .compose([
            dc.lineChart(compositeChart)
            .colors('red')
            .group(NorthAmericaSightingsByMonth, 'North America'),
            dc.lineChart(compositeChart)
            .colors('green')
            .group(EuropeSightingsByMonth, 'Europe'),
            dc.lineChart(compositeChart)
            .colors('gold')
            .group(OceaniaSightingsByMonth, 'Oceania'),
            dc.lineChart(compositeChart)
            .colors('black')
            .group(AsiaSightingsByMonth, 'Asia'),
            dc.lineChart(compositeChart)
            .colors('blue')
            .group(SouthAmericaSightingsByMonth, 'South America'),
            dc.lineChart(compositeChart)
            .colors('purple')
            .group(SeaSightingsByMonth, 'Sea'),
            dc.lineChart(compositeChart)
            .colors('yellow')
            .group(AfricaSightingsByMonth, 'Africa'),
            dc.lineChart(compositeChart)
            .colors('orange'),

            dc.lineChart(compositeChart)
            .dashStyle([3, ])
            .colors('blue')
            .group(TotalSightingsByMonth, 'TOTAL')
        ]);

}
    

    
function show_state_sightings(ndx) {
    let state_dim = ndx.dimension(dc.pluck('state'));
    let state_group = state_dim.group();
    

    dc.barChart('#state')
        .width(1200)
        .height(400)
        .margins({ top: 10, right: 60, bottom: 100, left: 60 })
        .dimension(state_dim)
        .group(state_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("US States")
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

// Line Chart Data 

function show_monthly_sightings(ndx) {
    let date_dim = ndx.dimension(dc.pluck('date'));
    let date_group = date_dim.group();
    
    let minDate = date_dim.bottom(1)[0].date;
    let maxDate = date_dim.top(1)[0].date;

    dc.lineChart("#line-chart")
        .width(800)
        .height(300)
        .margins({top: 20, right: 50, bottom: 30, left: 50 })
        .dimension(date_dim)
        .group(date_group)
        .transitionDuration(500)
        .brushOn(false)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("Month")
        .yAxis().ticks(6);

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

// Accordion

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
