import Html from './Html.js';
import TextNode from './TextNode.js';

export default class PageWordsHtml extends Html{
  constructor(main){
    super(document.getElementById('page-words'));
    var self = this;
    this.main = main;
    this.inputs = [];

    var w = this.node.querySelectorAll('.input-word');
    for(var i = 0; i < w.length; i++){
      this.inputs.push(new Html(w[i]));
    }

  }

  setWord(id, word){
    this.inputs[id].setValue(word);
    this.inputs[id].getParent().removeClass('is-empty');
  }
}
