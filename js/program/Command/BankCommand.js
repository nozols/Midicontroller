import Command from './Command.js';

export default class BankCommand extends Command{
  constructor(upOrDown){
    super('bank');
    this.upOrDown = upOrDown;
  }

  getCommand(){
    return this.getCommandChar() + (this.upOrDown == 'up' ? 1 : 0);
  }
}
