const React = require('react');
const { Link } = require('react-router-dom')

class Footer extends React.Component {
  changePage(){
    const element = document.getElementById("main-nav-menu")
    element.setAttribute("class", "menu")
    this.props.changeActivePage("/contact")
  }

  render(){
    return(
      <div className="footer">
        <Link className="contact-me" to='/contact'>
          Contact me
        </Link>
      </div>)
  }
}

module.exports = Footer
