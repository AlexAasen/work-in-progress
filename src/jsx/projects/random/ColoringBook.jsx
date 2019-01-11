const React = require('react')
const d3 = require('d3')

const { flatten, bindAll } = require('underscore')

const ColorSelector = require('./ColorSelector.jsx')

require('js/polyfill/getPathData')

class ColoringBook extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selected: "black",
      innerHtml: null,
      prevColorInfo: []
    }

    this.availableSvgs = [
      "http://thecraftchop.com/files/others/foxhead2.svg",
      "koi-fish-line-art-vector_23-2147494664",
      "src/img/2005-Mandala.svg"
    ]

    bindAll(this, "updateSelected")
  }

  componentDidMount(){
    const callback = response => {
      this.setState({ innerHtml: response })
    }

    this.fetchSvg(callback)
  }

  fetchSvg(callback){
    var request = new XMLHttpRequest()

    request.open("GET", this.availableSvgs[2])
    request.setRequestHeader("Content-Type", "image/svg+xml")

    request.addEventListener("load", function(event) {
      var response = event.target.responseText
      var doc = new DOMParser()
      var xml = doc.parseFromString(response, "image/svg+xml")

      callback( xml.documentElement.outerHTML)
    })

    request.send()
  }

  componentDidUpdate(){
    this.renderSvg()
  }

  updateSelected(color){
    this.setState({ selected: color })
  }

  renderSvg(){
    const { selected } = this.state

    const paths = flatten(document.getElementById("original").querySelectorAll('path'))
    const head = paths[0]
    //const tail = paths.filter((x, idx) => idx !== 0)

    const values = flatten(head.getPathData().map(x => x.values))
    const max = d3.max(values)
    const min = d3.min(values)
    console.log("min", min)

    const pathsDatas = head.getPathData({ normalize: true }).reduce((acc, seg) => {
      let pathData = seg.type === 'M' ? [] : acc.pop()
      seg.values = seg.values.map(v => Math.round(v * 1000) / 1000)
      pathData.push(seg)
      acc.push(pathData)
      return acc
    }, [])

    const result = d3.select(this.refs.svg_result)
        .attr("viewBox", "0 0 " + max + " " + max)

    const selection = result.selectAll("path")
        .data(pathsDatas)

    const created = selection.enter()
        .append("path")
        .attr("d", d => {
          const translate = x => x.type + " " + x.values.join(" ")
          return d.map(translate).join(" ")
        })
        .attr("fill", "white")
        .style("stroke", "black")

    selection.merge(created)
        .attr("d", d => {
          const translate = x => x.type + " " + x.values.join(" ")
          return d.map(translate).join(" ")
        })
        .on("click", function() {
          if(selected){
            d3.select(this).attr("fill", selected)
          }
        })

    selection.exit().remove()
  }

  createMarkup() {
    return { __html: this.state.innerHtml }
  }

  render(){
    const { selected } = this.state

    return(
      <div className="coloring-book-container">
        <ColorSelector selected={selected} updateSelected={this.updateSelected}/>
        <div className="color-area">
          <div id="original" dangerouslySetInnerHTML={this.createMarkup()}></div>
          <p>Broken</p>
          <svg ref="svg_result" id="svg_result" xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
      </div>
    )
  }
}

module.exports = ColoringBook
