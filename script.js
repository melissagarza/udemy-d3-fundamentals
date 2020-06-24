document.addEventListener('DOMContentLoaded', (event) => {
  d3.select('body')
    .append('svg')
      .attr('width', 250)
      .attr('height', 50)
    .append('text')
      .text('Easy Peasy')
      .attr('x', 0)
      .attr('y', 25)
      .style('fill', 'blue');
});