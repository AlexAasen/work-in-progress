const { map, each } = require('underscore')
const { colors } = require('constants/mastermind.js')

function generateCode(pegsPerRow){
  let code = new Array(pegsPerRow).fill(null)

  return map(code, () => {
    const randomIdx = Math.floor(Math.random() * Math.floor(colors.length))
    return colors[randomIdx]
  })
}

function evaluateCode(code, row, pegsPerRow){
  let evaluation = new Array(pegsPerRow).fill(null)
  let pegMemory = {}
  let correctGuesses = 0

  each(row, (color, idx) => {
    if(code[idx] === color){
      pegMemory[color] = pegMemory[color] ? pegMemory[color] + 1 : 1
      correctGuesses = correctGuesses + 1
      evaluation[idx] = "white"
    }
  })
  each(row, (color, idx) => {
    if(evaluation[idx] !== "white"){
      if(code.indexOf(color) !== -1){
        let numberOfInstances = 0

        each(code, hiddenColor => {
          if(color === hiddenColor){
            numberOfInstances = numberOfInstances + 1
          }
        })
        //How many have we registered?
        if(pegMemory[color] && (pegMemory[color] < numberOfInstances)){
          pegMemory[color] = pegMemory[color] + 1
          evaluation[idx] = "black"
        }
        else if(!pegMemory[color]){
          pegMemory[color] = 1
          evaluation[idx] = "black"
        }
      }
    }
  })

  return { evaluation, correctGuesses }
}


module.exports = {
  generateCode,
  evaluateCode
}
