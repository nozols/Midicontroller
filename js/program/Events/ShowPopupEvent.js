import Event from './Event.js';

export default class ShowPopupEvent extends Event{
  constructor(type, message){
    super('show-popup');
    this.messageType = type;
    this.message = message;
  }
}
