const React = require('react')
const { map } = require('underscore')
const { evaluateCode } = require('appUtils/mastermindUtils.js')

class ProgressBox extends React.Component {
  evaluate(){
    const { row, code, evaluate, gameWon, pegsPerRow } = this.props
    const evaluation = evaluateCode(code, row, pegsPerRow)
    const callback = evaluation.correctGuesses === code.length ? gameWon : evaluate.bind(this, evaluation.evaluation)

    callback()
  }

  lockedEval(){
    return(
      <button className="evaluation-button locked">
        Submit
      </button>)
  }

  eval(){
    return(
      <button className="evaluation-button" onClick={this.evaluate.bind(this)}>
        Submit
      </button>
    )
  }

  evaluated(){
    const { evaluation } = this.props

    return map(evaluation, (peg, idx) => {
      return <div key={idx} className="progress-peg" style={{ background: peg }}></div>
    })
  }

  render(){
    const { active, rowIdx, evaluation } = this.props

    let progress
    if(active < rowIdx) progress = this.lockedEval()
    else if(!evaluation && (active === rowIdx)) progress = this.eval()
    else progress = this.evaluated()

    return(
      <div className="progress-box">
        {progress}
      </div>
    )
  }
}

module.exports = ProgressBox
