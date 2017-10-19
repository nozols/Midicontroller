/**
 * Handles all the events that have nothing to do with the dom
 */
export default class EventManager{
  constructor(){
    this.events = [];
  }

  /**
   * triggerEvent - trigger an event
   *
   * @param  {Event} event      the event
   */
  triggerEvent(event){
    for(var i = 0; i < this.events.length; i++){
      if(this.events[i].event == event.type){
        this.events[i].callback(event);
      }
    }
  }

  /**
   * addEventListener - add an event listener
   *
   * @param  {string} event    the event name
   * @param  {function} callback the event callback
   * @param  {string} id       the event id, used for removing event listeners
   */
  addEventListener(event, callback, id){
    this.events.push({
      event: event,
      callback: callback,
      id: id
    });
  }

  /**
   * removeEventListener - remove an event listener
   *
   * @param  {string} id the event id which to remove
   */
  removeEventListener(id){
    if(id){
      for(var i = 0; i < this.events.length; i++){
        if(this.events[i].id == id){
          this.events.splice(i, 1);
        }
      }
    }
  }
}
