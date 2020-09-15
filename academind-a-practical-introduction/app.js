const DUMMY_DATA = [
  {
    id: 1,
    value: 10,
    region: 'INDIA'
  },
  {
    id: 2,
    value: 11,
    region: 'JAPAN'
  },
  {
    id: 3,
    value: 12,
    region: 'USA'
  },
  {
    id: 4,
    value: 6,
    region: 'FRANCE'
  },
]

// Paragraphs with Region Name
// d3.select('div')
//   .selectAll('p')
//   .data(DUMMY_DATA)
//   .enter()
//   .append('p')
//   .text(d => d.region)


// Storing the selection
const container = d3.select('svg')
// Styling with D3
container.classed('bargraph', true)
  .classed('svgcontainer', true)

const xScale = d3.scaleBand()
  .domain(DUMMY_DATA.map(dataPoint => dataPoint.region))
  .rangeRound([0, 250])
  .padding(0.1)
const yScale = d3.scaleLinear().domain([0, 12]).range([200, 0])

const bars = container.selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', d => {
    console.log(yScale(d.value))
    return 200 - yScale(d.value)
  })
  .attr('x', data => xScale(data.region))
  .attr('y', data => yScale(data.value))