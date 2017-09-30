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

  /**
   * getLoadLocation - get a filepath from the user where to load a file from
   *
   * @return {string}  filepath
   */
  getLoadLocation(){
    return remote.dialog.showOpenDialog({
      title: 'Load midicontroller file',
      filters: [
        {name: 'Midicontroller file', extensions: ['mcf']},
        {name: 'All files', extensions: ['*']}
      ]
    });
  }

  /**
   * getSaveLocation - get a filepath from the user where to save a file to
   *
   * @return {string}  filepath
   */
  getSaveLocation(){
    return remote.dialog.showSaveDialog({
      title: 'Save midicontroller file',
      filters: [
        {name: 'Midicontroller file', extensions: ['mcf']},
        {name: 'All files', extensions: ['*']}
      ]
    });
  }

  /**
   * readFile - read a file from disk
   *
   * @param  {string} location the path where the file is
   * @param  {function} callback called when the file is read and converted to json, false if not successful
   */
  readFile(location, callback){
    var self = this;
    fs.readFile(location, 'utf-8', function(err, data){
      if(err){
        self.main.eventManager.triggerEvent(new ShowPopupEvent('danger', 'Could not read file!'));
        console.error(err);
        callback(false);
      }else{
        var json = false;
        try{
          json = JSON.parse(data);
        }catch(e){
          console.error(e);
          self.main.eventManager.triggerEvent(new ShowPopupEvent('danger', 'Invalid file format!'));
        }
        callback(json);
      }
    });
  }

  /**
   * saveFile - save a file to disk
   *
   * @param  {string} type what kind of file are we going to save (i.e. words, bank, banks)
   * @param  {object} data the data that is going to be saved
   */
  saveFile(type, data){
    var savedata = {
      type: type,
      version: '1.0.0',
      midicontroller: 'midicontroller',
      location: this.getSaveLocation(),
      data: data
    }
    var json = JSON.stringify(savedata);
    var self = this;
    fs.writeFile(data.location, json, 'utf-8', function(err){
      if(err){
        self.main.eventManager.triggerEvent(new ShowPopupEvent('danger', 'Could not write file!'));
        console.error(err);
      }else{
        self.main.eventManager.triggerEvent(new ShowPopupEvent('success', 'Successfully saved file!'));
      }
    })
  }

  /**
   * saveAllBanks - save all the banks that the datamanager currently holds
   */
  saveAllBanks(){

  }

  /**
   * saveCurrentBank - save the bank that is currently in the DOM
   */
  saveCurrentBank(){
    this.saveFile('single-bank', this.main.pageManager.pages.banks.getCurrentContent());
  }

  /**
   * loadAllBanks - load all banks into the datamanager from a single file
   */
  loadAllBanks(){

  }

  /**
   * loadCurrentBank - load the current bank from a file into the DOM
   *
   * @return {type}  description
   */
  loadCurrentBank(){

  }

  /**
   * saveWords - save the words into a file
   */
  saveWords(){
    this.saveFile('words', this.main.pageManager.pages.words.getWords());
  }

  /**
   * loadWords - load the words from a file into the DOM   
   */
  loadWords(){
    var self = this;
    var location = this.getLoadLocation();
    if(!location){
      return;
    }
    this.readFile(location[0], function(json){
      if(json){
        if(json.type == 'words'){
          self.main.dataManager.wordsFromSaveFile(json.data);
        }else{
          self.main.eventManager.triggerEvent(new ShowPopupEvent('warning', 'Please select a file that contains words!'));
        }
      }
    });
  }

}
