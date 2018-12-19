const React = require('react')
const d3 = require('d3')
const { debounce } = require('underscore')
const { reRenderDebounce } = require('constants/base.js')

//const { personCrimes } = require('datasets/personCrimes')

class CrimesGraph extends React.Component {
  constructor(){
    super()
    this.state = {
      data: []
    }

    const boundRender = this.renderGraph.bind(this, width => this.lastWidth = width)
    this.dbRender = debounce(boundRender, reRenderDebounce)
  }

  componentDidMount(){
    window.addEventListener("resize", this.dbRender)
    this.initGraph()
  }

  componentWillUnMount(){
    window.removeEventListener("resize", this.dbRender)
  }

  isUnmounted() {
    if (!this.refs["wind-velocity-container"]) return true
    return false
  }

  initGraph(){
    const svg = d3.select('#crimes-graph')
        .append('g')
        .attr('class', 'data-set')

    svg.append('g')
        .attr('class', 'x-axis')

    svg.append('g')
        .attr('class', 'y-axis')

    svg.append('g')
        .attr('class', 'chart-data')
  }

  renderGraph(){
    if (this.isUnmounted()) return

    const margin = {
      top: 20,
      left: 50,
      right: 50,
      bottom: 50
    }

    const container = this.refs["crimes-graph-container"]
    const height = container.offsetHeight
    const width = container.offsetWidth

    const svg = d3.select('#wind-velocity')
        .attr('height', height)
        .attr('width', width)

    svg.select('.data-set')
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

    /*const config = {
      svg,
      width,
      height,
      margin,
      data: personCrimes
    }*/
  }

  render(){
    return(
      <div className="project-crimes-graph">
        <div className="crimes-graph-container" ref="crimes-graph-container">
          <svg id="crimes-graph"></svg>
        </div>
      </div>)
  }
}

module.exports = CrimesGraph
