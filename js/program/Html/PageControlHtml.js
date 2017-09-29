import Html from './Html.js';
import SendCommandEvent from './../Events/SendCommandEvent.js';
import BankCommand from './../Command/BankCommand.js';
import PatchCommand from './../Command/PatchCommand.js';
import Command from './../Command/Command.js';

export default class PageControlHtml extends Html{
  constructor(main){
    super(document.getElementById('page-control'));
    var self = this;
    this.main = main;

    this.buttons = {};
    this.buttons.bankup = (new Html(this.node.querySelector('#btn-bank-up'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new BankCommand('up')));
    });
    this.buttons.bankdown = (new Html(this.node.querySelector('#btn-bank-down'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new BankCommand('down')));
    });
    this.buttons.patchOne = (new Html(this.node.querySelector('#btn-patch-1'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new PatchCommand(0)));
    });
    this.buttons.patchTwo = (new Html(this.node.querySelector('#btn-patch-2'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new PatchCommand(1)));
    });
    this.buttons.patchThree = (new Html(this.node.querySelector('#btn-patch-3'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new PatchCommand(2)));
    });
    this.buttons.patchFour = (new Html(this.node.querySelector('#btn-patch-4'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new PatchCommand(3)));
    });
    this.buttons.patchFive = (new Html(this.node.querySelector('#btn-patch-5'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new PatchCommand(4)));
    });
    this.buttons.tune = (new Html(this.node.querySelector('btn-tune'))).onClick(function(){
      self.main.eventManager.triggerEvent(new SendCommandEvent(new Command('tune')));
    });
  }
}
