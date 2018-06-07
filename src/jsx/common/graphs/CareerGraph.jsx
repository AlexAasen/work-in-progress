const React = require('react')
const d3 = require('d3')
const { debounce } = require('underscore')
const { reRenderDebounce, animationSpeed } = require('constants/base.js')
const { careerSkills } = require('constants/cv')

const margin = {
  top: 40,
  right: 100,
  bottom: 40,
  left: 50
}

class CareerGraph extends React.Component {
  constructor(props){
    super(props)
    const boundRender = this.renderGraph.bind(this, width => this.lastWidth = width)
    this.dbRender = debounce(boundRender, reRenderDebounce)

    this.lastWidth = null
  }

  componentDidMount(){
    window.addEventListener("resize", this.dbRender)
    this.initGraph()
  }

  componentWillUnMount(){
    window.removeEventListener("resize", this.dbRender)
  }

  componentDidUpdate(prevProps){
    if(decideOnUpdate(this.refs["career-graph-holder"], this.lastWidth))
      this.dbRender()
  }

  initGraph(){
    const svg = d3.select('.career-graph')

    svg.append('g')
      .attr('class', 'chart-data')

    this.renderGraph()
  }

  renderData({ svg, oneDegreeSpan, getDepth, width, height }){
    const selection = svg.select('.chart-data')
        .selectAll('path')
        .data(careerSkills)

    const created = selection.enter()
        .append('path')
        .attr('class', 'data-entry')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(d => getDepth(d.value))
          .startAngle((d, i) => oneDegreeSpan * i)
          .endAngle((d, i) => oneDegreeSpan * (i + 1))
        )
        .attr('fill', d => d.color)
        .attr("transform", "translate(" + ((width - margin.left) / 2) + "," + ((height + margin.top) / 2) + ")")

    selection.merge(created)
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(d => getDepth(d.value))
          .startAngle((d, i) => oneDegreeSpan * i)
          .endAngle((d, i) => oneDegreeSpan * (i + 1))
        )
        .attr('fill', d => d.color)
        .attr("transform", "translate(" + ((width - margin.left) / 2) + "," + ((height + margin.top) / 2) + ")")

    selection.exit().remove()
  }


  renderGraph(){
    const svg = d3.select('.career-graph')
                  .attr("width", 0)

    const container = this.refs["career-graph-holder"]
    const width = container.offsetWidth
    const height = width > 800 ? width / 2 : 400
    const angleVariable = careerSkills.length
    const getRadians = (degrees) => {
      return degrees * Math.PI / 180;
    }
    const getDepth = depthVariable => ((height - margin.top) / 20) * depthVariable
    const radians = 2 * Math.PI
    const oneDegreeSpan = getRadians(360/angleVariable)

    svg.attr('height', height)
       .attr('width', width)

    const config = {
      svg,
      width,
      height,
      oneDegreeSpan,
      getDepth
    }

    this.renderData(config)
  }

  render(){
    return(
      <div className="experience-graph-holder" id="career-graph-holder" ref="career-graph-holder">
        <svg className="career-graph" id="career-graph"></svg>
      </div>
    )
  }
}

module.exports = CareerGraph
