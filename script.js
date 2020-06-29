document.addEventListener('DOMContentLoaded', (event) => {
  const width = 1200;
  const height = 800;

  const projection = d3.geo.albersUsa()
    .translate([width / 2, height / 2])
    .scale([width]);

  const path = d3.geo.path().projection(projection);

  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

  d3.json('us.json', json => {
    svg.selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
        .attr('d', path)
        .style('fill', '#666666');

      d3.csv('sales-by-city.csv', data => {
        svg.selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
            .attr('cx', d => {
              if (d.lon !== '#N/A') {
                return projection([d.lon, d.lat])[0];
              }
              return 0;
            })
            .attr('cy', d => {
              if (d.lat !== '#N/A') {
                return projection([d.lon, d.lat])[1];
              }
              return 0;
            })
            .attr('r', d => Math.sqrt(parseInt(d.sales) * 0.0005))
            .style('fill', 'red');
      });
  });

});
