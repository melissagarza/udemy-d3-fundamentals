document.addEventListener('DOMContentLoaded', (event) => {

  const width = 400;
  const height = 100;

  const buildLine = data => {
    let lineFun = d3.svg.line()
      .x(d => (d.month - 20130001) / 3.25)
      .y(d => height - d.sales)
      .interpolate('linear');

    let svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height);

    let viz = svg.append('path')
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
