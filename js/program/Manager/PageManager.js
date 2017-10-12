import Html from './../Html/Html.js';
import TextNode from './../Html/TextNode.js';
import PageControlHtml from './../Html/PageControlHtml.js';
import PageBanksHtml from './../Html/PageBanksHtml.js';
import PageWordsHtml from './../Html/PageWordsHtml.js';
import ShowPopupEvent from './../Events/ShowPopupEvent.js';


/**
 * Handles all the html stuff going on on the pages
 *   - button clicks
 *   - updating inputs
 *   - validating inputs
 */
export default class PageManager{
  constructor(main){
    var self = this;
    this.main = main;
    this.scanSpinner = null;
    this.boardDropdown = new Html(document.getElementById('board-dropdown'));
    this.alertContainer = new Html(document.getElementById('alert-container'));

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

    this.main.eventManager.addEventListener('board-select', function(){
      self.selectPage('downloading');
    });

    this.main.eventManager.addEventListener('download-ready', function(){
      self.selectPage('control');
    });

    this.main.eventManager.addEventListener('show-popup', function(e){
      var alert = (new Html('div'))
        .setClass('alert alert-'+e.messageType);
      var container = (new Html('div'))
        .setClass('container-fluid');
      var button = (new Html('button'))
        .setClass('close')
        .setTag('type', 'button')
        .setTag('data-dismiss', 'alert')
        .setTag('aria-label', 'close')
        .onClick(function(){
          alert.remove();
        });
      var span = (new Html('span'))
        .setTag('aria-hidden', true)
        .addChild(new TextNode('X'));
      alert.addChild(container);
      container.addChild(button);
      button.addChild(span);
      container.addChild(new TextNode(e.message));
      self.alertContainer.addChild(alert);
    });
  }

  /**
   * showBoardScanSpinner - show the spinner in the board select menu
   */
  showBoardScanSpinner(){
    this.hideBoardScanSpinner();
    this.scanSpinner = new Html('li');
    var a = (new Html('a')).setTag('href', '#');
    var span = (new Html('span')).addClass('spinner');
    this.scanSpinner.addChild(a);
    a.addChild(span);
    this.boardDropdown.addChild(this.scanSpinner);
  }

  /**
   * hideBoardScanSpinner - hide the spinner in the board select menu
   */
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
