import ReceiveCommand from './ReceiveCommand';

export default class SendBanksReceiveCommand extends ReceiveCommand{
  constructor(data){
    super('sendbanks', data);
    this.name = this.getString(1, 16).replace(/([^a-z0-9A-Z\s]+)/g, '');
    this.bank = this.getByte(42);
    this.midi = [];
    this.bpms = [];
    this.names = [];
    this.midiAll = [];

    for(var i = 0; i < 5; i++){
      this.midiAll = this.midiAll.concat(this.getBytes(17 + i * 3, 3));
      this.midi.push(this.getBytes(17 + i * 3, 3));
      this.bpms.push(this.getByte(32 + i));
      this.names.push(this.getByte(37 + i));
    }
  }

  displayCommandline(){
    return this.type + ' ' + this.name + ' ' + this.midiAll.join(' ') + ' ' + this.bpms.join(' ') + ' ' + this.names.join(' ');
  }
}
