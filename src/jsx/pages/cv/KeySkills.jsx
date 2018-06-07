const React = require('react')
const { map } = require('underscore')
const { keySkills } = require("constants/cv")

class KeySkills extends React.Component {
  getSkills(){
    return map(keySkills, (skill, idx) => {
      return <div key={idx} className="cv-skill">{skill}</div>
    })
  }

  render(){
    return(
      <div className="cv-entry keyskills">
        {this.getSkills()}
      </div>)
  }
}

module.exports = KeySkills
