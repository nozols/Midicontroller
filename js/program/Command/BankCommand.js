import Command from './Command.js';

export default class BankCommand extends Command{
  constructor(upOrDown){
    super('bank');
    this.upOrDown = upOrDown;
  }

  getCommand(){
    return [
      this.getCommandByte(),
      this.upOrDown == 'up' ? 1 : 0
    ];
  }

  displayCommandline(){
    return this.command + ' ' + this.upOrDown;
  }
}
