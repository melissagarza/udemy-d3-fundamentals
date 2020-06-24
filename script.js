document.addEventListener('DOMContentLoaded', (event) => {
  const width = 400;
  const height = 350;

  const monthlySales = [
    {'month': 10, 'sales': 100},
    {'month': 20, 'sales': 130},
    {'month': 30, 'sales': 250},
    {'month': 40, 'sales': 300},
    {'month': 50, 'sales': 265},
    {'month': 60, 'sales': 225},
    {'month': 70, 'sales': 180},
    {'month': 80, 'sales': 120},
    {'month': 90, 'sales': 145},
    {'month': 100, 'sales': 130}
  ];

  const lineFun = d3.svg.line()
    .x(d => d.month * 3)
    .y(d => height - d.sales)
    .interpolate('linear');

  const svg = d3.select('body').append('svg')
    .attr({
      width,
      height
    });

  const viz = svg.append('path')
    .attr({
      d: lineFun(monthlySales),
      stroke: 'purple',
      'stroke-width': 2,
      fill: 'none'
    });

  const labels = svg.selectAll('text')
    .data(monthlySales)
    .enter()
    .append('text')
      .text(d => d.sales)
      .attr({
        x: d => d.month * 3 - 25,
        y: d => height - d.sales,
        'font-family': 'sans-serif',
        'font-size': '12px',
        fill: '#666666',
        'text-anchor': 'start',
        dy: '.35em',
        'font-weight': (d, i) => {
          if (i === 0 || i === monthlySales.length - 1) {
            return 'bold';
          }
          return 'normal';
        }
      });
});
