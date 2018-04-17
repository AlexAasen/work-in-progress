const React = require('react')
const { map } = require('underscore')
const { keySkills } = require("constants/cv")

class KeySkills extends React.Component {
  getSkills(){
    return map(keySkills, (skill, idx) => {
      return(
        <div key={idx} className="cv-skill">{skill}</div>
      )
    })
  }

  render(){
    return(
      <div className="cv-entry keyskills">
        <span className="tag pink"></span>
        <h3>Key skills</h3>
        {this.getSkills()}
      </div>)
  }
}

module.exports = KeySkills
