const React = require('react')
const { map } = require('underscore')

class GalleryView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      initial: true,
      activeIdx: 0,
      prevIdx: 0,
      list: props.list
    }
  }

  componentDidMount(){
    document.getElementById('simulated-scroll').addEventListener('mousewheel', this.scroll.bind(this))
  }

  componentWillUnMount(){
    document.getElementById('simulated-scroll').removeEventListener('mousewheel', this.scroll.bind(this))
  }

  scroll(event){
    document.getElementById('simulated-scroll').scrollLeft -= event.wheelDelta
    event.preventDefault()
  }

  updateState(idx){
    this.setState(state => ({ activeIdx: idx, prevIdx: state.activeIdx, initial: false }))
  }

  getImgs(){
    const { activeIdx, list } = this.state

    return map(list, (item, idx) => {
      const styleClass = activeIdx === idx ? 'focus' : ''

      return <img key={idx}
        className={"image-entry " + styleClass}
        onClick={this.updateState.bind(this, idx)}
        src={item}></img>
    })
  }

  render(){
    const { activeIdx, prevIdx, list, initial, type } = this.state
    const backIdx = (activeIdx - 1) < 0 ? 0 : activeIdx - 1
    const nextIdx = (activeIdx + 1) > (list.length - 1) ? list.length - 1 : activeIdx + 1
    const prevDis = (activeIdx === 0) ? "disabled" : ''
    const nextDis = (activeIdx === (list.length - 1)) ? 'disabled' : ''
    const anim = initial ? 'initial' : ((prevIdx > activeIdx) || (activeIdx === 0) ? "prev" : "next")

    return(
      <div className="project-view">
        <div id="active-view-holder" className="active-view-holder">
          <span className={"icon icon-backward " + prevDis} onClick={this.updateState.bind(this, backIdx)}></span>
          <img key={list[activeIdx]} className={"image-entry " + anim} src={list[activeIdx]}></img>
          <span className={"icon icon-forward " + nextDis} onClick={this.updateState.bind(this, nextIdx)}></span>
        </div>
        <div className="selection-panel" id="simulated-scroll">
          {this.getImgs()}
        </div>
      </div>)
  }
}

module.exports = GalleryView
