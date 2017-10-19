import Html from './Html.js'
import PageBanksPatchHtml from './PageBanksPatchHtml.js';
import ShowPopupEvent from './../Events/ShowPopupEvent.js';
import SendCommandEvent from './../Events/SendCommandEvent';
import StoreBankCommand from './../Command/StoreBankCommand.js';

export default class PageBanksHtml extends Html{
  constructor(main){
    super(document.getElementById('page-banks'));
    var self = this;
    this.main = main;

    this.buttons = {};
    this.buttons.save = (new Html(this.node.querySelector('#btn-save')))
      .onClick(function(){
        self.storeToBoard();
      });
    this.buttons.saveJson = (new Html(this.node.querySelector('#btn-save-json')))
      .onClick(function(){
        self.main.localManager.saveCurrentBank();
      });
    this.buttons.saveJsonAll = (new Html(this.node.querySelector('#btn-save-json-all')))
      .onClick(function(){
        self.main.localManager.saveAllBanks();
      });
    this.buttons.load = (new Html(this.node.querySelector('#btn-load')))
      .onClick(function(){
        self.main.localManager.loadCurrentBank();
      });
    this.buttons.loadAll = (new Html(this.node.querySelector('#btn-load-all')))
      .onClick(function(){
        self.main.localManager.loadAllBanks();
      });

    this.inputs = {};
    this.inputs.bankNumber = (new Html(this.node.querySelector('#input-bank')))
      .addEventListener('change', function(e){
        self.setContent(self.main.dataManager.banks[e.target.value]);
      });
    this.inputs.bankName = (new Html(this.node.querySelector('#input-bank-name')));
    this.inputs.patches = [];
    var p = this.node.querySelectorAll('.patch');
    for(var i = 0; i < p.length; i++){
      this.inputs.patches.push((new PageBanksPatchHtml(p[i])));
    }
  }

  /**
   * getCurrentBank - get the current bank id
   *
   * @return {int}  bank id
   */
  getCurrentBank(){
    return parseInt(this.inputs.bankNumber.getValue());
  }

  /**
   * setContent - set the content that is currently displayed
   *
   * @param  {object} data
   */
  setContent(data){
    this.inputs.bankName.setValue(data.name.replace(String.fromCharCode(0), ""));
    this.inputs.bankName.getParent().removeClass('is-empty');
    for(var i = 0; i < 5; i++){
      this.inputs.patches[i].setContent({
        name: data.words[i],
        bpm: data.bpms[i],
        midiChannel: data.midi[i][0] & 15,
        midiStatus: this.main.util.midiCommandBytes[data.midi[i][0] >> 4],
        midiPitch: data.midi[i][1],
        midiVelocity: data.midi[i][2]
      });
    }
  }

  /**
   * getCurrentContent - get the content that is currently displayed
   *
   * @return {object}  content
   */
  getCurrentContent(){
    var result = {
      bankName: this.inputs.bankName.getValue(),
      bankNumber: this.getCurrentBank(),
      patches: []
    }

    for(var i = 0; i < 5; i++){
      result.patches.push(this.inputs.patches[i].getContent());
    }
    return result;
  }

  getAllContent(){

  }

  /**
   * setWord - set a word value in the dropdown lists
   *
   * @param  {int} id   word id
   * @param  {string} word word
   */
  setWord(id, word){
    for(var i = 0; i < 5; i++){
      this.inputs.patches[i].setWord(id, word);
    }
  }

  /**
   * validate - check if all inputs have valid values
   *
   * @return {boolean}  description
   */
  validate(){
    var result = true;
    if(!/(^[a-z0-9A-Z\s:]{0,16}$)/g.test(this.inputs.bankName.getValue())){
      this.inputs.bankName.getParent().addClass('has-error');
      result = false;
    }else{
      this.inputs.bankName.getParent().removeClass('has-error');
    }

    for(var i = 0; i < this.inputs.patches.length; i++){
      if(!this.inputs.patches[i].validate()){
        result = false;
      }
    }

    return result;
  }

  /**
   * storeToBoard - store the current bank to the board
   */
  storeToBoard(){
    if(this.validate()){
      var bank = this.getCurrentContent();
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
      this.main.eventManager.triggerEvent(new SendCommandEvent(new StoreBankCommand(bank.bankNumber, bank.bankName, midi, bpms, words)));
    }
  }
}
