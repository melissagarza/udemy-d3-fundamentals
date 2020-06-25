document.addEventListener('DOMContentLoaded', (event) => {

  const width = 400;
  const height = 100;
  let ds;

  const buildLine = () => {
    let lineFun = d3.svg.line()
      .x(d => (d.month - 20130001) / 3.25)
      .y(d => height - d.sales)
      .interpolate('linear');

    let svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height);

    let viz = svg.append('path')
      .attr('d', lineFun(ds))
      .attr('stroke', 'purple')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  };

  const showTotals = () => {
    let table = d3.select('body').append('table');
    let salesTotal = 0;

    for (let i = 0; i < ds.length; i++) {
      salesTotal += ds[i]['sales'] * 1;
    }

    let tr = table.selectAll('tr')
      .data([1])
      .enter()
      .append('tr')
      .append('td')
      .text(`Sales Total: ${salesTotal}`);
  };

  d3.csv('MonthlySales.csv', (err, data) => {
    if (err) console.log(err);

    console.log(data);
    ds = data;

    buildLine();
    showTotals();
  });
});
