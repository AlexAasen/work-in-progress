const React = require('react')

class WindVelocityGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      angleVariable: 16,
      hours: 24 * 4,
      radians: 2 * Math.PI,
      oneDegreeSpan: mathRadians(360/angleVariable),
      weatherDirections: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    }
    this.init()
  }

  init(){

  }

  render(){
    return(
      <div id="windVelocityGraph"></div>
    )
  }
}

module.exports = WindVelocityGraph
