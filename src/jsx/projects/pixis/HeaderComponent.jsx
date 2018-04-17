var React = require('react');

class HeaderComponent extends React.Component {
  render(){
    return(
      <div className="header-nav-container">
        <img className="header-img" src="src/img/pixisheader2.png" alt="Pixis header image"></img>
        <div className="header-headline-container">
          <span>P</span>
          <span>i</span>
          <span>x</span>
          <span>i</span>
          <span>s</span>
        </div>
        <span className="header-tagline">Pixel art made easy</span>
      </div>
    )
  }
}

module.exports = HeaderComponent
