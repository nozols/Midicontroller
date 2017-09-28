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
      'sendwords': 18
    };

    this.startCommandChar = String.fromCharCode(2);
    this.endCommandChar = String.fromCharCode(3);

    if(!(command in this.commandBytes)){
      throw new Error("Registered an invalid command!! " + command);
    }
  }

  fromCommandLine(string){

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
   * getCommand - get the command
   *
   * @return {string}  command to send
   */
  getCommand(){
    return this.getCommandChar();
  }

  /**
   * getSendString - get the final string which is send to the board
   *
   * @return {string}  the commandstring
   */
  getSendString(){
    return this.startCommandChar + this.getCommand() + this.endCommandChar;
  }
}
