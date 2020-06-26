document.addEventListener('DOMContentLoaded', (event) => {

  const width = 400;
  const height = 100;

  const buildLine = data => {

    const scaleX = d3.scale.linear()
      .domain([
        d3.min(data.monthlySales, d => d.month),
        d3.max(data.monthlySales, d => d.month)
      ])
      .range([0, width]);

    const scaleY = d3.scale.linear()
      .domain([0, d3.max(data.monthlySales, d => d.sales)])
      .range([height, 0]);

    const lineFun = d3.svg.line()
      .x(d => scaleX(d.month))
      .y(d => scaleY(d.sales))
      .interpolate('linear');

    const svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height);

    const viz = svg.append('path')
      .attr('d', lineFun(data.monthlySales))
      .attr('stroke', 'purple')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  };

  const showHeader = data => {
    d3.select('body').append('h1')
      .text(`${data.category} Sales (2013)`);
  };

  d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json',
    (err, data) => {
      if (err) console.log(err);

      const decodedData = JSON.parse(window.atob(data.content));

      decodedData.contents.forEach(data => {
        buildLine(data);
        showHeader(data);
      });
    });
});
