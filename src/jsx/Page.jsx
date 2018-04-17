const React = require('react')
const Menu = require("./Menu.jsx")
const Contact = require('./pages/Contact.jsx')
const AboutMe = require('./pages/AboutMe.jsx')
const Attributes = require('./pages/Attributes.jsx')
const Cv = require('./pages/Cv.jsx')

const Playground = require('./pages/Playground.jsx')
const Mastermind = require('./projects/mastermind/Mastermind.jsx')
const Pixis = require('./projects/pixis/Pixis.jsx')

class Page extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activePage: location.pathname
    }
  }

  changeActivePage(page){
    this.setState({ activePage: page }, () => {
      history.pushState(this.state, page, page)
      window.onpopstate = (event) => {
        this.setState({ activePage: event.state.activePage })
      }
    })
  }

  getActivePage(){
    let activePage = null;
    switch(this.state.activePage){
      case "/contact" : {
        activePage = <Contact changeActivePage={this.changeActivePage.bind(this)}/>
      }
      break;
      case "/about" : {
        activePage = <AboutMe changeActivePage={this.changeActivePage.bind(this)}/>
      }
      break;
      case "/attributes" : {
        activePage = <Attributes changeActivePage={this.changeActivePage.bind(this)}/>
      }
      break;
      case "/cv" : {
        activePage = <Cv changeActivePage={this.changeActivePage.bind(this)}/>
      }
      break
      case "/playground" : {
        activePage = <Playground changeActivePage={this.changeActivePage.bind(this)}/>
      }
      break;
      case "/playground/mastermind" : {
        activePage = <Mastermind changeActivePage={this.changeActivePage.bind(this)}/>
      }
      break;
      case "/playground/pixis" : {
        activePage = <Pixis changeActivePage={this.changeActivePage.bind(this)}/>
      }
      break;
      default: activePage = <h1>No content</h1>
    }
    return activePage
  }

  render(){
    const { activePage } = this.state
    return(
      <div className={"page " + (activePage === "/about" ? "about" : "")}>
        <Menu changeActivePage={this.changeActivePage.bind(this)} activePage={activePage} />
        {this.getActivePage()}
      </div>
    )
  }
}

module.exports = Page
