// ==UserScript==
// @name        Force Vue Devtools
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      nulla
// @description 2025/8/24 11:24:03
// ==/UserScript==

(function () {
  const observer = new MutationObserver((mutationList, obs) => {
    let walker, node;
    walker = document.createTreeWalker(document.body, 1);
    while ((node = walker.nextNode())) {
      if (node.__vue_app__) {
        obs.disconnect()
        console.log('开始启用devTools');
        let vue = node.__vue_app__;
        const hook = window['__VUE_DEVTOOLS_GLOBAL_HOOK__'];
        hook.emit('app:init', vue, vue.version, {
          Fragment: 'Fragment',
          Text: 'Text',
          Comment: 'Comment',
          Static: 'Static'
        })
      } else if (node.__vue__) {
        obs.disconnect()
        console.log('开始启用devTools');
        let vue = node.__vue__.$root;
        let constructor = vue.__proto__.__proto__.constructor;
        if (constructor.config?.devtools == undefined) {
          constructor = vue.__proto__.constructor
        }
        if (constructor.config.devtools == true) {
          continue
        }
        __VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', (constructor.config.devtools = true) && constructor)
      }
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();