document.addEventListener('DOMContentLoaded', (event) => {
  const w = 200;
  const h = 100;
  const padding = 2;
  const dataset = [5, 10, 15, 20, 25];
  
  const svg = d3.select('body')
                .append('svg')
                  .attr('width', w)
                  .attr('height', h);

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
      .attr('x', (d, i) => i * (w / dataset.length))
      .attr('y', (d) => h - d)
      .attr('width', w / dataset.length - padding)
      .attr('height', (d) => d);
});
