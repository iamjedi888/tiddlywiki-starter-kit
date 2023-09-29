/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/gqwidget.js
type: application/javascript
module-type: widget

Gravatar and QQ Github Avatar Widget(Lastest gqg)

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const md5 = require('$:/plugins/oeyoews/tiddlywiki-gravatar/md5.min.js');
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class AvatarWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;

      let getDefaultEmail =
        $tw.wiki.getTiddlerText(
          '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email',
        ) || '2956398608@qq.com';
      const Username =
        $tw.wiki.getTiddlerText('$:/status/UserName') || 'oeyoews';

      let {
        email = getDefaultEmail /** @example url="./files/xxx.png" url="https://xxx.png" */,
        url,
        username = Username,
        center,
        inline,
        link,
        class: className = 'w-12',
        size = 100,
        alt = 'Avatar',
        type = 'gravatar',
      } = this.attributes;

      const hash = md5(email.trim().toLowerCase());

      let src;

      const types = {
        qq: `https://q1.qlogo.cn/g?b=qq&nk=${email}&s=${size}`,
        github: `https://github.com/${username}.png?size=${size}`,
        gravatar: `https://gravatar.com/avatar/${hash}.png?s=${size}`,
        gravatar_cn: `https://cn.gravatar.com/avatar/${hash}.png?s=${size}`,
        url,
      };

      types[type]?.includes(type)
        ? (src = types[type])
        : (src = types.gravatar);

      const dynamicClasses = 'blur scale-105';
      const imgClass = `rounded-full align-middle duration-200 transition object-cover object-center ${className} ${dynamicClasses}`;

      const img = createElement('img', {
        class: imgClass,
        attributes: {
          src,
          alt,
        },
      });

      if (inline) {
        img.classList.remove('w-12');
        img.classList.add('mx-0', 'w-4');
      }

      const tempClassList =
        'mx-auto shadow-md border-dashed border block border-indigo-400 p-1';

      center && img.classList.add(...tempClassList.split(' '));
      types[type]?.includes(type) && img.setAttribute('data-type', type);

      // 考虑图片加载失败, 但是不考虑图片加载超时(offline)
      img.onerror = () => {
        console.warn(src, '图片加载失败');
        img.classList.remove(...dynamicClasses.split(' '));
        img.src =
          'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=100';
      };

      img.onload = () => {
        img.classList.remove(...dynamicClasses.split(' '));
      };

      const linkNode = createElement('a', {
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
          style: 'text-decoration: none;',
          href: link,
        },
        children: [img],
      });

      const domNode = link ? linkNode : img;

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  /**
   * @description Gravatar and QQ  Github Avatar Widget
   * @param {string} username
   * @param {string} email
   * @param {string} type
   * @param {string} size
   * @param {string} link
   * @param {string} center
   * @param {string} alt
   */
  exports.avatar = AvatarWidget;
})();
