import Html from './Html.js'
import PageBanksPatchHtml from './PageBanksPatchHtml.js';

export default class PageBanksHtml extends Html{
  constructor(main){
    super(document.getElementById('page-banks'));
    var self = this;
    this.main = main;

    this.buttons = {};
    this.buttons.save = (new Html(document.getElementById('btn-save')));
    this.buttons.saveJson = (new Html(document.getElementById('btn-save-json')));
    this.buttons.saveJsonAll = (new Html(document.getElementById('btn-save-json-all')));
    this.buttons.load = (new Html(document.getElementById('btn-load')));
    this.buttons.loadAll = (new Html(document.getElementById('btn-load-all')));

    this.inputs = {};
    this.inputs.bankNumber = (new Html(document.getElementById('input-bank')))
      .addEventListener('change', function(e){
        self.setContent(self.main.dataManager.banks[e.target.value]);
      });
    this.inputs.bankName = (new Html(document.getElementById('input-bank-name')));
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

  setWord(id, word){
    for(var i = 0; i < 5; i++){
      this.inputs.patches[i].setWord(id, word);
    }
  }
}
