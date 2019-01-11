const React = require('react')
const {
  setupBoard,
  assignNewRandom,
  getSteps,
  calcScore,
  checkForGameOver,
  calcNewPositions
} = require('appUtils/2048Utils')
const {
  directions
} = require('constants/2048')
const Cookies = require('js-cookie')

class G2048 extends React.Component {
  constructor(props){
    super(props)

    this.handleKey = this.handleKey.bind(this)
    this.state = {
      board: setupBoard(this.randomize),
      score: 0,
      highScore: Cookies.get('2048HighScore') || 0,
      gameOver: false
    }
    this.renderId = -1
  }

  componentDidMount(){
    window.addEventListener("keydown", this.handleKey)
  }

  componentWillUnmount(){
    window.removeEventListener("keydown", this.handleKey)
  }

  restart(){
    this.setState({ board: setupBoard(this.randomize), score: 0, gameOver: false })
  }

  handleKey(event){
    const { board, score, highScore } = this.state

    event.preventDefault()
    let key = event.key
    const direction = directions[key]

    if(!direction || gameOver) return

    let newBoard = calcNewPositions(board, direction)
    newBoard = assignNewRandom(newBoard)

    const newScore = calcScore(score, newBoard)
    const diff = newScore - score

    const gameOver = checkForGameOver(newBoard)
    if(gameOver){
      if(score > highScore){
        Cookies.set('2048HighScore', newScore)
      }
    }

    this.setState({
      board: newBoard,
      direction,
      score: newScore,
      newScore: diff,
      gameOver,
      highScore: (gameOver && (score > highScore) ? newScore : highScore)
    })
  }

  render(){
    const { board, direction, highScore, score, newScore, gameOver } = this.state
    this.renderId++

    const boardMarkup = board.map((entry, idx) => {
      const hasValue = entry.value ? "has-value" : ""
      const valueClass = entry.value ? ("v-" + entry.value) : ""
      const mergedValueClass = entry.value && entry.merged ? ("v-" + entry.value / 2) : ""
      const merged = entry.merged ? "merged" : ""
      const appear = entry.new ? "appear" : ""
      const steps = getSteps(direction, entry)
      const directionClass = steps.length > 0 ? direction: ""

      return <div key={idx} className={[merged, steps, "board-entry"].join(" ")}>
        <span key={"base-" + this.renderId} className={[appear, directionClass, hasValue, valueClass, "value"].join(" ")}>
          {entry.value}
          {entry.merged && <span key={"top-" + this.renderId} className={[hasValue, mergedValueClass, "merging value"].join(" ")}>{entry.value / 2}</span>}
        </span>
      </div>
    })
    const scoreClass = newScore ? "anim-score" : ""
    const gameOverMarkup = gameOver && <p className="game-over">Game over! You scored: {score}</p>

    return(
      <div className="page-container-2048">
        <div className="metadata-container">
          {gameOverMarkup}
          <div className="score">
            <span className="header">Score</span>
            <span key={score} className={[scoreClass, "value"].join(" ")}>{score}</span>
          </div>
          <div className="highscore">
            <span className="header">Highscore</span>
            <span className="value">{highScore}</span>
          </div>
          <div className="button-holder">
            <button className="generate-button" onClick={this.restart.bind(this)}>Start new game</button>
          </div>
        </div>
        <div className="board-game">
          {boardMarkup}
        </div>
      </div>)
  }
}

module.exports = G2048
