import Command from './Command.js';

export default class SendBankCommand extends Command{
  constructor(bank){
    super('sendbank');
    this.bank = parseInt(bank);
  }

  getCommand(){
    return [
      this.getCommandByte(),
      this.bank
    ];
  }
}
