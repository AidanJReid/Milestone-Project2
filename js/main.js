queue()
    .defer(d3.json, "assets/data/ufo.json")
    .await(makeGraphs);

function makeGraphs(error, ufoData) {
    var ndx = crossfilter(ufoData);
    var city_dim = ndx.dimension(dc.pluck('city'));
    var state = ndx.dimension(dc.pluck('state'));

    dc.barChart("#data1")
        .width(300)
        .height(500)
        .margins({top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(city_dim)
        .group(state)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("City")
        .yAxis().ticks(4);

    dc.renderAll();
}