const React = require('react')
var _ = require('underscore')

class Slider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentHandlePosition: 0,
      steps: this.props.steps,
      dragging: false
    }
  }

  componentDidMount(){
    document.getElementById("draggable-handle").addEventListener("focusout", this.deactivateDrag.bind(this))
    document.addEventListener("mouseup", this.deactivateDrag.bind(this))
    document.addEventListener("mousemove", this.drag.bind(this))
  }

  componentWillUnmount(){
    document.getElementById("draggable-handle").removeEventListener("focusout", this.deactivateDrag.bind(this))
    document.removeEventListener("mouseup", this.deactivateDrag.bind(this))
    document.removeEventListener("mousemove", this.drag.bind(this))
  }

  activateDrag(){
    this.setState({ dragging: true })
  }

  deactivateDrag(){
    this.setState({ dragging: false })
  }

  drag(e){
    const { currentHandlePosition, steps } = this.state
    if(!this.state.dragging) return

    const mouseXPos = e.clientX
    const currentStep = document.getElementById("step-"+this.state.currentHandlePosition)
    const currentStepLocation = this.getOffset(currentStep)
    //If mouseXPos is below then it's an add
    const add = currentStepLocation.left + (currentStepLocation.width/2)
    const subtract = currentStepLocation.left - (currentStepLocation.width/2)

    if(mouseXPos > add && (currentHandlePosition !== (steps - 1))){
      const newPos = currentHandlePosition + 1
      this.setState({ currentHandlePosition: newPos })
    }
    if(mouseXPos <= subtract && (currentHandlePosition !== 0)){
      const newPos = currentHandlePosition - 1
      this.setState({ currentHandlePosition: newPos })
    }
  }

  getOffset(el){
    const rect = el.getBoundingClientRect()
    const stepWidth = rect.width
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    return { left: rect.left + scrollLeft, width: stepWidth }
  }

  getSteps(){
    const { steps } = this.state
    const style = { width: (100 / (steps - 1)) + "%" }

    return _.map(_.range(steps), (step, stepIdx) => {
      return <li key={stepIdx}
        id={"step-"+stepIdx}
        className="step"
        style={style}></li>
    })
  }

  getStepMarkup(){
    const { steps } = this.state
    const stepWidth = (100 / (steps - 1))

    return _.map(_.range(steps), step => {
      const leftOffset = (stepWidth * step)+'%'
      const style = { left: leftOffset }
      return(
        <span key={step} id={"stepmark-"+step} className="stepmark" style={style}
          onMouseDown={this.activateDrag.bind(this, step)}></span>)
    })
  }

  getHandle(){
    const { steps, currentHandlePosition } = this.state
    const stepWidth = (100 / (steps - 1))
    const leftOffset = 'calc('+(stepWidth * currentHandlePosition)+'% - 15px)'
    const style = { left: leftOffset }

    return <span id={"draggable-handle"} className="handle" style={style}
      onMouseDown={this.activateDrag.bind(this)}></span>
  }

  render(){
    return(
      <div className="slider-container">
        <ul className="slider-rail">
          {this.getSteps()}
          {this.getStepMarkup()}
          {this.getHandle()}
        </ul>
        <p>At step {this.state.currentHandlePosition}</p>
      </div>
    )
  }
}

module.exports = Slider;
