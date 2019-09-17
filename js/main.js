queue()
    .defer(d3.json, "assets/data/ufo.json")
    .await(makeGraphs);

function makeGraphs(error, ufoData) {
    var ndx = crossfilter(ufoData);
    var city_dim = ndx.dimension(dc.pluck('city'));
    var total_duration = city_dim.group().reduceSum(dc.pluck('duration'));

    dc.barChart("#data1")
        .width(300)
        .height(150)
        .margins({top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(city_dim)
        .group(total_duration)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("City")
        .yAxis().ticks(4);

    dc.renderAll();
}