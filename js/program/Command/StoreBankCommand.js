import Command from './Command.js';

export default class StoreBankCommand extends Command{
  constructor(index, name, midis, bpms, words){
    super('storebank');
    this.index = index;
    this.name = this.stringToChar(name);
    this.bpms = bpms;
    this.words = words;
    this.midis = midis;
    this.midiBytes = [];
    for(var i = 0; i < this.midis.length; i++){
      this.midiBytes = this.midiBytes.concat(this.midis[i]);
    }
  }

  getCommand(){
    return [
      this.getCommandByte(),
      this.index
    ].concat(this.stringToByteArray(this.name))
    .concat(this.midiBytes)
    .concat(this.bpms)
    .concat(this.words);
  }
}
