const React = require('react')
const { map, shuffle, isEqual, contains, reject } = require('underscore')
const Cookies = require('js-cookie')
const clone = require('clone')
const { getRandom } = require('js/utils')

class Memory extends React.Component {
  constructor(){
    super()
    this.state = {
      board: []
    }
    this.blocking = false
    this.imgs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
  }

  componentDidMount(){
    this.setUpBoard()
  }

  setUpBoard(){
    const board = this.imgs.concat(this.imgs)

    this.setState({ board: shuffle(board), selected: [], gameOver: false, guesses: 0 })
  }

  selectEntry(idx){
    let newSelection = clone(this.state.selected)
    newSelection.push(idx)

    if(newSelection.length === 2){
      this.blocking = true
      this.setState({ selected: newSelection }, () => {
        this.evaluateSelection(newSelection)
      })
    }
    else{
      this.setState({ selected: newSelection })
    }
  }

  evaluateSelection(selected){
    const { board, guesses } = this.state
    let newBoard = clone(board)

    const first = board[selected[0]]
    const second = board[selected[1]]

    if(isEqual(first, second)){
      newBoard[selected[0]] = 'solved'
      newBoard[selected[1]] = 'solved'
    }

    const gameOver = reject(newBoard, item => item === 'solved').length === 0

    setTimeout(() => {
      this.blocking = false
      this.setState({ selected: [], board: newBoard, gameOver, guesses: guesses + 1 })
    }, 1500)
  }

  renderBoard(){
    const { selected, board } = this.state

    return map(board, (item, idx) => {
      const isSelected = contains(selected, idx)
      const styleClass = isSelected ? 'selected' : item === 'solved' ? 'solved' : 'hidden'
      const disabled = isSelected || (item === 'solved') || this.blocking

      return(
        <div key={idx}
          className={"board-entry " + styleClass}
          onClick={() => !disabled && this.selectEntry(idx)}>
          <p className="entry">
            {isSelected && item}
          </p>
        </div>)
    })
  }

  gameOver(){
    const { guesses } = this.state

    const prevHighScore = Cookies.get('memoryHighScore')
    const newHighScore = !prevHighScore || (prevHighScore && (guesses < prevHighScore))
    console.log(prevHighScore)

    if(newHighScore){
      Cookies.set('memoryHighScore', guesses)
    }

    return newHighScore ? (
      <div className="gameover">
        <p>New highscore! You won in {guesses} guesses!</p>
        {prevHighScore && <p>Previous highscore: {prevHighScore}</p>}
      </div>
    ) : <div className="gameover">
      <p>You won in {guesses} guesses!</p>
    </div>
  }

  render(){
    const { gameOver } = this.state

    const board = gameOver ? this.gameOver() : this.renderBoard()

    return(
      <div className="project-memory">
        <div className="button-holder">
          <button className="generate-button"
            onClick={this.setUpBoard.bind(this)}>
            Start new game
          </button>
        </div>
        <div className="board-container">
          {board}
        </div>
      </div>)
  }
}

module.exports = Memory
