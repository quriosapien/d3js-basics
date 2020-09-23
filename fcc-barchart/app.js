import data from './data.js'

const { select, scaleLinear, max, scaleBand } = d3

const margin = {
  bottom: 100,
  left: 100,
  right: 50,
  top: 50,
}

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = (data) => {
  // data Accessors
  const xValue = d => d.population
  const yValue = d => d.continent

  // scales
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, width - margin.left - margin.right])
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, height])

  // d3 magic
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth())
}

render(data)

console.log([width, height])