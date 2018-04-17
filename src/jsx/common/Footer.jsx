var React = require('react');

class Footer extends React.Component {
  changePage(){
    var element = document.getElementById("main-nav-menu");
    element.setAttribute("class", "menu");
    this.props.changeActivePage("/contact");
  }

  render(){
    return(
      <div className="footer">
        <div className="contact-me" onClick={this.changePage.bind(this)}>
          Contact me
        </div>
      </div>
    )
  }
}

module.exports = Footer;
