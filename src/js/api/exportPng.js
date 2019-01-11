const FileSaver = require('file-saver')
const { isEdgeOrIE11 } = require('js/utils')

function handlePng(canvas, fileName) {
  if (isEdgeOrIE11) {
    FileSaver.saveAs(canvas.msToBlob(), fileName + ".png")
  }
  else {
    canvas.toBlob(function(blob){
      var newCanvas = document.createElement('canvas')

      var ctx = newCanvas.getContext('2d')
      ctx.webkitImageSmoothingEnabled = false

      var img = new Image()
      img.onload = function(){

        newCanvas.width = img.width / 2
        newCanvas.height = img.height / 2
        ctx.scale(0.5, 0.5)
        ctx.drawImage(img, 0, 0)

        newCanvas.toBlob(function(newBob){
          FileSaver.saveAs(newBob, fileName + ".png")
        })
      }
      img.src = URL.createObjectURL(blob)
    })
  }
}

module.exports = {
  handlePng
}
