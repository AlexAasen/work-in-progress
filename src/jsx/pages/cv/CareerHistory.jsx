const React = require('react')
const { map } = require('underscore')
const { career } = require('constants/cv')
const { getISODate } = require('js/utils')
const CareerGraph = require('common/graphs/CareerGraph.jsx')

class CareerHistory extends React.Component {
  getTags(){
    return map(career, (experience, idx) => {
      const period = experience.timeperiod
      const timeString = getISODate(period[0]) + " - " + (period[1] ? getISODate(period[1]) : "Present")
      return(
        <div key={idx} className="timeline-tag">
          <div className="tag-holder">
            <div className="tag">
              <h3>{experience.role}</h3>
              <span className="company">{experience.company} - </span>
              <span className="timeperiod">{timeString}</span>
              <span className="tag-arrow"></span>
            </div>
          </div>
          <div className="timeline-line">
            <span className="timeline-entry"></span>
          </div>
        </div>)
    })
  }

  render(){
    return(
      <div className="cv-entry career">
        <div className="timeline-container">
          {this.getTags()}
        </div>
        <CareerGraph />
      </div>)
  }
}

module.exports = CareerHistory
