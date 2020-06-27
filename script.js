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
      .attr({
        x: (d, i) => i * (width / dataset.length),
        y: d => height - (d * 4),
        width: width / dataset.length - padding,
        height: d => d * 4,
        fill: d => colorPicker(d)
      });

  svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
      .text(d => d)
        .attr({
          'text-anchor': 'middle',
          x: (d, i) => i * (width / dataset.length) + (width / dataset.length - padding) / 2,
          y: d => height - (d * 4) + 14,
          'font-family': 'sans-serif',
          'font-size': 12,
          'fill': '#ffffff'
        })
});
