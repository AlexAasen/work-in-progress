const React = require('react')
const { map } = require('underscore')

const { cvContacts } = require('constants/social')

class Profile extends React.Component {
  getContacts(){
    return map(cvContacts, (contact, idx) => {
      return(
        <div key={idx} className="contact-info">
          <span className={contact.className} role="img"></span>
          <p>alexaasen@outlook.com</p>
        </div>)
    })
  }

  render(){
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
}

module.exports = Profile
