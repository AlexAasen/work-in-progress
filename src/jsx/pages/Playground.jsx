const React = require('react')
const { map } = require('underscore')
const { grid1 } = require('constants/projects')
const Footer = require('common/Footer.jsx')

class Playground extends React.Component {
  getEntries(grid){
    return map(grid, (project, idx) => {
      const gridStyleClass = "grid-" + idx
      return(
        <div key={idx} className={"project " + gridStyleClass} onClick={project.callback.bind(this, this.props.changeActivePage)}>
          <img className="project-image" src={project.src}></img>
          <div className="dim-filter"></div>
          <div className="project-information">
            <div className="title-background"></div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
        </div>)
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
        <Footer changeActivePage={this.props.changeActivePage.bind(this)}/>
      </div>)
  }
}

module.exports = Playground
