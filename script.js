document.addEventListener('DOMContentLoaded', (event) => {
  const width = 500;
  const height = 300;

  const projection = d3.geo.albersUsa()
    .translate([width / 2, height / 2])
    .scale([500]);

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
        .attr('fill', '#666666');
  });
});
