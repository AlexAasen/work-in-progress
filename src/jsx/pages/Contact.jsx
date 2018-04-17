const React = require('react')
const { map } = require('underscore')
const { social } = require('constants/social.js')

class Contact extends React.Component {
  getSocial(){
    return map(social, (item, idx) => {
      return (
        <a key={idx} className="menu-item" href={item.href} target="_blank" alt={item.alt}>
          <span className={item.className} role="img"></span>
        </a>
      )
    })
  }

  render(){
    return(
      <div className="contact-page">
        <span className="icon-connection icon"></span>
        <h2>Let's connect!</h2>
        <div className="vertical-line"></div>
        <h4 className="email">
          alexaasen@outlook.com
        </h4>
        <ul className="social-menu">
          {this.getSocial()}
        </ul>
      </div>)
  }
}

module.exports = Contact
