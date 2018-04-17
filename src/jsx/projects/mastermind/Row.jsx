const React = require('react')
const { map } = require('underscore')
const clone = require('clone')
const Peg = require('./Peg.jsx')
const ProgressBox = require('./ProgressBox.jsx')

class Row extends React.Component {
  setColor(activeColor, idx){
    const { row, updateRow } = this.props
    let newRow = clone(row)
    newRow.row[idx] = activeColor

    updateRow(newRow)
  }

  getPegs(){
    const { activeColor, active, rowIdx, row } = this.props

    return map(row.row, (peg, idx) => {
      return <Peg key={idx}
        color={row.row[idx]}
        active={(active === rowIdx)}
        setColor={this.setColor.bind(this, activeColor, idx)}/>
    })
  }

  render(){
    const { active, code, rowIdx, row, evaluation, evaluate, gameWon, pegsPerRow } = this.props

    return(
      <div className={"row" + (active === rowIdx ? " active" : "")}>
        <div className="pegs">
          {this.getPegs()}
        </div>
        <ProgressBox active={active}
          row={row.row}
          code={code}
          gameWon={gameWon}
          rowIdx={rowIdx}
          pegsPerRow={pegsPerRow}
          evaluate={evaluate}
          evaluation={row.evaluation}/>
      </div>
    )
  }
}

module.exports = Row
