const React = require('react')
var _ = require('underscore')
var clone = require('clone')

class RangeSlider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentHandlesPositions: [0, this.props.steps - 1],
      steps: this.props.steps,
      dragging: false
    }
  }

  componentDidMount(){
    document.getElementById("draggable-handle-"+ 0).addEventListener("focusout", this.deactivateDrag.bind(this))
    document.getElementById("draggable-handle-"+ 1).addEventListener("focusout", this.deactivateDrag.bind(this))
    document.addEventListener("mouseup", this.deactivateDrag.bind(this))
    document.addEventListener("mousemove", this.dragging.bind(this))
  }

  componentWillUnmount(){
    document.getElementById("draggable-handle-"+ 0).removeEventListener("focusout", this.deactivateDrag.bind(this))
    document.getElementById("draggable-handle-"+ 1).removeEventListener("focusout", this.deactivateDrag.bind(this))
    document.removeEventListener("mouseup", this.deactivateDrag.bind(this))
    document.removeEventListener("mousemove", this.dragging.bind(this))
  }

  activateDrag(handle){
    this.setState({ dragging: handle })
  }

  deactivateDrag(){
    this.setState({ dragging: false })
  }

  dragging(e){
    const { currentHandlesPositions, steps, dragging } = this.state
    if(dragging === false) return

    const mouseXPos = e.clientX
    const currentStep = document.getElementById("step-"+currentHandlesPositions[dragging])
    const currentStepLocation = this.getOffset(currentStep)
    //If mouseXPos is below then it's an add
    const add = currentStepLocation.left + (currentStepLocation.width/2)
    const subtract = currentStepLocation.left - (currentStepLocation.width/2)
    console.log(mouseXPos, add, subtract, e, currentStepLocation.width)
    var newPos = null

    if(mouseXPos > add && (currentHandlesPositions[dragging] !== (steps - 1))){
      //Before we go through with changing position, we need to check if the handles cross eachother
      //If they do they change who's handle1 and who's handle 2.
      newPos = clone(currentHandlesPositions)
      newPos[dragging] = newPos[dragging] + 1
    }
    else if(mouseXPos < subtract && (currentHandlesPositions[dragging] !== 0)){
      newPos = clone(currentHandlesPositions)
      newPos[dragging] = newPos[dragging] - 1
    }

    if(newPos){
      this.setState({ currentHandlesPositions: newPos })
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

  getTrack(){
    const { steps, currentHandlesPositions } = this.state
    const stepWidth = (100 / (steps - 1))
    var leftOffset = null;
    var rightOffset = null;
    if(currentHandlesPositions[0] > currentHandlesPositions[1]){
      leftOffset = 'calc('+(stepWidth * currentHandlesPositions[1])+'% - 15px)'
      rightOffset = 'calc('+(100 - (stepWidth * currentHandlesPositions[0]))+'% + 15px)'
    }
    else{
      leftOffset = 'calc('+(stepWidth * currentHandlesPositions[0])+'% - 15px)'
      rightOffset = 'calc('+(100 - (stepWidth * currentHandlesPositions[1]))+'% + 15px)'
    }
    const style = { left: leftOffset, right: rightOffset }
    return <div className="track" style={style}></div>
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

  getHandles(){
    const { steps, currentHandlesPositions } = this.state
    const stepWidth = (100 / (steps - 1))

    return _.map(currentHandlesPositions, (position, idx) => {
      const leftOffset = 'calc('+(stepWidth * position)+'% - 15px)'
      const style = { left: leftOffset }
      return(
        <span key={idx} id={"draggable-handle-"+idx} className="handle" style={style}
          onMouseDown={this.activateDrag.bind(this, idx)}></span>)
    })
  }

  render(){
    return(
      <div className="slider-container">
        <ul className="slider-rail">
          {this.getTrack()}
          {this.getSteps()}
          {this.getStepMarkup()}
          {this.getHandles()}
        </ul>
        <p>
          At steps {_.min(this.state.currentHandlesPositions) + " - " + _.max(this.state.currentHandlesPositions)}</p>
      </div>
    )
  }
}

module.exports = RangeSlider;
