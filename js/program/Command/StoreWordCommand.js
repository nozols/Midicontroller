import Command from './Command.js';

export default class StoreWordCommand extends Command{
  constructor(index, value){
    super('storeword');
    this.index = index;
    this.value = value;
  }

  getCommand(){
    return this.getCommandChar() + String.fromCharCode(this.index) + this.value;
  }
}
