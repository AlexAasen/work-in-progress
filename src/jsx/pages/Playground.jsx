const React = require('react')
const { Link } = require('react-router-dom')
const { map } = require('underscore')

const { grid1 } = require('constants/projects')

const Footer = require('common/Footer.jsx')

class Playground extends React.Component {
  getEntries(grid){
    return map(grid, (project, idx) => {
      const gridStyleClass = "grid-" + idx
      return(
        <Link to={project.link}
          key={idx}
          className={"project " + gridStyleClass}>
          <img className="project-image" src={project.src}></img>
          <div className="dim-filter"></div>
          <div className="project-information">
            <div className="title-background"></div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
        </Link>)
    })
  }

  render(){
    return(
      <div className="playground-page">
        <div className="spacer">
          <div className="grid-container grid-1">
            {this.getEntries(grid1)}
          </div>
        </div>
        <Footer />
      </div>)
  }
}

module.exports = Playground
