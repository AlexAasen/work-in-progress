var _ = require('underscore');

var EventBus = {
  events: [],
  blockingMouseOver: true,
  activeColor: null,
  addListener(id, event){
    this.events.push({ id: id, event: event })
  },

  handleMouseUp(){
    this.blockingMouseOver = true
  },

  handleMouseOver(id){
    if(this.blockingMouseOver) return
    _.each(this.events, (event) =>{
      if(event.id === id){
        event.event(this.activeColor)
      }
    })
  },

  handleMouseDown(id){
    this.blockingMouseOver = false
    _.each(this.events, (event) =>{
      if(event.id === id){
        event.event(this.activeColor)
      }
    })
  },

  setColor(color){
    this.activeColor = color
  }
}

module.exports = EventBus

/*
Vi vill att ett klick i en ruta ska leda till att färgen byts,
samtidigt som en mousedown stoppar blocking i alla rutor, och mouseUp
lägger in en block igen. men endast mousedown i hela rutnätet stoppar blocking.
All typ av mouseup lägger på blocking igen.
*/
