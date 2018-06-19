const React = require('react')
const { debounce, map } = require('underscore')
const Footer = require('common/Footer.jsx')
const { entries } = require('constants/hobbies.js')
const { reRenderDebounce } = require('constants/base.js')

class AboutMe extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      width: null
    }
    const boundRender = this.setWidth.bind(this, width => this.state.width = width)
    this.dbRender = debounce(boundRender, reRenderDebounce)
  }

  componentDidMount(){
    window.addEventListener("resize", this.dbRender)
    this.setWidth()
  }

  componentWillUnMount(){
    window.removeEventListener("resize", this.dbRender)
  }

  isUnmounted() {
    if (!document.getElementById("blog-content")) return true
    return false
  }

  setWidth(){
    if (this.isUnmounted()) return

    const element = document.getElementById("blog-content")
    this.setState({ width: element && element.offsetWidth })
  }

  getEntries(){
    const { width } = this.state

    return map(entries, (entry, idx) => {
      const { className, alt, description } = entry
      let marginTop = 10

      if((width > 983) && (width <= 1583)){
        if((idx !== 0) && (idx !== 1) && (idx % 2 !== 0)){
          marginTop = -40
        }
      }
      else if(width > 1583){
        marginTop = ((idx !== 0) && (idx !== 1) && (idx !== 2) &&
        ((idx - 4) % 3 === 0)) ? -40 :
        ((idx !== 0)  && (idx !== 2) && ((idx + 1) % 3 === 0) ? -90 : 10)
      }

      return(
        <div key={idx} className="instagram-media" style={{ marginTop: marginTop }}>
          <div className={"img " + className}></div>
          <div className="paragraph-link">
            {description}
          </div>
        </div>)
    })
  }

  render(){
    return(
      <div className="about-page" id="about-page">
        <h3>
          #Hobbies, #Loves, #Life
        </h3>
        <p className="about-intro">
          I live together with my boyfriend and our cat Zoey in Stockholm, Sweden. My spare time is spent painting and trying to be the very best at Heroes of the Storm while Zoey tries to eat my mouse cord.
          The main reason I got interested in the art of programming is that I love to bring ideas to life. I also enjoy solving the various problems that occur during the development process.
        </p>
        <div id="blog-content" ref="blog-content" className="blog-content-holder">
          {this.getEntries()}
        </div>
        <Footer />
      </div>
    )
  }
}

module.exports = AboutMe
