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
        let uid = pathName.split('/')[1];
        let mainCloumn = document.querySelector('[data-testid="primaryColumn"]');
        if (!mainCloumn) {
            return;
        }
        let searchButton = mainCloumn.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.children[2];
        if (!searchButton || searchButton.children.length !== 0) {
            searchButton.style = "";
            return;
        }
        searchButton.onclick = () => {
            sessionStorage.setItem("uid", uid);
            window.open("/search-advanced");
        }
        searchButton.style = "background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjAiIGhlaWdodD0iNjAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMzMDMwMzA7Ij48cGF0aCBkPSJNIDEzIDMgQyA3LjQ4ODk5NzEgMyAzIDcuNDg4OTk3MSAzIDEzIEMgMyAxOC41MTEwMDMgNy40ODg5OTcxIDIzIDEzIDIzIEMgMTUuMzk2NTA4IDIzIDE3LjU5NzM4NSAyMi4xNDg5ODYgMTkuMzIyMjY2IDIwLjczNjMyOCBMIDI1LjI5Mjk2OSAyNi43MDcwMzEgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDI2LjcwNzAzMSAyNS4yOTI5NjkgTCAyMC43MzYzMjggMTkuMzIyMjY2IEMgMjIuMTQ4OTg2IDE3LjU5NzM4NSAyMyAxNS4zOTY1MDggMjMgMTMgQyAyMyA3LjQ4ODk5NzEgMTguNTExMDAzIDMgMTMgMyB6IE0gMTMgNSBDIDE3LjQzMDEyMyA1IDIxIDguNTY5ODc3NCAyMSAxMyBDIDIxIDE3LjQzMDEyMyAxNy40MzAxMjMgMjEgMTMgMjEgQyA4LjU2OTg3NzQgMjEgNSAxNy40MzAxMjMgNSAxMyBDIDUgOC41Njk4Nzc0IDguNTY5ODc3NCA1IDEzIDUgeiI+PC9wYXRoPjwvc3ZnPg==') 50% 50% no-repeat; background-size: 58%;";
    };
    let checkSearchPage = () => {
        let id = sessionStorage.getItem("uid");
        if (id) {
            let accountBlank = document.querySelector('[name="fromTheseAccounts"]');
            if (accountBlank) {
                accountBlank.value = id;
            }
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
    // checkPage();
})();