var React = require('react');
var { map } = require('underscore');
const { colors } = require('constants/pixis.js')

class ColorNavComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
     activeColor: null
    }
  }

  handleColorClick(color, e){
    e.stopPropagation();
    this.setState({ activeColor: color },
      this.props.setActiveColor(color))
  }

  generateColors(){
    return map(colors, (color, idx) => {
      return <div key={idx}
        className="color"
        onClick={this.handleColorClick.bind(this, color)}
        style={{background: color}}></div>
    })
  }

  render(){
    return(
      <div className="color-menu">
        <div className="colors-container">
          <div className="color-container">
            {this.generateColors()}
          </div>
        </div>
        <div className="activeColor" style={{background: this.state.activeColor}}>
          {!this.state.activeColor ? "x" : null}
        </div>
      </div>
    )
  }
}

module.exports = ColorNavComponent
