import Html from './../Html/Html.js';
import PageControlHtml from './../Html/PageControlHtml.js';
import PageBanksHtml from './../Html/PageBanksHtml.js';
import PageWordsHtml from './../Html/PageWordsHtml.js';
import ShowPopupEvent from './../Events/ShowPopupEvent.js';

export default class PageManager{
  constructor(main){
    var self = this;
    this.main = main;
    this.scanSpinner = null;
    this.boardDropdown = new Html(document.getElementById('board-dropdown'));

    this.pages = {};
    this.pages.welcome = new Html(document.getElementById('page-welcome'));
    this.pages.downloading = new Html(document.getElementById('page-downloading'));
    this.pages.control = new PageControlHtml(main);
    this.pages.banks = new PageBanksHtml(main);
    this.pages.words = new PageWordsHtml(main);
    this.pages.settings = new Html(document.getElementById('page-settings'));

    this.buttons = {};
    this.buttons.control = new Html(document.getElementById('btn-page-control'));
    this.buttons.banks = new Html(document.getElementById('btn-page-banks'));
    this.buttons.words = new Html(document.getElementById('btn-page-words'));
    this.buttons.settings = new Html(document.getElementById('btn-page-settings'));

    for(var index in this.buttons){
      this.buttons[index].onClick(function(e, s){
        self.selectPage(s.getData('select'));
      });
    }

    this.main.eventManager.addEventListener('scan-boards', function(){
      self.showBoardScanSpinner();
    });

    this.main.eventManager.addEventListener('scan-boards-end', function(){
      self.hideBoardScanSpinner();
    });

  }

  showBoardScanSpinner(){
    this.hideBoardScanSpinner();
    this.scanSpinner = new Html('li');
    var a = (new Html('a')).setTag('href', '#');
    var span = (new Html('span')).addClass('spinner');
    this.scanSpinner.addChild(a);
    a.addChild(span);
    this.boardDropdown.addChild(this.scanSpinner);
  }

  hideBoardScanSpinner(){
    if(this.scanSpinner != null){
      this.scanSpinner.remove();
    }
  }

  /**
   * selectPage - set the active page
   *
   * @param  {string} page page name
   */
  selectPage(page){
    if(this.main.DEBUG || this.main.boardManager.isBoardActive()){
      this.eachPage(function(p){
        p.removeClass('page-visible');
      });

      this.pages[page].addClass('page-visible');
    }else{
      this.main.eventManager.triggerEvent(new ShowPopupEvent('warning', 'Please select a board first!'));
    }
  }

  /**
   * eachPage - loop through eache page
   *
   * @param  {function} callback called with the page as paremeter
   */
  eachPage(callback){
    for(var index in this.pages){
      callback(this.pages[index]);
    }
  }
}
