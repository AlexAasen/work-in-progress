const React = require('react')
const { Switch, Route } = require('react-router-dom')

const Contact = require('./pages/Contact.jsx')
const AboutMe = require('./pages/AboutMe.jsx')
const Skills = require('./pages/Skills.jsx')
const Cv = require('./pages/cv/Cv.jsx')

const Playground = require('./pages/Playground.jsx')
const AttributesProject = require('./projects/graphs/Attributes.jsx')
const Mastermind = require('./projects/games/mastermind/Mastermind.jsx')
const GameOfLife = require('./projects/games/gameOfLife/GameOfLife.jsx')
const Spaceshooter = require('./projects/games/spaceshooter/Spaceshooter.jsx')
const Pixis = require('./projects/pixis/Pixis.jsx')
const Vis = require('./projects/ViS.jsx')
const Illustration = require('./projects/Illustration.jsx')
const WindVelocityGraph = require('./projects/graphs/WindVelocityGraph.jsx')

class Content extends React.Component {
  render(){
    return(
      <Switch>
        <Route exact path='/' component={Playground}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/about' component={AboutMe}/>
        <Route path='/skills' component={Skills}/>
        <Route path='/cv' component={Cv}/>
        <Route exact path='/playground' component={Playground}/>
        <Route exact path='/playground/graphs/attributes' component={AttributesProject}/>
        <Route exact path='/playground/vis' component={Vis}/>
        <Route exact path='/playground/illustration' component={Illustration}/>
        <Route exact path='/playground/graphs/windvelocity' component={WindVelocityGraph}/>
        <Route exact path='/playground/games/mastermind' component={Mastermind}/>
        <Route exact path='/playground/games/spaceshooter' component={Spaceshooter}/>
        <Route exact path='/playground/games/game-of-life' component={GameOfLife}/>
        <Route exact path='/playground/pixis' component={Pixis}/>
      </Switch>)
  }
}

module.exports = Content
