var React = require('react')
var { map } = require('underscore')
var PixieBoxComponent = require('./PixieBoxComponent.jsx')

class PixisBoardComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      widthDensity: 100,
      heightDensity: 50,
      pixelHeight: 9
    }

  }

  componentWillMount(){
    this.init()

  }

  init(){
    const { widthDensity, heightDensity } = this.state
    const board = new Array(widthDensity).fill(new Array(heightDensity).fill(null))

    this.setState({ board: board })
  }

  generateBoard(){
    const { board } = this.state

    const getId = (colIndex, rowIndex) => (colIndex * 100) + rowIndex
    const generateRow = (row, colIndex) => {
      return map(row, (pixel, rowIndex) => {
        const id = getId(colIndex, rowIndex)
        return <PixieBoxComponent key={id} id={id} />
      })
    }

    return map(board, (row, colIndex) =>{
      return (
        <div key={"row-"+colIndex} className="pixel-row">
          {generateRow(row, colIndex)}
        </div>)
    })
  }

  render(){
    const { height, pixelHeight } = this.state
    const boardStyle = { height: (height * pixelHeight) + "px" }

    return(
      <div className="pixis-board-container"
        style={ boardStyle }>
        {this.generateBoard()}
      </div>)
  }
}

module.exports = PixisBoardComponent;
