const React = require('react')
const d3 = require('d3')
const { range, debounce, map } = require('underscore')
const { mathRadians, getRandom } = require('js/utils')
const { reRenderDebounce, animationSpeed } = require('constants/base.js')
const { renderCircleShadows,
  renderCircleLines,
  renderData,
  renderAxises,
  renderDegreeLabels,
  renderWindAngles } = require('./WindVelocityRender')

const lastWidth = null
const angleVariable = 16
const hours = 12 * 4
const radians = 2 * Math.PI
const oneDegreeSpan = mathRadians(360/angleVariable)
const weatherDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
const colors = [
  { color: 'red', label: '0 - 1 m/s' },
  { color: 'orange', label: '1 - 2 m/s' },
  { color: 'yellow', label: '2 - 3 m/s' },
  { color: 'green', label: '3 - 4 m/s' }]

const angles = new Array(angleVariable).fill(1)

class WindVelocityGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataset: this.generateDataset()
    }

    const boundRender = this.renderGraph.bind(this, width => this.lastWidth = width)
    this.dbRender = debounce(boundRender, reRenderDebounce)
  }

  componentDidUpdate(){
    this.renderGraph()
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

  getLabels(){
    return map(colors, colorObj => {
      return (
        <div key={"label-" + colorObj.color} className="color-obj">
          <span className="color" style={{ background: colorObj.color }}></span>
          <p>{colorObj.label}</p>
        </div>)
    })
  }

  initGraph(){
    const svg = d3.select('#wind-velocity')
      .append('g')
      .attr('class', 'data-set')

    svg.append('g')
      .attr('class', 'circle-shadows')

    svg.append('g')
      .attr('class', 'circle-lines')

    svg.append('g')
      .attr('class', 'chart-data')

    svg.append('g')
      .attr('class', 'axises')

    svg.append('g')
      .attr('class', 'degree-labels')

    svg.append('g')
      .attr('class', 'wind-angles-labels')

    this.renderGraph()
  }

  generateDataset(){
    const start = getRandom(0, 10)
    const end = getRandom(start, angleVariable)

    return map(range(hours), () => {
    	const random = getRandom(0, colors.length - 1)
    	const color = colors[random].color
      const angle = getRandom(start, end)
      return {
      	angle: angle,
        color: color
      }
    })
  }

  renderGraph(){
    if (this.isUnmounted()) return

    const { dataset } = this.state

    d3.select('#wind-velocity').attr('height', 0)

    const container = this.refs["wind-velocity-container"]
    const height = container.offsetHeight
    const width = container.offsetWidth - 250
    const smallestDimension = d3.min([height, width])

    const margin = smallestDimension / 7
    const innerRadius = 80
    const circleWidth = ((smallestDimension/2) - innerRadius - margin)/hours

    const svg = d3.select('#wind-velocity')
       .attr('height', smallestDimension)
       .attr('width', smallestDimension)

    svg.select('.data-set')
       .attr("transform", "translate(" + (smallestDimension / 2) + ", " + ((smallestDimension - (margin/2)) / 2) + ")")

    const config = {
      svg,
      width: smallestDimension,
      height: smallestDimension,
      innerRadius,
      circleWidth,
      circles: range(hours + 1),
      angles,
      angleVariable,
      hours,
      oneDegreeSpan,
      weatherDirections,
      dataset
    }

    renderCircleShadows(config)
    renderCircleLines(config)
    renderData(config)
    renderAxises(config)
    renderDegreeLabels(config)
    renderWindAngles(config)
  }

  render(){
    return(
      <div className="project-wind-velocity">
        <div className="graph-holder">
          <div className="wind-velocity-container" ref="wind-velocity-container">
            <svg id="wind-velocity"></svg>
            <div className="graph-labels">
              {this.getLabels()}
              <div className="button-holder">
                <button className="generate-button"
                  onClick={() => this.setState({ dataset: this.generateDataset() })}>
                  Generate new data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}

module.exports = WindVelocityGraph
