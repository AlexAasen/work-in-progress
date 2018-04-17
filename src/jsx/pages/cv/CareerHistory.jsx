const React = require('react')
const { map } = require('underscore')
const { career } = require('constants/cv')

class CareerHistory extends React.Component {
  getExperience(){
    const tags = (tags) => {
      return map(tags, (tag, idx) => {
        return <div key={idx} className="cv-skill">{tag}</div>
      })
    }

    return map(career, (experience, idx) => {
      return(
        <div key={idx} className="carrer-entry">
          <span className="tag turqoise"></span>
          <h3>{experience.role}</h3>
          <h4>{experience.company}</h4>
          <p>{experience.description}</p>
          <div className="keyskills">
            {tags(experience.tags)}
          </div>
        </div>)
    })
  }

  render(){
    return(
      <div className="cv-entry career">
        {this.getExperience()}
      </div>)
  }
}

module.exports = CareerHistory
