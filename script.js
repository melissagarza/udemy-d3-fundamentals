document.addEventListener('DOMContentLoaded', (event) => {

  const width = 300;
  const height = 100;
  const padding = 20;

  const getDate = d => {
    const strDate = new String(d);
    const year = strDate.substr(0, 4);
    const month = strDate.substr(4, 2) - 1;
    const day = strDate.substr(6, 2);

    return new Date(year, month, day);
  };
  
  const buildLine = data => {
    
    const minDate = getDate(data.monthlySales[0]['month']);
    const maxDate = getDate(data.monthlySales[data.monthlySales.length - 1]['month']);

    const scaleX = d3.time.scale()
      .domain([minDate, maxDate])
      .range([padding, width - padding]);

    const scaleY = d3.scale.linear()
      .domain([0, d3.max(data.monthlySales, d => d.sales)])
      .range([height - padding, 10]);

    const genAxisX = d3.svg.axis()
      .scale(scaleX)
      .orient('bottom')
      .tickFormat(d3.time.format('%b'));

    const genAxisY = d3.svg.axis()
      .scale(scaleY)
      .orient('left')
      .ticks(4);

    const lineFun = d3.svg.line()
      .x(d => scaleX(getDate(d.month)))
      .y(d => scaleY(d.sales))
      .interpolate('linear');

    const svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const axisX = svg.append('g').call(genAxisX)
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height - padding})`);

    const axisY = svg.append('g').call(genAxisY)
      .attr('class', 'axis')
      .attr('transform', `translate(${padding}, 0)`);

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
