import ReceiveCommand from './ReceiveCommand.js';

export default class SendWordsReceiveCommand extends ReceiveCommand{
  constructor(data){
    super('sendwords', data);
    this.id = this.getByte(1);
    this.word = this.getString(2, data.length);
  }

  displayCommandline(){
    return this.type + ' ' + this.id + ' ' + this.word;
  }
}
