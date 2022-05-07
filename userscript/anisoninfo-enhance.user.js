// ==UserScript==
// @name         anisoninfo enhance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  replace real links in anison.info
// @author       nulla
// @match        http://anison.info/*
// @icon         http://anison.info/favicon.icon
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  function changeLinks(table) {
    let a = table.querySelectorAll('a');
    for (let el of a) {
      let match = el.getAttribute('href').match(/javascript:link\('(\w+)','(\d+)'\)/);
      if (!match) {
        console.error('not found!');
      } else {
        let [catgory, id] = match.slice(1);
        el.setAttribute('href', `${location.origin}/data/${catgory}/${id}.html`);
      }
    }
  }
  let mainTable = document.querySelectorAll('table.sorted');
  for (let t of mainTable) {
    if (t.tHead) {
      changeLinks(t);
    }
  }
  let infoTable = document.querySelectorAll('table.list');
  for (let t of infoTable) {
    if (t.tHead) {
      changeLinks(t);
    }
  }
})();
