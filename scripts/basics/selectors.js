// ### nested selector
d3.select('table').select('tbody').selectAll('tr')
  .join('tr')
  .style('background-color', (d, i) => i%2 === 0 ? '#a2b9bc' : '#e6e2d3');
  
// ### selectors and properties
const selector = d3.create("span")
  .style("color", "white")
  .style("background-color", "black")
  .html("Hello, world! I was created and attached by D3");

// returns the HTML node
selector.node();
appendToView(selector.node(), 'Selectors');

// ### bar chart
const data = [4, 6, 8, 9, 15];
const barChart = d3.create("div")
  .style("font", "10px sans-serif")
  .style("text-align", "right")
  .style("color", "white");

// Define the initial (empty) selection for the bars.
barChart.selectAll("div")
  // Bind this selection to the data (computing enter, update and exit).
  .data(data)
  // Join the selection and the data, appending the entering bars.
  .join("div")
  .style("background", "steelblue")
  .style("padding", "3px")
  .style("margin", "1px")
  .style("width", 0)
  .transition().delay(150)
  // Set the width as a function of data.
  .style("width", d => `${d * 10}px`)
  // Set the text of each bar as the data.
  .text(d => d);

appendToView(barChart.node(), 'Bar chart');

function randomLetters() {
  return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
    .slice(0, Math.floor(6 + Math.random() * 20))
    .sort();
}
// TODO: check for generator logic
async function* circleJoin() {
  width = 100;
  console.log('reached**********start1');
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", 33)
      .attr("viewBox", `0 -20 ${width} 33`);

  console.log('reached**********start1');
  while (true) {
    const t = svg.transition()
        .duration(750);

    console.log('reached**********start');
    svg.selectAll("text")
      .data(randomLetters(), d => d)
      .join(
        enter => enter.append("text")
            .attr("fill", "green")
            .attr("x", (d, i) => i * 16)
            .attr("y", -30)
            .text(d => d)
          .call(enter => enter.transition(t)
            .attr("y", 0)),
        update => update
            .attr("fill", "black")
            .attr("y", 0)
          .call(update => update.transition(t)
            .attr("x", (d, i) => i * 16)),
        exit => exit
            .attr("fill", "brown")
          .call(exit => exit.transition(t)
            .attr("y", 30)
            .remove())
      );
    console.log('reached**********start');
    yield svg.node();
    console.log('reached**********yield');
    // await Promises.tick(2500);
    appendToView(svg.node(), 'testes');
  }
}
const gen = circleJoin();
console.log(gen.next().value);
console.log(gen.next().value);
