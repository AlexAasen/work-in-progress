function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function mathRadians(degrees) {
  return degrees * Math.PI / 180
}

function getColor(windVelocity){
  if(windVelocity > 0 && windVelocity <= 1){
    return "red"
  }
  else if(windVelocity > 1 && windVelocity <= 2){
    return "orange"
  }
  else if(windVelocity > 2 && windVelocity <= 3){
    return "yellow"
  }
  else if(windVelocity > 3 && windVelocity <= 4){
    return "lightgreen"
  }
  else if(windVelocity > 4 && windVelocity <= 5){
    return "green"
  }
  else if(windVelocity > 5){
    return 'blue'
  }
}

module.exports = {
  mathRadians,
  getRandom,
  getColor
}
