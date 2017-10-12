import Html from './Html.js';
import TextNode from './TextNode.js';

export default class PageWordsHtml extends Html{
  constructor(main){
    super(document.getElementById('page-words'));
    var self = this;
    this.main = main;
    this.buttons = {}
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
}
