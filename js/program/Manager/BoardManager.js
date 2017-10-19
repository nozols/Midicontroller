import SerialPort from 'serialport';
import Event from './../Events/Event.js';
import ShowPopupEvent from './../Events/ShowPopupEvent.js';
import BoardFoundEvent from './../Events/BoardFoundEvent.js';
import BoardSelectEvent from './../Events/BoardSelectEvent.js';
import Html from './../Html/Html.js';
import TextNode from './../Html/TextNode.js';
import Board from './../Board.js';
import Command from './../Command/Command.js';
import Util from './../Util/Util.js';

/**
 * Handles board connecting, disconnecting and communication
 */
export default class BoardManager{
  constructor(main){
    var self = this;
    this.main = main;
    this.activeBoard = null;
    this.serialParser = this.main.util.parser;

    this.boardDropdown = new Html(document.getElementById('board-dropdown'));
    this.buttonDisconnect = new Html(document.getElementById('board-disconnect'));
    this.buttonRescanBoards = new Html(document.getElementById('board-rescan'));
    this.boardButtons = [];

    this.main.eventManager.addEventListener('board-found', function(c){
      self.boardFound(c);
    });

    this.main.eventManager.addEventListener('board-select', function(event){
      self.boardSelected(event.element.getData('board'));
    });

    this.buttonRescanBoards.onClick(function(){
      self.rescanBoards();
    });

    this.buttonDisconnect.onClick(function(){
      self.disconnectBoard();
    });
  }

  /**
   * isBoardActive - is there a currently active board
   *
   * @return {bool}
   */
  isBoardActive(){
    return this.activeBoard !== null;
  }

  /**
   * boardSelected - select board event
   *
   * @param  {string} board board comname
   */
  boardSelected(board){
    if(this.isBoardActive()){
      this.disconnectBoard();
    }
    this.activeBoard = new Board(this.main, board);
    this.activeBoard.connect();
  }

  /**
   * boardFound - triggered when a board is found, then adds them to the select dropdown
   *
   * @param  {Event} event the event
   */
  boardFound(event){
    var self = this;
    var li = (new Html('li')).setClass('board-option');
    var a = (new Html('a')).setData('board', event.comName).setTag('href', '#');
    var t = new TextNode(event.boardName);
    li.addChild(a);
    a.addChild(t);
    a.onClick(function(e){
      self.main.eventManager.triggerEvent(new BoardSelectEvent(new Html(e.target)));
    });
    this.boardButtons.push(li);
    this.boardDropdown.addChild(li);
  }

  /**
   * disconnectBoard - disconnect from the currently active board
   */
  disconnectBoard(){
    if(this.activeBoard !== null){
      this.activeBoard.disconnect();
      this.activeBoard = null;
    }
  }

  /**
   * rescanBoards - disconnect from the current board and scan for new ones
   */
  rescanBoards(){
    for(var i = 0; i < this.boardButtons.length; i++){
      this.boardButtons[i].remove();
    }
    this.boardButtons = [];
    this.disconnectBoard();

    this.scanBoards();
  }

  /**
   * scanBoards - scan the usb-ports for boards
   */
  scanBoards(){
    var self = this;
    self.main.eventManager.triggerEvent(new Event('scan-boards'));
    SerialPort.list(function(err, ports){
      if(err){
        self.main.eventManager.triggerEvent(new ShowPopupEvent('error', err));
        self.main.eventManager.triggerEvent(new Event('scan-boards-end'));
        return;
      }
      if(ports.length == 0){
        self.main.eventManager.triggerEvent(new ShowPopupEvent('warning', 'No boards were found'));
        self.main.eventManager.triggerEvent(new Event('scan-boards-end'));
        return;
      }

      for(var index in ports){
        var port = ports[index];

        if(port.manufacturer.toLowerCase().indexOf('arduino') == -1){
          continue; // not an arduino board
        }

        var serial = new SerialPort(port.comName, {
          baudrate: 9600,
          parser: self.serialParser()
        });

        var first = true;
        var canTimeout = true;
        var completeString = "";
        var lastByte = 0;

        serial.on('data', function(data){
          if(first){
            first = false;
            serial.write(new Command('identify').getSendBytes());
          }else{
            if(data.string.indexOf('MidiController') == 0){
              canTimeout = false;
              serial.close();
              self.main.eventManager.triggerEvent(new BoardFoundEvent(data.string.replace('MidiController ', ''), port.comName));
              if(index == ports.length - 1){
                self.main.eventManager.triggerEvent(new Event('scan-boards-end'));
              }
            }
          }
        });

        setTimeout(function(){
          if(canTimeout){
            self.main.eventManager.triggerEvent(new ShowPopupEvent('warning', 'Board at comname "' + port.comName + '" timed out!'));
            serial.close();
            if(index == ports.length - 1){
              self.main.eventManager.triggerEvent(new Event('scan-boards-end'));
            }
          }
        }, 10000);
      }
    });
  }
}
