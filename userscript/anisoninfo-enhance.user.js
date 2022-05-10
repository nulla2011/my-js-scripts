// ==UserScript==
// @name         anisoninfo enhance
// @namespace    http://tampermonkey.net/
// @version      0.3
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
      let match = el.href.match(/javascript:link\('(\w+)','(\d+)'\)/);
      if (!match) {
        console.error('not found!');
      } else {
        let [catgory, id] = match.slice(1);
        el.href = `/data/${catgory}/${id}.html`;
      }
    }
  }
  let mainTable = document.querySelectorAll('table.sorted');
  let infoTable = document.querySelectorAll('table.list');
  for (let t of [...mainTable, ...infoTable]) {
    if (t.tBodies) {
      changeLinks(t.tBodies[0]);
    }
  }
})();
