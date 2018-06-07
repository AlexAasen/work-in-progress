const React = require('react')
const Menu = require("./Menu.jsx")
const Contact = require('./pages/Contact.jsx')
const AboutMe = require('./pages/AboutMe.jsx')
const Skills = require('./pages/Skills.jsx')
const Cv = require('./pages/cv/Cv.jsx')

const Playground = require('./pages/Playground.jsx')
const AttributesProject = require('./projects/graphs/Attributes.jsx')
const Mastermind = require('./projects/games/mastermind/Mastermind.jsx')
const GameOfLife = require('./projects/games/gameOfLife/GameOfLife.jsx')
const Pixis = require('./projects/pixis/Pixis.jsx')
const Vis = require('./projects/ViS.jsx')
const Illustration = require('./projects/Illustration.jsx')
const WindVelocityGraph = require('./projects/graphs/WindVelocityGraph.jsx')

class Page extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activePage: location.pathname
    }

    this.changeActivePage = this.changeActivePage.bind(this)
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
        activePage = <Contact changeActivePage={this.changeActivePage}/>
      }
      break
      case "/about" : {
        activePage = <AboutMe changeActivePage={this.changeActivePage}/>
      }
      break
      case "/skills" : {
        activePage = <Skills changeActivePage={this.changeActivePage}/>
      }
      break
      case "/cv" : {
        activePage = <Cv changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground" : {
        activePage = <Playground changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground/graphs/attributes" : {
        activePage = <AttributesProject changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground/vis" : {
        activePage = <Vis changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground/illustration" : {
        activePage = <Illustration changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground/graphs/windvelocity" : {
        activePage = <WindVelocityGraph changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground/games/mastermind" : {
        activePage = <Mastermind changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground/games/game-of-life" : {
        activePage = <GameOfLife changeActivePage={this.changeActivePage}/>
      }
      break
      case "/playground/pixis" : {
        activePage = <Pixis changeActivePage={this.changeActivePage}/>
      }
      break
      default: activePage = <h1>No content</h1>
    }
    return activePage
  }

  render(){
    const { activePage } = this.state
    return(
      <div className={"page " + (activePage === "/about" ? "about" : "")}>
        <Menu changeActivePage={this.changeActivePage} activePage={activePage} />
        {this.getActivePage()}
      </div>
    )
  }
}

module.exports = Page
