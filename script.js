document.addEventListener('DOMContentLoaded', (event) => {
  const width = 300;
  const height = 100;
  const padding = 2;
  const dataset = [5, 10, 13, 19, 21, 25, 11, 25, 22, 18, 7];

  const colorPicker = (v) => {
    if (v <= 20) {
      return '#666666';
    } else if (v > 20) {
      return '#ff0033';
    }
  };

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
      .attr('height', d => d * 4)
      .attr('fill', d => colorPicker(d))
      .on('mouseover', (d, i, nodes) => {
        const selected = d3.select(nodes[i]);

        svg.append('text')
          .text(d)
          .attr('text-anchor', 'middle')
          .attr('x', parseFloat(selected.attr('x')) + parseFloat(selected.attr('width') / 2))
          .attr('y', parseFloat(selected.attr('y')) + 12)
          .attr('font-family', 'sans-serif')
          .attr('font-size', 12)
          .attr('fill', '#ffffff')
          .attr('id', 'tooltip');
      })
      .on('mouseout', (d, i, nodes) => {
        d3.select('#tooltip').remove();
      });
});
