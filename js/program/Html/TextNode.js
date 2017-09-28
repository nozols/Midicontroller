export default class TextNode{
  constructor(text){
    this.node = document.createTextNode(text);
  }

  getNode(){
    return this.node;
  }
}
