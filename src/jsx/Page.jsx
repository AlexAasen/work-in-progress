const React = require('react')

const Menu = require("./Menu.jsx")
const Content = require('./Content.jsx')

class Page extends React.Component {
  render(){
    const activePage = location.pathname

    return(
      <div id="page-holder" className={"page " + (activePage === "/about" ? "about" : "")}>
        <Menu />
        <Content />
      </div>)
  }
}

module.exports = Page
