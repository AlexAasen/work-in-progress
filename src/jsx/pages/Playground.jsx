const React = require('react')
const _ = require('underscore')
const Footer = require('common/Footer.jsx');

class Playground extends React.Component {
  render(){
    return(
      <div className="playground-page">
        <div className="spacer">
          <div className="project">
            <div className="project-image vis"></div>
            <div className="dim-filter"></div>
            <div className="project-information">
              <div className="title-background"></div>
              <h3 className="project-title">Vården i Siffror</h3>
              <p className="project-description">Visualizing the statistics behind the healthcare in Sweden in a fun and interesting way</p>
            </div>
          </div>
          <div className="project" onClick={this.props.changeActivePage.bind(this, "/playground/mastermind")}>
            <div className="project-image mastermind"></div>
            <div className="dim-filter"></div>
            <div className="project-information">
              <div className="title-background"></div>
              <h3 className="project-title">Mastermind</h3>
              <p className="project-description">Remake of the classic boardgame</p>
            </div>
          </div>
          <div className="project" onClick={this.props.changeActivePage.bind(this, "/playground/pixis")}>
            <div className="project-image pixis"></div>
            <div className="dim-filter"></div>
            <div className="project-information">
              <div className="title-background"></div>
              <h3 className="project-title">Pixis</h3>
              <p className="project-description">Draw pixel art and export it as a png</p>
            </div>
          </div>
        </div>
        <Footer changeActivePage={this.props.changeActivePage.bind(this)}/>
      </div>)
  }
}

module.exports = Playground
