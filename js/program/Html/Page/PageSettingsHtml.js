import Html from './../Html.js';
import TextNode from './../TextNode.js';

export default class PageControlHtml extends Html{
  constructor(main){
    super(document.getElementById('page-settings'));
    var self = this;
    this.main = main;

    this.console = new Html(this.node.querySelector('#board-console'));
    this.consoleLines = new Html(this.console.getChild('.console-lines'));

    this.main.eventManager.addEventListener('send-command', function(event){
      self.addConsoleLine(event.command.displayCommandline());
    });

    for(var index in this.main.util.commandBytes){
      this.main.eventManager.addEventListener('command-receive-' + index, function(event){
        self.addConsoleLine(event.command.displayCommandline());
      });
    }

  }

  addConsoleLine(line){
    var container = new Html('span')
      .addClass('console-line');
    container.addChild(new TextNode(line));
    this.consoleLines.addChild(container);
  }
}
