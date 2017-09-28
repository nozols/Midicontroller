import Html from './Html.js';
import TextNode from './TextNode.js';

export default class PageBanksPatchHtml extends Html{
  constructor(element){
    super(element);

    this.inputs = {};
    this.inputs.name = (new Html(element.querySelector('.input-name')));
    this.inputs.bpm = (new Html(element.querySelector('.input-bpm')));
    this.inputs.midiChannel = (new Html(element.querySelector('.input-midi-channel')));
    this.inputs.midiStatus = (new Html(element.querySelector('.input-midi-status')));
    this.inputs.midiPitch = (new Html(element.querySelector('.input-midi-parameter-1')));
    this.inputs.midiVelocity = (new Html(element.querySelector('.input-midi-parameter-2')));
  }

  setContent(data){
    for(var index in this.inputs){
      this.inputs[index].setValue(data[index]);
      this.inputs[index].getParent().removeClass('is-empty');
    }
  }

  setWord(id, word){
    var element = this.inputs.name.getChild('option[value="' + id + '"]');
    if(element){
      element.node.innerHTML = null;
      element.addChild(new TextNode(word));
    }else{
      var newElement = new Html('option');
      newElement.setValue(id);
      newElement.addChild(new TextNode(word));
      this.inputs.name.addChild(newElement);
    }
  }
}
