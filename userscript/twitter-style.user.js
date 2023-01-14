// ==UserScript==
// @name        twitter-style
// @namespace   Violentmonkey Scripts
// @match       https://twitter.com/*
// @grant       none
// @version     1.0
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @author      nulla
// @description 2023/1/14 12:05:32
// ==/UserScript==

(function () {
  'use strict';
  const checkPage = () => {
    if (location.pathname !== '/home') {
      return;
    }
    let mainColumn = document.querySelector('[data-testid="primaryColumn"]');
    let banner = mainColumn.firstChild.firstChild.firstChild;
    banner.style.display = 'none';
  }
  let observer = new MutationObserver((records) => {
    try {
      stop_observe();
      checkPage();
    }
    finally {
      start_observe();
    }
  });
  let start_observe = () => observer.observe(document.body, { childList: true, subtree: true })
  let stop_observe = () => observer.disconnect();
  start_observe();
})();