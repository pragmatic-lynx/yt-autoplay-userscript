// ==UserScript==
// @name         YouTube Anti-Pause
// @namespace    http://tampermonkey.net/
// @version      6.2
// @description  Prevents auto-pause when minimizing app, allows manual pause
// @author       You
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/pragmatic-lynx/yt-autoplay-userscript/raw/main/UserScript.user.js
// @updateURL    https://github.com/pragmatic-lynx/yt-autoplay-userscript/raw/main/UserScript.user.js
// ==/UserScript==

(function() {
    'use strict';

    Object.defineProperty(document, 'hidden', {
        get: function() { return false; }
    });
    Object.defineProperty(document, 'visibilityState', {
        get: function() { return 'visible'; }
    });

    window.addEventListener('blur', function(e) {
        e.stopImmediatePropagation();
    }, true);

    document.addEventListener('visibilitychange', function(e) {
        e.stopImmediatePropagation();
    }, true);
})();
