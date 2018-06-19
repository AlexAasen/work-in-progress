const React = require('react')
const { Link } = require('react-router-dom')
const { map } = require('underscore')

const { menu } = require('constants/menu.js')

class Menu extends React.Component {
  getMenuItems(){
    return map(menu, (item, idx) => {
      return (
        <Link to={item.id}
          key={idx}
          className={"menu-item " + (item.id === this.props.activePage ? "active" : "")}>
          {item.name}
          <span className="line"></span>
        </Link>)
    })
  }

  render(){
    return(
      <ul className="menu" id="main-nav-menu">
        {this.getMenuItems()}
        <span className="header-message">Under construction, feel free to browse&nbsp;&nbsp;<span>❤</span></span>
      </ul>)
  }
}

module.exports = Menu
