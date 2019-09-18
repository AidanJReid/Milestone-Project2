queue()
    .defer(d3.json, "assets/data/ufo.json")
    .await(makeGraphs);

// Call Function

function makeGraphs(error, ufoData) {
    var ndx = crossfilter(ufoData);
    
// Bar chart data
    
    var state_dim = ndx.dimension(dc.pluck('state'));
    var total_events_per_state = state_dim.group().reduceSum(dc.pluck('events'));

    dc.barChart("#freq")
        .width(300)
        .height(150)
        .margins({top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(state_dim)
        .group(total_events_per_state)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("State")
        .yAxis().ticks(4);

// Pie Chart (shapes) data

    var shape_dim = ndx.dimension(dc.pluck('shape'));
    var total_events_per_shape = shape_dim.group().reduceSum(dc.pluck('events'));

    dc.pieChart("#shapes")
        .height(300)
        .radius(150)
        .dimension(shape_dim)
        .group(total_events_per_shape)
        .transitionDuration(1500);
        
// Pie Chart (country) data
    
    var country_dim = ndx.dimension(dc.pluck('country'));
    var total_events_per_country = country_dim.group().reduceSum(dc.pluck('events'));
    
    dc.pieChart("#country")
        .height(300)
        .radius(150)
        .dimension(country_dim)
        .group(total_events_per_country)
        .transitionDuration(1500);

// Line Chart Data 

    var parseDate = d3.time.format("%d/%m/%Y").parse;
    ufoData.forEach(function (d) {
        d.date = parseDate(d.date);
    });
    

    var date_dim = ndx.dimension(dc.pluck('date'));
    var total_events_per_date = date_dim.group().reduceSum(dc.pluck('events'));
    
    var minDate = date_dim.bottom(1)[0].date;
    var maxDate = date_dim.top(1)[0].date;

    dc.lineChart("#monthly")
        .width(1000)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(date_dim)
        .group(total_events_per_date)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("Month")
        .yAxis().ticks(4);

// Scatter Plot 

    var duration_dim = ndx.dimension(function (d) {
        return [d.date, d.duration];
    });
    
    var duration_group = duration_dim.group();
    
    dc.scatterPlot("#duration")
        .width(700)
        .height(400)
        .dimension(duration_dim)
        .group(duration_group)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("Duration of Sighting")
        .xAxisLabel("Month");

    dc.renderAll();
}