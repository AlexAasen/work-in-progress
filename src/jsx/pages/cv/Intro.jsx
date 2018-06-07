const React = require('react')
const { map } = require('underscore')
const { intro, specialization } = require('constants/cv')

class Intro extends React.Component {
  getIntro(){
    return map(intro, (text, idx) => {
      return <p key={idx}>{text}</p>
    })
  }

  getSkills(){
    return map(specialization, (entry, idx) => {
      return(
        <div key={idx} className="skill">
          <h4>{entry.skill}</h4>
          <div className="skill-bar">
            <div className="value" style={{ width: entry.value + "%" }}></div>
          </div>
        </div>)
    })
  }

  render(){
    return(
      <div className="cv-entry intro">
        <div className="intro-container">
          <h3>Introduction</h3>
          {this.getIntro()}
        </div>
        <div className="specialization">
          <h3>Current specialization</h3>
          {this.getSkills()}
        </div>
      </div>)
  }
}

module.exports = Intro
