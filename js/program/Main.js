import EventManager from './Manager/EventManager.js';
import BoardManager from './Manager/BoardManager.js';
import PageManager from './Manager/PageManager.js';
import DataManager from './Manager/Datamanager.js';
import LocalManager from './Manager/LocalManager.js';
import Util from './Util/Util.js';

export default class Main{
  constructor(){
    var self = this;
    this.DEBUG = true;
    this.util = new Util();
    this.eventManager = new EventManager(this);
    this.boardManager = new BoardManager(this);
    this.dataManager = new DataManager(this);
    this.pageManager = new PageManager(this);
    this.localManager = new LocalManager(this);

    this.boardManager.scanBoards();
    console.log(this);
  }
}
