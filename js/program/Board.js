import SerialPort from 'serialport';
import Command from './Command/Command.js';
import Event from './Events/Event.js';
import ReceiveCommandEvent from './Events/ReceiveCommandEvent.js';
import ShowPopupEvent from './Events/ShowPopupEvent.js';
import Util from './Util/Util.js';

export default class Board{
  constructor(main, comname){
    var self = this;
    this.main = main;
    this.comname = comname;
    this.connection = null;
    this.hasInitialized = false;
    this.ready = false;
    this.boardName = null;
    this.serialParser = this.main.util.parser;
    this.commandBuffer = [];
    this.commandBufferChar = [];
    this.commandBufferStr = '';
    this.isExpectedDisconnect = true;

    this.main.eventManager.addEventListener('send-command', function(event){
      self.sendCommand(event.command);
    }, 'BOARD-SEND-COMMAND');
  }

  /**
   * connect - connect to the board
   */
  connect(){
    var self = this;
    this.connection = new SerialPort(this.comname, {
      baudrate: 9600,
    //  parser: SerialPort.parsers.byteLength(1)
      parser: this.serialParser()
      //parser: SerialPort.parsers.raw
    });
    this.connection.on('data', function(data){
      self.incoming(data);
    });
    this.connection.on('close', function(data){
      self.postDisconnect(self.isExpectedDisconnect);
    });
  }

  /**
   * incoming - called when a new command is received, triggers the receiveCommandEvent
   *
   * @param  {object} data data received
   */
  incoming(data){
    if(!this.hasInitialized){
      this.hasInitialized = true;
      this.sendCommand(new Command('identify'));
    }else if(!this.ready){
      if(data.string.indexOf('MidiController') == 0){
        this.boardName = data.string.replace('MidiController ', '');
        this.ready = true;
        this.main.eventManager.triggerEvent(new Event('board-ready'));
      }
    }else{
      this.main.eventManager.triggerEvent(new ReceiveCommandEvent(this.main.util.commandWords[data.bytes[0]], data));
    }
  }


  /**
   * sendCommand - send a command to the board
   *
   * @param  {Command} command the command to send
   */
  sendCommand(command){
    console.log('Outgoing: ', command.command);
    this.connection.write(command.getSendString());
  }

  /**
   * disconnect - disconnect from the board
   */
  disconnect(){
    this.isExpectedDisconnect = true;
    this.connection.close();
  }

  /**
   * postDisconnect - called by the close event on port
   *
   * @param  {boolean} expected was it an expected disconnect?   
   */
  postDisconnect(expected){
    this.main.eventManager.removeEventListener('BOARD-SEND-COMMAND');
    this.main.eventManager.triggerEvent(new Event('board-disconnect'));
    if(!expected){
      self.main.eventManager.triggerEvent(new ShowPopupEvent('warning', 'Board unexpectedly disconnected!'));
    }
  }
}
