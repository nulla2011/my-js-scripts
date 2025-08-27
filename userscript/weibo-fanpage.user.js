// ==UserScript==
// @name        weibo-fanpage
// @namespace   Violentmonkey Scripts
// @match       https://weibo.com/u/page/follow/*
// @grant       none
// @version     1.0
// @author      nulla
// @description 2023/5/10 11:32:59
// ==/UserScript==

(function () {
  const delay = 300;
  const addStyle = (newStyle) => {
    let styleElement = document.querySelector('#js_styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.id = 'js_styles';
      document.querySelector('head').appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
  };
  addStyle('.woo-modal-wrap{display:none !important;}');
  const checkHome = () => {
    let ev = new Event('mouseover');
    document.querySelectorAll('[class*="UserCard_stbtn"] i').forEach((el) => el.dispatchEvent(ev));
    document.querySelectorAll('[class*="UserCard_stbtn"] .woo-pop-main').forEach((el) =>
      Object.assign(el.style, {
        top: '-12px',
        left: '28px',
      })
    );
    document.querySelectorAll('[class^="UserCard_rightContent"]').forEach((el) => {
      el.style.margin = '0 45px 0 30px';
    });
    document.querySelectorAll('[class*="UserCard_popBtn"]').forEach((el) => {
      el.addEventListener('click', () =>
        setTimeout(
          () => document.querySelector('[role="alertdialog"] button:nth-of-type(2)').click(),
          delay
        )
      );
    });
    document.querySelector('[class*="ListTitle_tit"]').classList.remove('woo-box-justifyBetween');
  };
  let observer = new MutationObserver(checkHome);
  observer.observe(document.querySelector('.home'), { childList: true, subtree: true });
})();
