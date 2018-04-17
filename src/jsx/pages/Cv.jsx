const React = require('react')
const { map } = require('underscore')
const { cvContacts, cvMenu } = require('constants/social')
const { intro } = require('constants/cv')
const KeySkills = require('./cv/KeySkills.jsx')
const CareerHistory = require('./cv/CareerHistory.jsx')

class Cv extends React.Component {
  constructor(){
    super()
    this.state = {
      introOpen: false
    }
  }

  getContacts(){
    return map(cvContacts, (contact, idx) => {
      return(
        <div key={idx} className="contact-info">
          <span className={contact.className} role="img"></span>
          <p>alexaasen@outlook.com</p>
        </div>)
    })
  }

  getProfile(){
    return(
      <div className="cv-profile">
        <div className="profile-image">
          <div className="cv-img"></div>
        </div>
        <div className="profile-ingress">
          <h3>Alex Aasen</h3>
          <h4>Front-end developer</h4>
          <p>
            Loves to bring ideas to life.
          </p>
        </div>
        <div className="profile-contact">
          {this.getContacts()}
        </div>
      </div>)
  }

  getMenu(){
    return map(cvMenu, (item, idx) => {
      return(
        <li key={idx}
          className="menu-item">
          {item.name}
        </li>
      )
    })
  }

  openIntro(){
    this.setState(state => { return { introOpen: !state.introOpen }})
  }

  getIntro(introOpen){
    return introOpen ? map(intro, (text, idx) => {
      return <p key={idx}>{text}</p>
    }) : <p>{intro[0]}</p>
  }

  render(){
    const { introOpen } = this.state

    return(
      <div className="cv-page">
        {this.getProfile()}
        <div className="cv-view">
          <ul className="cv-menu">
            {this.getMenu()}
          </ul>
          <div className="cv-content">
            <div className={"cv-entry intro" + (introOpen ? " open": "")}>
              <span className="tag orange"></span>
              <h3>Introduction</h3>
              {this.getIntro(introOpen)}
              {!introOpen ?
                <span className="icon icon-arrow-down" onClick={this.openIntro.bind(this)}></span>
                : <span className="icon icon-arrow-down flipped" onClick={this.openIntro.bind(this)}></span>}
            </div>
            <KeySkills />
            <CareerHistory />
          </div>
        </div>
      </div>)
  }
}

module.exports = Cv
