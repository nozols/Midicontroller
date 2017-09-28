import Event from './Event.js';
import Util from './../Util/Util.js';

export default class ReceiveCommandEvent extends Event{
  constructor(commandType, data){
    super('command-receive-' + commandType);
    this.data = data;
    this.command = (new Util()).getCommandClass(data);
  }
}
