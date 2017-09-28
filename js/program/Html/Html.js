export default class Html{
  constructor(el){
    var self = this;
    if(typeof el === 'object'){
      this.element = el.nodeName;
      this.node = el;
    }else{
      this.element = el;
      this.node = document.createElement(el);
    }

    this.node.onclick = function(e){
      for(var i = 0; i < self.onClickCallback.length; i++){
        self.onClickCallback[i](e, self);
      }
    };

    this.onClickCallback = [];
  }

  addEventListener(name, callback){
    this.node.addEventListener(name, callback);
    return this;
  }

  getParent(){
    return new Html(this.node.parentNode);
  }

  /**
   * remove - remove the node from the DOM
   */
  remove(){
    this.node.remove();
  }

  /**
   * setData - set data in dataset
   *
   * @param  {string} key   key of data
   * @param  {type} value value of data
   * @return {Html}       instance
   */
  setData(key, value){
    this.node.dataset[key] = value;
    this.setTag('data-' + key, value);
    return this;
  }

  /**
   * getData - get data from dataset
   *
   * @param  {string} key
   * @return {string}     value
   */
  getData(key){
    return this.node.dataset[key];
  }

  /**
   * getNode - get the node
   *
   * @return {DOMElement}  node
   */
  getNode(){
    return this.node;
  }

  /**
   * setTag - set a tag
   *
   * @param  {string} key   tag name
   * @param  {string} value tag value
   * @return {Html}       instance
   */
  setTag(key, value){
    this.node[key] = value;
    return this;
  }

  /**
   * getTag - get a tag
   *
   * @param  {string} key tag key
   * @return {string}     tag value
   */
  getTag(key){
    return this.node[key];
  }

  /**
   * addChild - add child node
   *
   * @param  {Html} html the child node
   * @return {Html}      Instance
   */
  addChild(html){
    this.node.appendChild(html.getNode());
    return this;
  }

  getChild(selector){
    return this.node.querySelector(selector);
  }

  /**
   * onClick - add onclick listener
   *
   * @param  {function} callback
   * @return {Html}          instance
   */
  onClick(callback){
    this.onClickCallback.push(callback);
    return this;
  }


  /**
   * addClass - add a class
   *
   * @param  {string} cl class to add
   * @return {Html}    instance
   */
  addClass(cl){
    this.node.classList.add(cl);
    return this;
  }

  /**
   * removeClass - remove a class
   *
   * @param  {string} cl class to remove
   * @return {Html}    instance
   */
  removeClass(cl){
    this.node.classList.remove(cl);
    return this;
  }

  /**
   * setClass - set the class
   *
   * @param  {string} cl class
   * @return {Html}    instance
   */
  setClass(cl){
    this.node.class = cl;
    return this;
  }

  /**
   * getClass - get the class
   *
   * @return {string}  class
   */
  getClass(){
    return this.node.class;
  }


  /**
   * setId - set the id
   *
   * @param  {string} id
   * @return {Html}    instance
   */
  setId(id){
    this.node.id = id;
    return this;
  }


  /**
   * getId - get the id
   *
   * @return {string}  id
   */
  getId(){
    return this.node.id;
  }

  /**
   * getValue - get the value
   *
   * @return {type}  value
   */
  getValue(){
    return this.node.value;
  }

  setValue(value){
    this.node.value = value;
    return this;
  }
}
