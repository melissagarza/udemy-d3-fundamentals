document.addEventListener('DOMContentLoaded', (event) => {
  const width = 200;
  const height = 100;

  const monthlySales = [
    {'month': 10, 'sales': 20},
    {'month': 20, 'sales': 14},
    {'month': 30, 'sales': 20},
    {'month': 40, 'sales': 21},
    {'month': 50, 'sales': 15},
    {'month': 60, 'sales': 22},
    {'month': 70, 'sales': 9},
    {'month': 80, 'sales': 6},
    {'month': 90, 'sales': 23},
    {'month': 100, 'sales': 7}
  ];

  const lineFun = d3.svg.line()
    .x(d => d.month * 2)
    .y(d => d.sales)
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
});
