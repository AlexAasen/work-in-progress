const React = require('react')
const _ = require('underscore')
const { specializedSkills } = require('constants/skills.js')
const ForceGraph = require('graphs/ForceGraph.jsx')
const Footer = require('common/Footer.jsx')
const AttributesGraph = require('common/graphs/Attributes.jsx')

class Attributes extends React.Component {
  componentDidMount(){
    document.getElementById("attributes-page").addEventListener("scroll", this.checkScrollTop.bind(this));
  }

  checkScrollTop(){
    if(document.getElementById("attributes-page").scrollTop > 0){
      var element = document.getElementById("main-nav-menu")
      element.setAttribute("class", "menu attributes")
    }
    else{
      var element = document.getElementById("main-nav-menu")
      element.setAttribute("class", "menu")
    }
  }

  componentWillUnmount(){
    document.getElementById("attributes-page").removeEventListener("scroll", this.checkScrollTop.bind(this));
  }


  getIcons(iconList){
    return _.map(iconList, (icon, idx) => {
      return (
        <span key={idx} className={icon}></span>
      )
    })
  }

  getSpecializedSkills(){
    return _.map(specializedSkills, (skill, idx) => {
      return (
        <li key={idx} className="skill">
          <ul className="icons">
            {this.getIcons(skill.icons)}
          </ul>
          <h3>{skill.name}</h3>
          <div className="horizontal-line"></div>
          <p>{skill.description}</p>
        </li>
      )
    })
  }

  render(){
    return(
      <div className="attributes-page" id="attributes-page">
        <div className="info-block">
          <span className="icon-quotes-left icon"></span>
          <h2>You can only become truly accomplished at something you love. I love to bring ideas to life.</h2>
        </div>
        <AttributesGraph />
        <h3>Specialization</h3>
        <ul className="specialized-skills">
          {this.getSpecializedSkills()}
        </ul>
        <ForceGraph />
        <Footer changeActivePage={this.props.changeActivePage.bind(this)}/>
      </div>
    )
  }
}

module.exports = Attributes;
