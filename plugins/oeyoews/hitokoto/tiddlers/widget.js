/*\
title: $:/plugins/oeyoews/hitokoto/widget.js
type: application/javascript
module-type: widget

hitokoto widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const getRandomColor = require('./getRandomColor');

class HitokotoWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    // getall journal tiddler
    const journalTiddlers = $tw.wiki.filterTiddlers(
      '[tag[Journal]!sort[created]]',
    );

    const children = [];

    // https://github.com/Jermolene/TiddlyWiki5/pull/7413
    journalTiddlers.map((tiddler) => {
      let content;
      const color = getRandomColor();
      const { created, creator, title } = $tw.wiki.getTiddler(tiddler).fields;
      const footerNode = this.document.createElement('div');
      const timeNode = this.document.createElement('div');
      timeNode.textContent = created;
      timeNode.className = 'mb-2 w-full md:mb-0 md:w-auto';
      const authorNode = this.document.createElement('div');
      authorNode.className = 'mb-2 w-full md:mb-0 md:w-auto text-right';
      authorNode.textContent = `@${creator}`;
      footerNode.className = 'flex flex-wrap text-sm md:justify-between';
      footerNode.append(timeNode, authorNode);
      content = $tw.wiki.renderTiddler('text/html', title);
      // TODO: use eventlisteners
      // const link = `[[${title}]]`;
      // content += $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', link);
      const htNode = this.document.createElement('blockquote');
      htNode.className = `mt-4 md:mt-8 mb-1 bg-${color}-100/50 px-2 rounded border-l-[3px] border-l-${color}-300 mx-0`;
      htNode.innerHTML = content;
      children.push(htNode, footerNode);
    });

    const domNode = createElement('div', {
      children,
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description hitokoto widget
 * @param text
 */
exports.ht = HitokotoWidget;
