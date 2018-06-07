const React = require('react')
const { map } = require('underscore')
const { education } = require('constants/cv')
const { getISODate } = require('js/utils')

class Education extends React.Component {
  getEntries(){
    return map(education, (entry, idx) => {
      const period = entry.timeperiod
      const timeString = getISODate(period[0]) + " - " + (period[1] ? getISODate(period[1]) : "Present")

      return(
        <div key={idx} className="education-entry">
          <div className="school" style={{ backgroundImage: entry.school }}></div>
          <span className="line"></span>
          <h3>{entry.mastery}</h3>
          <p className="timeperiod">{timeString}</p>
          <p>{entry.description}</p>
        </div>
      )
    })
  }
  render(){
    return(
      <div className="cv-entry education">
        {this.getEntries()}
      </div>
    )
  }
}

module.exports = Education
