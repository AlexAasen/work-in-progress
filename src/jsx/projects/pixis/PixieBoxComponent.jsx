const React = require('react')
const EventBus = require('./EventBus.js')

class PixieBoxComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     color: null
    }
  }

  componentDidMount(){
    EventBus.addListener(this.props.id,
      this.changeColor.bind(this))
  }

  changeColor(color){
    this.setState({ color: color })
  }

  mouseDown(id){
    EventBus.handleMouseDown(id)
  }

  mouseOver(id){
    EventBus.handleMouseOver(id)
  }

  render(){
    return(
      <div key={this.props.id}
        id={this.props.id} className="pixel-box"
        onMouseDown={this.mouseDown.bind(this, this.props.id)}
        onMouseOver={this.mouseOver.bind(this, this.props.id)}
        style={{ background: this.state.color }}>
      </div>
    )
  }
}

module.exports = PixieBoxComponent
