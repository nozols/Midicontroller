import fs from 'fs';
import {remote} from 'electron';
import ShowPopupEvent from './../Events/ShowPopupEvent.js';

/**
 * Handles the save files that are stored on local disk.
 */
export default class LocalManager{
  constructor(main){
    this.main = main;
  }

  getLoadLocation(){
    return remote.dialog.showOpenDialog({
      title: 'Load midicontroller file',
      filters: [
        {name: 'Midicontroller file', extensions: ['mcf']},
        {name: 'All files', extensions: ['*']}
      ]
    });
  }

  getSaveLocation(){
    return remote.dialog.showSaveDialog({
      title: 'Save midicontroller file',
      filters: [
        {name: 'Midicontroller file', extensions: ['mcf']},
        {name: 'All files', extensions: ['*']}
      ]
    });
  }

  saveFile(type, data){
    data.type = type;
    data.midicontroller = 'midicontroller';
    data.location = this.getSaveLocation();
    var json = JSON.stringify(data);
    var self = this;
    fs.writeFile(data.location, json, 'utf-8', function(err){
      if(err){
        self.main.eventManager.triggerEvent(new ShowPopupEvent('danger', 'Could not write file!'));
      }else{
        self.main.eventManager.triggerEvent(new ShowPopupEvent('success', 'Successfully saved file!'));
      }
    })
  }

  saveAllBanks(){

  }

  saveCurrentBank(){
    this.saveFile('single-bank', this.main.pageManager.pages.banks.getCurrentContent());
  }

  loadAllBanks(){

  }

  loadCurrentBank(){

  }

  saveWords(){

  }

  loadWords(){

  }

}
