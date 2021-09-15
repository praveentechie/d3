d3.select("body").transition()
  .delay(300)
  .style("background-color", "#F3F3F3");
  
var dragHandler = (startHandler, endHandler) => d3.drag()
.on("start", startHandler ? startHandler : null)
.on("drag", function() {
  d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
})
.on("end", endHandler ? endHandler : null);

// ### circle: olympic logo
const olympicData = [
  {cx: 40, cy: 40, fill: '#0085C7'},//blue
  {cx: 75, cy: 80, fill: '#F4C300'},//yellow
  {cx: 110, cy: 40, fill: '#000000'},//black
  {cx: 145, cy: 80, fill: '#009F3D'},//green
  {cx: 180, cy: 40, fill: '#DF0024'}//red
];
const olympicLogo = d3.create('svg');
// with enter() and exit(). for D3 versions < 5.
var circle = olympicLogo.selectAll("circle")
  .data(olympicData);
// to remove the surplus elements. Element that has no data
circle.exit().remove();

circle.enter().append("circle")
    .attr("r", 2.5)
  .merge(circle)
    .attr("cx", function(d) { return d.cx; })
    .attr("cy", function(d) { return d.cy; });

// from version 5 use .join() instead of enter() and exit()
const circles = olympicLogo.selectAll('circle')
  .data(olympicData)
  .join('circle')
  .classed('oly-circle', true)
  .attr('cx', 40)
  .attr('cy', 40)
  .attr('r', 30)
  .style('stroke-width', 4)
  .style('stroke', '#000000')
  .attr('fill', 'transparent')
  .transition().delay(300).duration(550)
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .style('stroke', d => d.fill);

appendToView(olympicLogo.node(), 'Olympic logo (Circles)');
// ### draggable: drag to be initialized after the elements are attached to DOM
d3.selectAll('.oly-circle').call(dragHandler());

// ### ease transition
const easeTransition = d3.create('svg');
easeTransition.append('circle').attr('class', 'ease-circle');
appendToView(easeTransition.node(), 'Ease transition');

d3.selectAll(".ease-circle")
    .attr('cx', 40)
    .attr('cy', 40)
    .attr('r', 30)
    .style("fill", "cornflowerblue")
  .transition()
    .delay(500)
    .duration(2000)
    .ease(d3.easeBounce)
    .attr("cx", 500)
  .transition()
    .duration(1000)
    .ease(d3.easeElasticInOut)
    .style("fill", "lavender")
  .transition()
    .duration(1000)
    .ease(d3.easeBounceOut)
    .attr("cx", 50)
    .style("fill", "cornflowerblue")
