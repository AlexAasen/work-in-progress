const React = require('react')

class Peg extends React.Component {
  render(){
    const { color, active, setColor } = this.props

    return(
      <div className={"peg " + (color ? "colored" : "")}
        style={{ background: color || "none", cursor: active ? "pointer" : "initial" }}
        onClick={() => active ? setColor() : null}></div>
    )
  }
}

module.exports = Peg
