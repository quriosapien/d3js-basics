import data from './data.js'

const {
  axisBottom,
  axisLeft,
  max,
  scaleBand,
  scaleLinear,
  select
} = d3

const margin = {
  bottom: 100,
  left: 100,
  right: 40,
  top: 50,
}

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')
const innerWidth = width - margin.left - margin.right
const innerHeight = height -margin.top - margin.bottom

const render = (data) => {
  // data Accessors
  const xValue = d => d.population
  const yValue = d => d.continent

  // scales
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.16)
  
  // d3 magic
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  // axes
  g.append('g').call(axisLeft(yScale))
    .selectAll('text')
    .attr('class', 'text-y')
  g.append('g').call(axisBottom(xScale))
    .attr('transform', `translate(0, ${innerHeight})`)

  // rendering bars
  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .classed('bars', true)
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth())
}

render(data)