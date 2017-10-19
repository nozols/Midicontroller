import Html from './../Html.js';
import TextNode from './../TextNode.js';
import ShowPopupEvent from './../../Events/ShowPopupEvent.js';
import SendCommandEvent from './../../Events/SendCommandEvent';
import StoreWordCommand from './../../Command/StoreWordCommand.js';

export default class PageWordsHtml extends Html{
  constructor(main){
    super(document.getElementById('page-words'));
    var self = this;
    this.main = main;
    this.buttons = {}
    this.buttons.save = (new Html(this.node.querySelector('#btn-save')))
      .onClick(function(){
        self.storeToBoard();
      });
    this.buttons.saveLocal = (new Html(this.node.querySelector('#btn-save-json')))
      .onClick(function(){
        self.main.localManager.saveWords();
      });
    this.buttons.loadLocal = (new Html(this.node.querySelector('#btn-load')))
      .onClick(function(){
        self.main.localManager.loadWords();
      });
    this.inputs = [];

    var w = this.node.querySelectorAll('.input-word');
    for(var i = 0; i < w.length; i++){
      this.inputs.push(new Html(w[i]));
    }

  }

  /**
   * setWord - set word value
   *
   * @param  {int} id   word id
   * @param  {string} word word value
   */
  setWord(id, word){
    this.inputs[id].setValue(word);
    this.inputs[id].getParent().removeClass('is-empty');
  }

  /**
   * getWords - get word values
   *
   * @return {array}  values
   */
  getWords(){
    var result = [];
    for(var i = 0; i < this.inputs.length; i++){
      result[i] = this.inputs[i].getValue();
    }
    return result;
  }

  storeToBoard(){
    if(this.validate()){
      for(var i = 0; i < this.inputs.length; i++){
        if(this.main.dataManager.words[i] != this.inputs[i].getValue()){
          this.main.eventManager.triggerEvent(new SendCommandEvent(new StoreWordCommand(i, this.inputs[i].getValue())));
        }
      }
    }else{
      this.main.eventManager.triggerEvent(new ShowPopupEvent('warning', 'Please make sure you words are valid and match the following regex: [a-z0-9A-Z\\s]{0,16}'))
    }
  }

  /**
   * validate - validate the inputs for uploading
   *
   * @return {boolean}  is valid?
   */
  validate(){
    var result = true;
    for(var i = 0; i < this.inputs.length; i++){
      if(!/(^[a-z0-9A-Z\s:]{0,16}$)/g.test(this.inputs[i].getValue())){
        this.inputs[i].getParent().addClass('has-error');
        result = false;
      }else{
        this.inputs[i].getParent().removeClass('has-error');
      }
    }
    return result;
  }
}
