import Event from './Event.js';

export default class BoardFoundEvent extends Event{
  constructor(boardName, comName){
    super('board-found');
    this.boardName = boardName;
    this.comName = comName;
  }
}
