const React = require('react')
const { map } = require('underscore')
const { menu } = require('constants/menu.js')

class Menu extends React.Component {
  changePage(id){
    if(id !== this.props.activePage){
      var element = document.getElementById("main-nav-menu")
      element.setAttribute("class", "menu")
      this.props.changeActivePage(id)
    }
  }

  getMenuItems(){
    return map(menu, (item, idx) => {
      return (
        <li key={idx}
          className={"menu-item " + (item.id === this.props.activePage ? "active" : "")}
          onClick={this.changePage.bind(this, item.id)}>
          {item.name}
          <span className="line"></span>
        </li>)
    })
  }

  render(){
    return(
      <ul className="menu" id="main-nav-menu">
        {this.getMenuItems()}
      </ul>
    )
  }
}

module.exports = Menu
