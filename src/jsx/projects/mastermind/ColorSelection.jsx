const React = require('react')
const { map } = require('underscore')
const { colors } = require('constants/mastermind.js')

class ColorSelection extends React.Component {
  getColors(){
    const { setActiveColor, activeColor } = this.props

    return map(colors, (color, idx) => {
      return <div key={idx}
        className={"color " + (activeColor === color ? "active" : "")}
        onClick={setActiveColor.bind(this, color)}
        style={{ background: color }}></div>
    })
  }

  render(){
    return(
      <div className="colors">
        {this.getColors()}
      </div>
    )
  }
}

module.exports = ColorSelection
