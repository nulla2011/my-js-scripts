// ==UserScript==
// @name         remove like button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       nulla
// @match        *://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function() {
    function like(){
    var cssT = "";
    cssT += ".like {display:none !important}";
    var modStyle = document.querySelector('#nCSS');
        if (modStyle === null)
		{
			modStyle = document.createElement('style');
			modStyle.id = 'nCSS';
			document.body.appendChild(modStyle);
		}
        modStyle.innerHTML = cssT;
    }
    like();
})();