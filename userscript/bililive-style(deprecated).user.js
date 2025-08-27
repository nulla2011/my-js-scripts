// ==UserScript==
// @name        bililive-style
// @namespace   Violentmonkey Scripts
// @match       https://live.bilibili.com/*
// @grant       none
// @version     1.0
// @author      nulla
// @description 2023/4/16 19:46:05
// ==/UserScript==

(function () {
  const video = document.querySelector('video');
  // video.style.height = '100%!important';
  let observer = new MutationObserver((list) => {
    try {
      stop_observe();
      const bottomBar = document.querySelector('#web-player__bottom-bar__container');
      bottomBar.parentNode.removeChild(bottomBar);
    } finally {
      start_observe();
    }
  });
  let start_observe = observer.observe(document.body, { childList: true, subtree: true });
  let stop_observe = () => observer.disconnect();
  start_observe();
})();
