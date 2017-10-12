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
      self.main.eventManager.triggerEvent(new SendCommandEvent(new Command('ready')));
    });

    this.main.eventManager.addEventListener('command-receive-sendbanks', function(event){
      self.setBank(event.command.bank, event.command.name, event.command.midi, event.command.bpms, event.command.names);
    });

    this.main.eventManager.addEventListener('command-receive-sendwords', function(event){
      self.setWord(event.command.id, event.command.word);
    });

    this.main.eventManager.addEventListener('command-receive-ready', function(event){
      self.pageManager.selectPage('control');
    });
  }

  /**
   * numberToWord - translate a number that is stored to the correct word
   *
   * @param  {int} number
   * @return {string}
   */
  numberToWord(number){
    return this.words[number];
  }

  /**
   * setBank - set bank data
   *
   * @param  {int} id    bank id
   * @param  {array} name  bank name
   * @param  {array} midi  patch midi commands
   * @param  {array} bpms  patch bpms
   * @param  {array} words patch words
   */
  setBank(id, name, midi, bpms, words){
    this.banks[id] = {
      bank: id,
      name: name,
      midi: midi,
      bpms: bpms,
      words: words
    };
    if(this.main.pageManager.pages.banks.getCurrentBank() === id){
      this.main.pageManager.pages.banks.setContent(this.banks[id]);
    }
  }

  /**
   * setWord - set word data
   *
   * @param  {int} id   word id
   * @param  {string} word word value
   */
  setWord(id, word){
    this.words[id] = word;
    this.main.pageManager.pages.banks.setWord(id, word);
    this.main.pageManager.pages.words.setWord(id, word);
  }

  /**
   * banksToSaveFile - transform the banks in to a saveable json array
   *
   * @return {array}
   */
  banksToSaveFile(){
    var result = [];
    for(var i = 0 ; i < this.banks.length; i++){
      var bank = {
        bankNumber: this.banks[i].bank,
        bankName: this.banks[i].name,
        patches: []
      };

      for(var j = 0; j < this.banks[i].midi.length; j++){
        bank.patches.push({
          name: this.banks[i].words[j],
          bpm: this.banks[i].bpms[j],
          midiChannel: this.banks[i].midi[j][0] & 15,
          midiStatus: this.main.util.midiCommandBytes[this.banks[i].midi[j][0] >> 4],
          midiPitch: this.banks[i].midi[j][1],
          midiVelocity: this.banks[i].midi[j][2]
        });
      }
      result.push(bank);
    }

    return result;
  }

  /**
   * wordsFromSaveFile - put the words from a savefile into the datamanager
   *
   * @param  {array} words
   */
  wordsFromSaveFile(words){
    for(var i = 0; i < words.length; i++){
      if(words[i] != ""){
        this.setWord(i, words[i]);
      }
    }
  }


  /**
   * banksFromSaveFile - put the banks from a savefile into the datamanager
   *
   * @param  {array} banks
   */
  banksFromSaveFile(banks){
    for(var i = 0; i < banks.length; i++){
      this.bankFromSaveFile(banks[i], banks[i].bankNumber);
    }
  }


  /**
   * bankFromSaveFile - put a bank from the savefile into the datamanager
   *
   * @param  {object} bank
   * @param  {int} number bank number [optional]
   */
  bankFromSaveFile(bank, number){
    number = number || this.main.pageManager.pages.banks.getCurrentBank()
    var midi = [];
    var bpms = [];
    var words = [];
    for(var i = 0; i < bank.patches.length; i++){
      midi[i] = [bank.patches[i].midiChannel + (this.main.util.midiCommandText[bank.patches[i].midiStatus] << 4),
          bank.patches[i].midiPitch || 0,
          bank.patches[i].midiVelocity || 0
        ];
      bpms[i] = bank.patches[i].bpm || 0;
      words[i] = bank.patches[i].name || 0;
    }
    this.setBank(number,
      bank.bankName,
      midi,
      bpms,
      words
    );
  }
}
