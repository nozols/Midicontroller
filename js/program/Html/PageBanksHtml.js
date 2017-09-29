import Html from './Html.js'
import PageBanksPatchHtml from './PageBanksPatchHtml.js';

export default class PageBanksHtml extends Html{
  constructor(main){
    super(document.getElementById('page-banks'));
    var self = this;
    this.main = main;

    this.buttons = {};
    this.buttons.save = (new Html(this.node.querySelector('#btn-save')))
      .onClick(function(){

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

  getCurrentBank(){
    return parseInt(this.inputs.bankNumber.getValue());
  }

  setContent(data){
    this.inputs.bankName.setValue(data.name.replace(String.fromCharCode(0), ""));
    this.inputs.bankName.getParent().removeClass('is-empty');
    for(var i = 0; i < 5; i++){
      this.inputs.patches[i].setContent({
        name: data.names[i],
        bpm: data.bpms[i],
        midiChannel: data.midi[i][0] & 15,
        midiStatus: this.main.util.midiCommandBytes[data.midi[i][0] >> 4],
        midiPitch: data.midi[i][1],
        midiVelocity: data.midi[i][2]
      });
    }
  }

  getCurrentContent(){
    var result = {
      bankName: this.inputs.bankName.getValue(),
      bankNumber: this.inputs.bankNumber.getValue(),
      patches: []
    }

    for(var i = 0; i < 5; i++){
      result.patches.push(this.inputs.patches[i].getContent());
    }
    return result;
  }

  getAllContent(){

  }

  setWord(id, word){
    for(var i = 0; i < 5; i++){
      this.inputs.patches[i].setWord(id, word);
    }
  }
}
