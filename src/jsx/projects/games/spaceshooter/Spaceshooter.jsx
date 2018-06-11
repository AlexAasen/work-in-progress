const React = require('react')

class Spaceshooter extends React.Component {
  componentDidMount(){
    this.initGame()
  }

  initGame(){
    let app = new PIXI.Application()
    document.getElementById('shooter').appendChild(app.view)

    let starfield = new PIXI.TilingSprite.fromImage('https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/starfield.png')
    starfield.width = 800
    starfield.height = 600
    app.stage.addChild(starfield)

    let ship = PIXI.Sprite.fromImage('https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/player.png')
    //center anchor point
    ship.anchor.set(0.5)

    ship.x = app.screen.width / 2
    ship.y = app.screen.height / 2

    app.stage.addChild(ship)

    app.ticker.add(function(delta){
      starfield.tilePosition.x -= 0.5
      ship.rotation += 0.1 * delta
    })

  }


  render(){

    return(
      <div id='shooter'></div>
    )
  }
}

module.exports = Spaceshooter
