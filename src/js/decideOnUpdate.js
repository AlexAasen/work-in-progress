function withinTreshold(first, second){
  if(!first || !second) return false
  const threshold = 5
  const diff = Math.abs(first - second)
  return diff <= threshold
}

module.exports = function(container, lastWidth){
  const hasContainer = !!container
  const sameWidth = withinTreshold(container.offsetWidth, lastWidth)

  if(!hasContainer) return false

  return (!sameWidth)
}
