const React = require('react')
const { Switch, Route } = require('react-router-dom')

const Contact = require('./pages/Contact.jsx')
const AboutMe = require('./pages/AboutMe.jsx')
const Skills = require('./pages/Skills.jsx')
//const Cv = require('./pages/cv/Cv.jsx')

const Playground = require('./pages/Playground.jsx')
const Mastermind = require('./projects/games/mastermind/Mastermind.jsx')
const GameOfLife = require('./projects/games/gameOfLife/GameOfLife.jsx')
const Memory = require('./projects/games/memory/Memory.jsx')
const G2048 = require('./projects/games/2048/G2048.jsx')

const Pixis = require('./projects/pixis/Pixis.jsx')
const Vis = require('./projects/ViS.jsx')
const Illustration = require('./projects/Illustration.jsx')
const NewsFeed = require('./projects/NewsFeed.jsx')
const QA = require('./projects/QA.jsx')
const Cv = require('./projects/random/Cv.jsx')

const Attributes = require('./projects/graphs/Attributes.jsx')
const WindVelocityGraph = require('./projects/graphs/WindVelocityGraph.jsx')
const CrimesGraph = require('./projects/graphs/CrimesGraph.jsx')

const ColoringBook = require('./projects/random/ColoringBook.jsx')

class Content extends React.Component {
  render(){
    return(
      <Switch>
        <Route exact path='/' component={Playground}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/about' component={AboutMe}/>
        <Route path='/skills' component={Skills}/>
        <Route exact path='/playground' component={Playground}/>
        <Route exact path='/playground/vis' component={Vis}/>
        <Route exact path='/playground/illustration' component={Illustration}/>
        <Route exact path='/playground/pixis' component={Pixis}/>
        <Route exact path='/playground/graphs/attributes' component={Attributes}/>
        <Route exact path='/playground/graphs/windvelocity' component={WindVelocityGraph}/>
        <Route exact path='/playground/graphs/population' component={CrimesGraph}/>
        <Route exact path='/playground/games/mastermind' component={Mastermind}/>
        <Route exact path='/playground/games/game-of-life' component={GameOfLife}/>
        <Route exact path='/playground/games/memory' component={Memory}/>
        <Route exact path='/playground/games/2048' component={G2048}/>
        <Route exact path='/playground/random/coloring-book' component={ColoringBook}/>
        <Route exact path='/playground/news-feed' component={NewsFeed}/>
        <Route exact path='/playground/qa' component={QA}/>
        <Route path='/playground/cv' component={Cv}/>
      </Switch>)
  }
}

module.exports = Content
