import Event from './Event.js';

export default class SendCommandEvent extends Event{
  constructor(command){
    super('send-command');
    this.command = command;
  }
}
