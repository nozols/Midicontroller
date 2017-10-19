import Command from './Command.js';

export default class PatchCommand extends Command{
  constructor(patch){
    super('patch');
    this.patch = parseInt(patch);
  }

  getCommand(){
    return [
      this.getCommandByte(),
      this.patch
    ];
  }

  displayCommandline(){
    return this.command + ' ' + this.patch;
  }
}
