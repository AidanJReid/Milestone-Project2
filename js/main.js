d3.csv("assets/data/nuforc.csv").then(makeGraphs);

function makeGraphs(ufoData) {
    
    var ndx = crossfilter(ufoData);
    
    ufoData.forEach(function (d) {
}