document.addEventListener('DOMContentLoaded', (event) => {
  const width = 800;
  const height = 500;

  const projection = d3.geo.albersUsa()
    .translate([width / 2, height / 2])
    .scale([width]);

  const path = d3.geo.path().projection(projection);

  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

  const color = d3.scale.linear()
    .range([
      'rgb(254,240,217)', 
      'rgb(253,212,158)', 
      'rgb(253,187,132)', 
      'rgb(252,141,89)', 
      'rgb(227,74,51)', 
      'rgb(179,0,0)'
    ]);

  d3.csv('state-sales.csv', data => {
    color.domain([0, d3.max(data, d => d.sales)]);

    d3.json('us.json', json => {

      for (let i = 0; i < data.length; i++) {
        const salesState = data[i].state;
        const salesVal = parseFloat(data[i].sales);

        for (let j = 0; j < json.features.length; j++) {
          const usState = json.features[j].properties.NAME;

          if (salesState == usState) {
            json.features[j].properties.value = salesVal;
            break;
          }
        }
      }

      svg.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
          .attr('d', path)
          .style('fill', d => {
            const value = d.properties.value;
            if (value) {
              return color(value);
            }
            return '#eeeeee';
          });
    });
  });

});
