const React = require('react')

const ColorSelector = (props) => {
  const { selected, updateSelected } = props

  const colors = ["black", "blue", "pink", "green", "yellow", "orange", "purple"]

  return <div className="color-selection">
    {colors.map((x, idx) => {
      const selectedClass = selected === x ? "selected" : ""
      const classNames = ["color", selectedClass].join(" ")

      return <div className={classNames} key={idx}
        style={{ background: x }}
        onClick={updateSelected.bind(this, x)}></div>
    })}
  </div>
}

module.exports = ColorSelector
