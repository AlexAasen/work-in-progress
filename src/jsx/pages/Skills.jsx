const React = require('react')
const { map } = require('underscore')
const { specializedSkills } = require('constants/skills.js')
const ForceGraph = require('graphs/ForceGraph.jsx')
const Footer = require('common/Footer.jsx')

class Skills extends React.Component {
  componentDidMount(){
    document.getElementById("attributes-page").addEventListener("scroll", this.checkScrollTop.bind(this));
  }

  checkScrollTop(){
    if(document.getElementById("attributes-page").scrollTop > 0){
      const element = document.getElementById("page-holder")
      element.classList.add("attributes")
    }
    else{
      const element = document.getElementById("page-holder")
      element.classList.remove("attributes")
    }
  }

  componentWillUnmount(){
    document.getElementById("attributes-page").removeEventListener("scroll", this.checkScrollTop.bind(this))
    const element = document.getElementById("page-holder")
    element.classList.remove("attributes")
  }


  getIcons(iconList){
    return map(iconList, (icon, idx) => {
      return (
        <span key={idx} className={icon}></span>
      )
    })
  }

  getSpecializedSkills(){
    return map(specializedSkills, (skill, idx) => {
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
        <h3>Specialization</h3>
        <ul className="specialized-skills">
          {this.getSpecializedSkills()}
        </ul>
        <ForceGraph />
        <Footer />
      </div>)
  }
}

module.exports = Skills
