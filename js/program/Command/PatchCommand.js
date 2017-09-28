import Command from  './Command.js';

export default class PatchCommand extends Command{
  constructor(patch){
    super('patch');
    this.patch = parseInt(patch);
  }

  getCommand(){
    return this.getCommandChar() + this.patch;
  }
}
