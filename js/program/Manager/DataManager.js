import Command from './../Command/Command.js';
import SendCommandEvent from './../Events/SendCommandEvent.js';

/**
 * Handles all the incoming data from the midicontroller and stores it in arrays
 */
export default class DataManager{
  constructor(main){
    var self = this;
    this.main = main;
    this.banks = [];
    this.words = [];

    this.main.eventManager.addEventListener('board-ready', function(){
      self.banks = [];
      self.words = [];
      self.main.eventManager.triggerEvent(new SendCommandEvent(new Command('sendwords')));
      self.main.eventManager.triggerEvent(new SendCommandEvent(new Command('sendbanks')));
    });

    this.main.eventManager.addEventListener('command-receive-sendbanks', function(event){
      self.banks[event.command.bank] = event.command;
      if(self.main.pageManager.pages.banks.getCurrentBank() === event.command.bank){
        self.main.pageManager.pages.banks.setContent(event.command);
      }
    });

    this.main.eventManager.addEventListener('command-receive-sendwords', function(event){
      self.words[event.command.words] = event.command;

      self.main.pageManager.pages.banks.setWord(event.command.id, event.command.word);
      self.main.pageManager.pages.words.setWord(event.command.id, event.command.word);
    });
  }

  numberToWord(number){
    return this.words[number];
  }
}
