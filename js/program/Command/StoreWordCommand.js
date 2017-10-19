import Command from './Command.js';

export default class StoreWordCommand extends Command{
  constructor(index, value){
    super('storeword');
    this.index = index;
    this.value = value;
  }

  getCommand(){
    return [
      this.getCommandByte(),
      this.index,
    ].concat(this.stringToByteArray(this.value));
  }

  displayCommandline(){
    return this.command + ' ' + this.index + ' ' + this.value;
  }
}
