const React = require('react')
const ReactDOM = require('react-dom')
const { readExcel } = require('js/readExcel.js')

class ExportGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      exceldata: []
    }
    this.handleFile = this.handleFile.bind(this)
  }

  handleClick(){
    document.getElementById("file-upload-input").click()
  }

  handleFile(e){
    //Start of by finding out what type of file it is?
    const callback = (result) => {
      this.setState({ exceldata: result })
    }
    const data = readExcel(e.target.files[0], callback.bind(this))
  }

  render(){
    console.log(this.state.exceldata)
    return(
      <div className="export-graph-container">
        <input className="input file-uploader"
          type="file"
          id="file-upload-input"
          onChange={this.handleFile}/>
        <button className="button file-uploader"
          onClick={this.handleClick.bind(this)}>Välj en fil</button>
      </div>)
  }
}

module.exports = ExportGraph
