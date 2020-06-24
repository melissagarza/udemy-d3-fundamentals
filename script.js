document.addEventListener('DOMContentLoaded', (event) => {
  const width = 300;
  const height = 100;
  const padding = 2;
  const dataset = [5, 10, 14, 20, 25];

  const svg = d3.select('body')
    .append('svg')
      .attr('width', width)
      .attr('height', height);
  
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
      .attr('x', (d, i) => i * (width / dataset.length))
      .attr('y', d => height - (d * 4))
      .attr('width', width / dataset.length - padding)
      .attr('height', d => d * 4);
});
