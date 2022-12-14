// ==UserScript==
// @name        snapdrop enhance
// @namespace   Violentmonkey Scripts
// @match       https://snapdrop.net/
// @match       https://snapdrop.fairysoft.net/
// @match       https://snapdrop.9pfs.repl.co/
// @match       https://airtransferer.web.app/
// @match       https://www.wulingate.com/
// @match       https://drop.wuyuan.dev/
// @grant       none
// @version     0.1
// @author      nulla
// @description add Ctrl + enter to submit text
// @icon        https://snapdrop.net/images/favicon-96x96.png
// ==/UserScript==

(function () {
  'use strict';
  document.querySelector('#textInput').onkeydown = (e) => {
    if (e.ctrlKey) {
      if (e.key === 'Enter') {
        document.querySelector('#sendTextDialog button[type="submit"]').click();
      }
    }
  }
})();