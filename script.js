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

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

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
      .attr('height', height)
      .attr('class', `svg-${(data.category).toLowerCase()}`);
    
    const axisX = svg.append('g').call(genAxisX)
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${height - padding})`);

    const axisY = svg.append('g').call(genAxisY)
      .attr('class', 'axis-y')
      .attr('transform', `translate(${padding}, 0)`);

    const dots = svg.selectAll('circle')
      .data(data.monthlySales)
      .enter()
      .append('circle')
        .attr('cx', d => scaleX(getDate(d.month)))
        .attr('cy', d => scaleY(d.sales))
        .attr('r', 4)
        .attr('fill', '#666666')
        .attr('class', `circle-${data.category.toLowerCase()}`)
        .on('mouseover', d => {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0.85);
          tooltip.html(`<strong>Sales $${d.sales}K</strong>`)
            .style('left', `${d3.event.pageX}px`)
            .style('top', `${d3.event.pageY - 28}px`);
        })
        .on('mouseout', d => {
          tooltip.transition()
            .duration(300)
            .style('opacity', 0);
        });

    const viz = svg.append('path')
      .attr('d', lineFun(data.monthlySales))
      .attr('class', `path-${(data.category).toLowerCase()}`)
      .attr('stroke', 'purple')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  };

  const updateLine = data => {
    
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
      .tickFormat(d3.time.format('%b'))
      .ticks(data.monthlySales.length - 1);

    const genAxisY = d3.svg.axis()
      .scale(scaleY)
      .orient('left')
      .ticks(4);

    const lineFun = d3.svg.line()
      .x(d => scaleX(getDate(d.month)))
      .y(d => scaleY(d.sales))
      .interpolate('linear');

    const svg = d3.select('body').select(`.svg-${(data.category).toLowerCase()}`);
    const axisX = svg.selectAll('g.axis-x').call(genAxisX);
    const axisY = svg.selectAll('g.axis-y').call(genAxisY);

    const dots = svg.selectAll('circle')
      .data(data.monthlySales)
      .attr('cx', d => scaleX(getDate(d.month)))
      .attr('cy', d => scaleY(d.sales))
      .attr('r', 4)
      .attr('fill', '#666666')
      .attr('class', `circle-${data.category.toLowerCase()}`)
      .on('mouseover', d => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0.85);
        tooltip.html(`<strong>Sales $${d.sales}K</strong>`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY - 28}px`);
      })
      .on('mouseout', d => {
        tooltip.transition()
          .duration(300)
          .style('opacity', 0);
      });
    dots.enter().append('circle');
    dots.exit().remove();

    const viz = svg.selectAll(`.path-${(data.category).toLowerCase()}`)
      .transition()
      .duration(1000)
      .ease('linear')
      .attr('d', lineFun(data.monthlySales));
  };

  const showHeader = data => {
    d3.select('body').append('h1')
      .text(`${data.category} Sales (2013)`);
  };

  d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json',
    (err, data) => {
      if (err) console.log(err);

      let decodedData = JSON.parse(window.atob(data.content));

      decodedData.contents.forEach(data => {
        buildLine(data);
        showHeader(data);
      });

      d3.select('select')
        .on('change', (d, i) => {
          const selection = d3.select('#date-option').node().value;

          decodedData = JSON.parse(window.atob(data.content));
          decodedData.contents.forEach(data => {
            data.monthlySales.splice(0, data.monthlySales.length - selection);
            updateLine(data);
          });
        });
    });
});
