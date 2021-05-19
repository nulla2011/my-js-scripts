// ==UserScript==
// @name         search in advance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  open advance search
// @author       nulla
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let checkUaerPage = () => {
        let pathName = location.pathname;
        let searchLink = document.querySelector("#search_in_advance");
        if (searchLink) {
            searchLink.remove();
        }
        let headerPhotoLink = document.querySelector('[data-testid="primaryColumn"] a[role="link"][href$="/header_photo"]~div a[role="link"][href$="/photo"]');
        if (!headerPhotoLink) {
            return;
        }
        searchLink = document.createElement('a');
        searchLink.href = "/search-advanced?said=" + pathName.substring(1);
        searchLink.textContent = "Search tweets";
        searchLink.id = "search_in_advance";
        searchLink.target = "_blank";
        searchLink.style = "top: 0px;left: 150px;color: #1DA1F2;position: absolute;font: inherit;"
        headerPhotoLink.after(searchLink);
    };
    let checkSearchPage = () => {
        let params = document.URL.split('?')[1].split('&');
        let id
        for (const param of params) {
            if (param.split('=')[0] == "said") {
                id = param.split('=')[1];
                break;
            }
        }
        if (id) {
            document.querySelector('[name="fromTheseAccounts"]').value = id;
        }
    }
    let checkPage = () => {
        let pathName = location.pathname;
        if (pathName.match("/search-advanced")) {
            checkSearchPage();
        }
        else if (pathName.match("/home")) {

        }
        else {
            checkUaerPage();
        }
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
    checkPage();
})();