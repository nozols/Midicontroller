export default class Command{
  constructor(command){
    this.command = command;
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
      'sendwords': 18,
      'ready': 19
    };

    this.startCommandChar = String.fromCharCode(60);
    this.endCommandChar = String.fromCharCode(62);

    if(!(command in this.commandBytes)){
      throw new Error("Registered an invalid command!! " + command);
    }
  }

  /**
   * fromCommandLine - converts a string entered in the commandline to a valid and sendable command
   *
   * @param  {String} string The string the user entered
   * @return {type}        description
   */
  fromCommandLine(string){
    // Not yet implemented
  }

  /**
   * wordMatch - description
   *
   * @param  {type} word description
   * @return {type}      description
   */
  wordMatch(word){
    return word === this.command;
  }

  /**
   * getCommandChar - get the charcode for this specific command
   *
   * @return {char}  char for code
   */
  getCommandChar(){
    return String.fromCharCode(this.commandBytes[this.command]);
  }

  /**
   * getCommand - get the command character
   *
   * @return {string}  command to send
   */
  getCommand(){
    return this.getCommandChar();
  }

  byteArrayToString(arr){
    var result = '';

    for(var i = 0; i < arr.length; i++){
      result += String.fromCharCode(arr[i]);
    }

    return result;
  }

  stringToLength(string){
    var result = string;
    for(var i = 0; i < 16 - string.length; i++){
      result += ' ';
    }

    return result;
  }

  /**
   * getSendString - get the final string which is send to the board
   *
   * @return {string}  the commandstring
   */
  getSendString(){
    return this.getCommand() + this.startCommandChar + this.endCommandChar;
  }
}
