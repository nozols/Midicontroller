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

    this.startByte = 60;
    this.endByte = 62;

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
  getCommandByte(){
    return this.commandBytes[this.command];
  }

  /**
   * getCommand - get the command
   *
   * @return {Array}  command to send
   */
  getCommand(){
    return [this.getCommandByte()];
  }

  /**
   * stringToByteArray - convert a string to a bytearray
   *
   * @param  {string} str the string
   * @return {array}     the byte array   
   */
  stringToByteArray(str){
    var result = [];

    for(var i = 0; i < str.length; i++){
      result.push(str.charCodeAt(i));
    }

    return result;
  }

  /**
   * stringToChar - make a string 16 characters long, fill empty spots with whitespaces
   *
   * @param  {string} string
   * @return {string}        new string
   */
  stringToChar(string){
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
    console.error("Deprecated call!");
    return this.getCommand() + this.startCommandChar + this.endCommandChar;
  }

  getSendBytes(){
    return this.getCommand().concat([this.startByte, this.endByte]);
  }
}
