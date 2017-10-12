import ReceiveCommand from './ReceiveCommand';

export default class SendBanksReceiveCommand extends ReceiveCommand{
  constructor(data){
    super('sendbanks', data);
    this.name = this.getString(1, 16).replace(/([^a-z0-9A-Z\s]+)/g, '');
    this.bank = this.getByte(42);
    this.midi = [];
    this.bpms = [];
    this.names = [];

    for(var i = 0; i < 5; i++){
      this.midi.push(this.getBytes(17 + i * 3, 3));
      this.bpms.push(this.getByte(32 + i));
      this.names.push(this.getByte(37 + i));
    }
  }
}
