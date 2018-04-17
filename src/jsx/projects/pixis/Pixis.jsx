var React = require('react');
var ReactDOM = require('react-dom');
var HeaderComponent = require('./HeaderComponent.jsx');
var PixisBoardComponent = require('./PixisBoardComponent.jsx');
var ColorNavComponent = require('./ColorNavComponent.jsx');
var EventBus = require('./EventBus.js');

class Pixis extends React.Component {
  setActiveColor(color){
    EventBus.setColor(color);
  }

  handleMouseUp(){
    EventBus.handleMouseUp();
  }

  render () {
    return(
      <div className="pixis" onMouseUp={this.handleMouseUp.bind(this)}>
        <HeaderComponent />
        <div className="content-container">
          <ColorNavComponent setActiveColor={this.setActiveColor.bind(this)} />
          <PixisBoardComponent />
        </div>
      </div>
    );
  }
}

module.exports = Pixis
