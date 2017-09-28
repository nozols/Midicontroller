import SendBanksReceiveCommand from './../Events/ReceiveCommand/SendBanksReceiveCommand.js';
import SendWordsReceiveCommand from './../Events/ReceiveCommand/SendWordsReceiveCommand.js';

export default class Util{
  constructor(){
    this.commandBytes = {
      'identify': 4,
      'bank': 10,
      'patch': 11,
      'tune': 12,
      'storeword': 13,
      'storebank': 14,
      'setbank': 15,
      'sendbanks': 16,
      'senddata': 17,
      'sendwords': 18
    };
    this.midiCommandText = {
      'note-off': 8,
      'note-on': 9,
      'aftertouch': 10,
      'control-change': 11,
      'program-change': 12,
      'channel-pressure': 13,
      'pitch-bend': 14,
      'system': 15
    };
    this.commandWords = this.flipArray(this.commandBytes);
    this.midiCommandBytes = this.flipArray(this.midiCommandText);
  }

  /**
   * flipArray - filp an array (key becomes value, value becomes key)
   *
   * @param  {array} array old array
   * @return {array}       new array
   */
  flipArray(array){
    var newArray = {};
    for(var index in array){
      newArray[array[index]] = index;
    }

    return newArray;
  }

  /**
   * getCommandClass - get the command handler based on the data received
   *
   * @param  {type} data description
   * @return {type}      description
   */
  getCommandClass(data){
    switch(this.commandWords[data.bytes[0]]){
      case 'sendbanks':
        return new SendBanksReceiveCommand(data);
      case 'sendwords':
        return new SendWordsReceiveCommand(data);
      default:
        return null;
    }
  }

  /**
   * parser - parser used for serial data in
   *
   * @return {function}  the parser
   */
  parser(){
    var cBuf = [];
    var cBufChar = [];
    var cBufStr = '';
    return function(emitter, buffer){
      for(var i = 0; i < buffer.length; i++){
        if(buffer[i] == 62){
          // check if last byte was 60
          if(cBuf[cBuf.length - 1] == 60){
            cBuf.pop(); // pop to remove to 60 from the byte array
            emitter.emit('data', {
              bytes: cBuf,
              chars: cBufChar,
              string: cBufStr
            });
            cBuf = [];
            cBufChar = [];
            cBufStr = '';
          }
        }else{
          cBuf.push(buffer[i]);
          if(buffer[i] !== 60){
            cBufChar.push(String.fromCharCode(buffer[i]));
            cBufStr += String.fromCharCode(buffer[i]);
          }
        }
      }
    };
  }

}
