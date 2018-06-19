const React = require('react')
const d3 = require('d3')
const { map } = require('underscore')
const { attributes } = require('constants/attributes.js')
const { animationSpeed } = require('constants/base.js')

const margin = {
  bottom: 100,
  left: 50
}

class Attributes extends React.Component {
  constructor(){
    super()
    this.renderGraph = this.renderGraph.bind(this)
  }

  componentDidMount(){
    window.addEventListener("resize", this.renderGraph)
    this.initGraph()
  }

  componentWillUnMount(){
    window.removeEventListener("resize", this.renderGraph)
  }

  isUnmounted() {
    if (!this.refs["attributes-container"]) return true
    return false
  }

  initGraph(){
    const svg = d3.select('#attributes')

    svg.append('g')
       .attr('class', 'chart-data')
       .attr('transform', "translate(" + [margin.left, 0] + ")")

   svg.append('g')
       .attr('class', 'x-axis')

    this.renderGraph()
  }

  renderAxises({ svg, height, xScale, width }){
    const calleeBottom = d3.axisBottom(xScale)
      .tickValues(map(attributes, attribute => attribute.id))
      .tickPadding(5)
      .tickSizeOuter(0)
      .tickSize(0)
      .tickFormat(d => d)

    svg.select(".x-axis")
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attr("transform", "translate(" + [margin.left, height - margin.bottom] + ")")
      .call(calleeBottom)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", d =>  (10 - d.length) * 3)
      .attr("dy", ".35em")
      .style("font-size", "16px")

    svg.select(".x-axis")
      .select("path")
      .style("stroke", "#1C5063")
      .style("stroke-width", "3px")
  }

  renderBars({ svg, xScale, yScale, height, width }){
    function mouseover(){
      d3.select(this)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .style("opacity", .6)
    }
    function mouseleave(){
      d3.select(this)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .style("opacity", 1)
    }

    const selection = svg.select('.chart-data')
      .selectAll('.bar')
      .data(attributes)

    const created = selection.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.id))
      .attr('y', d => height - margin.bottom)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .style('fill', d => d.color)
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave)

    selection.merge(created)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attr('x', d => xScale(d.id))
      .attr('y', d => height - yScale(d.value) - margin.bottom)
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d.value))

    selection.exit().remove()
  }

  renderGraph(){
    if (this.isUnmounted()) return

    const container = this.refs["attributes-container"]

    const width = container.offsetWidth
    const height = container.offsetHeight

    const svg = d3.select('#attributes')
       .attr('height', height)
       .attr('width', width)

    const xScale = d3.scaleBand()
       .padding(0.2)
       .domain(map(attributes, attribute => attribute.id))
       .rangeRound([0, width - margin.left])

    const maximum = d3.max(attributes, d => d.value)
    const yScale = d3.scaleLinear()
       .rangeRound([0, height - margin.bottom])
       .domain([0, maximum])

    const config = {
      svg,
      width,
      height,
      xScale,
      yScale,
      maximum
    }

    this.renderBars(config)
    this.renderAxises(config)
  }

  render(){
    return(
      <div className="project-attributes">
        <div className="attributes-container" ref="attributes-container">
          <svg id="attributes"></svg>
        </div>
      </div>)
  }
}

module.exports = Attributes
