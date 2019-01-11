const { range } = require('underscore')
const { diff } = require('deep-diff')
const clone = require('clone')
const { getRandom } = require('js/utils')

const randomNumber = [2, 4]

const mergeEntries = (board, old, next) => {
  board[old.idx] = { ...old, value: old.value * 2, merged: true, prevIdx: next.idx }
  board[next.idx].value = null

  return board
}

const calcScore = (score, board) => {
  return board.reduce((acc, curr) => {
    return acc + (curr.merged ? curr.value : 0)
  }, score)
}

const setupBoard = () => {
  let board = range(16).map((x, idx) => {
    const row = Math.floor(idx / 4)
    const column = idx % 4

    return { x: column, y: row, idx, value: null }
  })

  const pos1 = getRandom(0, board.length - 1)
  let pos2 = getRandom(0, board.length - 1)

  while(!diff(pos1, pos2)){
    pos2 = getRandom(0, board.length - 1)
  }

  board[pos1].value = randomNumber[getRandom(0, 1)]
  board[pos2].value = randomNumber[getRandom(0, 1)]

  return board
}

const calcNewPositions = (board, direction) => {
  let newBoard = cleanBoard(clone(board))
  let next, prev, curr, currIdx

  for(var i = 0; i < newBoard.length; i++){
    switch(direction){
        case "left":
          curr = newBoard[i]
          prev = (newBoard[i-1]?.y === curr.y) && newBoard[i-1]
          next = newBoard.filter(entry => (entry.y === curr.y) && entry.idx > i).find(entry => !!entry.value)
          break

        case "right":
          currIdx = newBoard.length - 1 - i
          curr = newBoard[currIdx]
          prev = (newBoard[currIdx+1]?.y === curr.y) && newBoard[currIdx+1]
          next = newBoard.filter(entry => (entry.y === curr.y) && entry.idx < currIdx).reverse().find(entry => !!entry.value)
          break

        case "up":
          curr = newBoard[i]
          prev = (newBoard[i-4]?.x === curr.x) && newBoard[i-4]
          next = newBoard.filter(entry => (entry.x === curr.x) && entry.idx > i).find(entry => !!entry.value)
          break

        case "down":
          currIdx = newBoard.length - 1 - i
          curr = newBoard[currIdx]
          prev = (newBoard[currIdx+4]?.x === curr.x) && newBoard[currIdx+4]
          next = newBoard.filter(entry => (entry.x === curr.x) && entry.idx < currIdx).reverse().find(entry => !!entry.value)
          break
    }

    if(curr.value && prev && (curr.value === prev.value) && !prev.merged){
      newBoard = mergeEntries(newBoard, prev, curr)
    }
    else if(curr.value && next){
      if(next.value === curr.value){
        newBoard = mergeEntries(newBoard, curr, next)
      }
    }
    else if(next){
      if(prev && (next.value === prev.value) && !prev.merged){
        newBoard = mergeEntries(newBoard, prev, next)
      }
      else{ //move next into curr
        newBoard[curr.idx] = { ...curr, value: next.value, prevIdx: next.idx }
        newBoard[next.idx].value = null
      }
    }
  }
  return newBoard
}

const cleanBoard = board => board.map(x => {
  if(x.hasOwnProperty('merged')) delete x.merged
  if(x.hasOwnProperty('new')) delete x.new
  if(x.hasOwnProperty('prevIdx')) delete x.prevIdx
  return x
})

const assignNewRandom = board => {
  const selectable = board.filter(x => !x.value)
  if(selectable.length === 0) return board

  const selected = selectable[getRandom(0, selectable.length - 1)]
  const value = randomNumber[getRandom(0, 1)]

  let newBoard = clone(board)
  newBoard[selected.idx] = { ...newBoard[selected.idx], value, new: true }

  return newBoard
}

const getSteps = (direction, entry) => {
  let steps = ''
  const entryExists = entry => (entry.prevIdx === 0) || entry.prevIdx

  switch(direction){
      case 'left':
        if(entryExists(entry) && (entry.idx < entry.prevIdx)){
          steps = 'steps-' + (entry.prevIdx - entry.idx)
        }
        break
      case 'up':
        if(entryExists(entry) && (entry.idx < entry.prevIdx)){
          steps = 'steps-' + (Math.floor((entry.prevIdx - entry.idx) / 4))
        }
        break
      case 'right':
        if(entryExists(entry) && (entry.idx > entry.prevIdx)){
          steps = 'steps-' + (entry.idx - entry.prevIdx)
        }
        break
      case 'down':
        if(entryExists(entry) && (entry.idx > entry.prevIdx)){
          steps = 'steps-' + (Math.floor((entry.idx - entry.prevIdx) / 4))
        }
        break
  }
  return steps
}

const checkForGameOver = board => {
  const boardIsntFull = board.find(x => !x.value)
  if(boardIsntFull) return false

  const possibleMoves = board.filter(x => {
    const horizontal = board.filter(y => y.y === x.y)

    const n = board[x.idx - 4]?.value === x.value
    const e = horizontal.find(y => y.idx === (x.idx + 1))?.value === x.value
    const s = board[x.idx + 4]?.value === x.value
    const w = horizontal.find(y => y.idx === (x.idx - 1))?.value === x.value

    return n || e || s || w
  })

  return !possibleMoves.find(x => !!x)
}

module.exports = {
  setupBoard,
  calcScore,
  calcNewPositions,
  assignNewRandom,
  getSteps,
  checkForGameOver
}
