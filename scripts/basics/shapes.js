// ### arc
const arcContainer = d3.create('svg');
const arc = d3.arc();

/** ### arc start and end angle calculation:
  * Angle has to be supplied in radian
  * 2 * Math.PI = a complete circle radian
  * Map value to total and get the percentage and multiply with full radian to get the arc :(
  */
// ### set to have rounded edges for arcs.
//arc.cornerRadius(20);
const arcNode1 = arc({
  cornerRadius: 20,
  padAngle: 0.04,// recommended value to show diff between 2 range
  innerRadius: 30,// arc's inner radius
  outerRadius: 50,// arc's outer radius
  startAngle: 0,// starting angle for arc in radian
  endAngle: Math.PI * 1/3 * 2// ending angle for arc in radian
});
const arcNode2 = arc({
  padAngle: 0.04,
  innerRadius: 30,// arc's inner radius
  outerRadius: 50,// arc's outer radius
  startAngle: Math.PI * 1/3 * 2,// starting angle for arc
  endAngle: 2 * Math.PI// ending angle for arc
});

// arc has to be passed as attr 'd' to path for rendering
const arcGroup = arcContainer.append('g')
  .attr("transform", "translate(75, 75), scale(1.5)");
arcGroup.append('path')
  .attr('d', arcNode1)
  .attr('fill', 'steelblue');

arcGroup.append('path')
  .attr('d', arcNode2)
  .attr('fill', 'brown');

appendToView(arcContainer.node(), 'Arc');

// ### pie chart
const pieContainer = d3.create('svg');
const pieData = [{value: 1, fill: '#50394c'}, {value: 1, fill: 'grey'}, {value: 2, fill: '#b9936c'}, {value: 3, fill: 'steelblue'}, {value: 5, fill: '#b2c2bf'}, {value: 8, fill: '#ff9999'}, {value: 13, fill: 'orange'}, {value: 18, fill: '#e6ccff'}];
const parsedData = d3.pie()
  .padAngle(0.05)
  .value((d) => d.value)(pieData);
console.log('pieArcs', parsedData);

const pieGroup = pieContainer.append('g')
  .attr("transform", "translate(75, 75), scale(1.5)");

pieGroup.selectAll('path')
  .data(parsedData)
  .join('path')
  .attr('d', d => arc({...d, innerRadius: 0, outerRadius: 50}))
  .attr('fill', d => d.data.fill)
  .attr('text', d => d.data.value);

appendToView(pieContainer.node(), 'Pie chart');


// ### line - d3.path()
// d3.path - doesn't support chain operation
const lineContainer = d3.create('svg');
const line = d3.path();
line.moveTo(10, 10);
line.lineTo(50, 50);

lineContainer.append('path')
  .style('stroke', 'black')
  .style('fill', 'none')
  .attr('d', line);

  appendToView(lineContainer.node(), 'Line - d3.path()');

// ### rectangle - d3.path()
const rectContainer = d3.create('svg');
const rect = d3.path();
rect.rect(15, 15, 50, 75); // x, y, width, height

rectContainer.append('path')
  .style('stroke', 'red')
  .style('fill', 'none')
  .attr('d', rect);

  appendToView(rectContainer.node(), 'Rectangle - d3.path()');
  