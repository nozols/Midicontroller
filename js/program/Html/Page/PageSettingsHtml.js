import Html from './../Html.js';


export default class PageControlHtml extends Html{
  constructor(main){
    super(document.getElementById('page-settings'));
    var self = this;
    this.main = main;

  }
}
