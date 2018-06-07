const React = require('react')
const diff = require('deep-diff')
const clone = require('clone')
const { map, range, each, reject, flatten, contains } = require('underscore')
const { getRandom } = require('js/utils')

const widthDensity = 80
const heightDensity = 60

class GameOfLife extends React.Component {
  constructor(){
    super()
    this.state = {
      board: []
    }

    this.interval = null
    this.getId = (colIndex, rowIndex) => (rowIndex * widthDensity) + colIndex
    this.componentCleanup = this.componentCleanup.bind(this)
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.componentCleanup)
    this.init()
  }

  componentWillUnmount() {
     this.componentCleanup()
     window.removeEventListener('beforeunload', this.componentCleanup)
   }

  componentCleanup(){
    clearInterval(this.interval)
  }

  init(){
    const board = new Array(heightDensity).fill(new Array(widthDensity).fill(false))

    this.setState({ board }, () => this.setUpSim())
  }

  setUpSim(){
    const indexes = this.generateStartPos()

    this.setState({ board: this.updateStartPos(indexes) }, () => {
      this.startSim()
    })
  }

  generateStartPos(){
    const base = [Math.floor((widthDensity/2) - 4), Math.floor((heightDensity/2) - 3)]
    const widthSpan = map(range(8), (x, idx) => base[0] + idx)
    const heightSpan = map(range(6), (x, idx) => base[1] + idx)

    let spanIds = flatten(map(heightSpan, rowIdx => {
      return map(widthSpan, colIdx => {
        return this.getId(colIdx, rowIdx, widthDensity)
      })
    }))

    each(range(24), () => {
      const randomIdx = getRandom(0, spanIds.length - 1)
      spanIds = reject(spanIds, (id, idx) => idx === randomIdx)
    })

    return spanIds
  }

  updateStartPos(indexes){
    const { board } = this.state

    return map(board, (row, rowIndex) => {
      return map(row, (column, colIndex) => {
        const id = this.getId(colIndex, rowIndex, widthDensity)

        return contains(indexes, id)
      })
    })
  }

  startSim(){
    clearInterval(this.interval)

    this.interval = setInterval(() => {
      const prevBoard = this.state.board
      const newBoard = this.update()

      if(!!diff(prevBoard, newBoard)){
        this.setState({ board: newBoard })
      }
      else {
        clearInterval(this.interval)
      }
    }, 600)
  }

  /*RULES
  For a space that is populated:
    Each cell with one or no neighbors dies, as if by solitude.
    Each cell with four or more neighbors dies, as if by overpopulation.
    Each cell with two or three neighbors survives.
  For a space that is empty or unpopulated
    Each cell with three neighbors becomes populated.
  */
  update(){
    const { board } = this.state

    return map(board, (row, rowIdx) => {
      return map(row, (column, columnIdx) => {
        const occupied = column
        const surrounding = this.getSurrounding(board, rowIdx, columnIdx)
        const neighbours = surrounding.filter(x => !!x).length

        if(occupied){
          if(neighbours <= 1) return false
          if(neighbours >= 4) return false
          return true
        }
        if(neighbours === 3) return true
        return false
      })
    })
  }

  getSurrounding(board, rowIdx, colIdx){
    const validRow = rowIdx => (rowIdx >= 0) && (rowIdx < heightDensity)
    const validCol = colIdx => (colIdx >= 0) && (colIdx < widthDensity)
    const possiblePos = (rowIdx, colIdx) => validRow(rowIdx) && validCol(colIdx)

    const nw = possiblePos(rowIdx - 1, colIdx - 1) && board[rowIdx - 1][colIdx - 1]
    const n = possiblePos(rowIdx - 1, colIdx) && board[rowIdx - 1][colIdx]
    const ne = possiblePos(rowIdx - 1, colIdx + 1) && board[rowIdx - 1][colIdx + 1]
    const e = possiblePos(rowIdx, colIdx - 1) && board[rowIdx][colIdx - 1]
    const se = possiblePos(rowIdx, colIdx + 1) && board[rowIdx][colIdx + 1]
    const s = possiblePos(rowIdx + 1, colIdx - 1) && board[rowIdx + 1][colIdx - 1]
    const sw = possiblePos(rowIdx + 1, colIdx) && board[rowIdx + 1][colIdx]
    const w = possiblePos(rowIdx + 1, colIdx + 1) && board[rowIdx + 1][colIdx + 1]

    return [nw, n, ne, e, se, s, sw, w]
  }

  renderBoard(){
    const { board } = this.state

    const colWidth = 100 / widthDensity
    const rowHeight = 100 / heightDensity
    const borderMargin = 1 + (1 / widthDensity)

    const rowMarkup = (row, rowIdx) => {
      return map(row, (column, columnIdx) => {
        const id = this.getId(columnIdx, rowIdx, widthDensity)
        const colorStyle = column ? ' colored ' : ''

        return <div key={"column-" + id}
          className={"box id-" + id + colorStyle}
          style={{ width: 'calc(' + colWidth + '% - ' + borderMargin + 'px)' }}></div>
      })
    }

    return map(board, (row, rowIdx) => {
      return(
        <div key={"row-" + rowIdx}
          className={"row id-" + rowIdx}
          style={{ height: rowHeight + "%" }}>
          {rowMarkup(row, rowIdx)}
        </div>)
    })
  }

  render(){
    return(
      <div className="project-game-of-life">
        <div className="button-holder">
          <button className="generate-button"
            onClick={this.setUpSim.bind(this)}>
            Start new simulation
          </button>
        </div>
        <div className="board-container" ref="board-container">
          {this.renderBoard()}
        </div>
      </div>)
  }
}

module.exports = GameOfLife
