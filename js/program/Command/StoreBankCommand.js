import Command from './Command.js';

export default class StoreBankCommand extends Command{
  constructor(index, name, midis, bpms, words){
    super('storebank');
    this.index = index;
    this.name = this.stringToChar(name);
    this.bpms = bpms;
    this.words = words;
    this.midis = midis;
    this.midiString = [];
    for(var i = 0; i < this.midis.length; i++){
      this.midiString.push(this.byteArrayToString(this.midis[i]));
    }
    this.midiString = this.midiString.join('');
    //console.log(this.getCommand(), this.getCommand().length);
    var temp = [];
    var t2 = this.getCommand();
    for(var i = 0 ; i < t2.length; i++){
      temp.push(t2.charCodeAt(i));
    }
    console.log(temp);
  }

  getCommand(){
    return this.getCommandChar() + String.fromCharCode(this.index) + this.name + this.midiString + this.byteArrayToString(this.bpms) + this.byteArrayToString(this.words);
  }
}
