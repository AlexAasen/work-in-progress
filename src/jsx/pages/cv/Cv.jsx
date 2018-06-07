const React = require('react')
const { map } = require('underscore')
const KeySkills = require('./KeySkills.jsx')
const CareerHistory = require('./CareerHistory.jsx')
const Profile = require('./Profile.jsx')
const Intro = require('./Intro.jsx')
const Education = require('./Education.jsx')

class Cv extends React.Component {
  constructor(){
    super()

  }

  render(){
    return(
      <div className="cv-page">
        <Profile />
        <div className="cv-view">
          <div className="cv-content">
            <Intro />
            <KeySkills />
            <CareerHistory />
            <Education />
          </div>
        </div>
      </div>)
  }
}

module.exports = Cv
