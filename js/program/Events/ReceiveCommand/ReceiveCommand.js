export default class ReceiveCommand{
  constructor(type, data){
    this.type = type;
    this.data = data;
    this.bytes = data.bytes;
    this.chars = data.chars;
    this.string = data.string;
  }

  /**
   * getString - get a string from the data
   *
   * @param  {int} start  start byte
   * @param  {int} length the amount of chars to read
   * @return {string}
   */
  getString(start, length){
    return this.string.substring(start, length).trim();
  }

  /**
   * getBytes - get a byte array from the data
   *
   * @param  {int} start  start byte
   * @param  {int} length the amount of bytes to read
   * @return {array}
   */
  getBytes(start, length){
    return this.bytes.slice(start, start + length);
  }

  /**
   * getByte - description
   *
   * @param  {type} key description
   * @return {type}     description
   */
  getByte(key){
    return this.bytes[key];
  }

  /**
   * getChar - description  
   *
   * @param  {type} key description
   * @return {type}     description
   */
  getChar(key){
    return this.chars[key];
  }
}
