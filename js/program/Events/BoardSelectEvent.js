import Event from './Event.js';

export default class BoardSelectEvent extends Event{
  constructor(element){
    super('board-select');
    this.element = element;
  }
}
