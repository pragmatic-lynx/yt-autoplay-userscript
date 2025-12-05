// ==UserScript==
// @name         YouTube Anti-Pause
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Prevents auto-pause when minimizing app, allows manual pause
// @author       pragmatic-lynx
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @grant        none
// @run-at       document-start
// @downloadURL		https://github.com/pragmatic-lynx/yt-autoplay-userscript/raw/main/UserScript.user.js
// @updateURL		https://github.com/pragmatic-lynx/yt-autoplay-userscript/raw/main/UserScript.user.js
// ==/UserScript==

(function() {
    'use strict';

    let lastUserInteraction = 0;

    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.closest('.ytp-play-button') || 
            target.closest('button[aria-label*="Pause"]') ||
            target.closest('button[aria-label*="Play"]') ||
            target.tagName === 'VIDEO') {
            lastUserInteraction = Date.now();
        }
    }, true);

    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
            lastUserInteraction = Date.now();
        }
    }, true);

    Object.defineProperty(document, 'hidden', {
        get: function() { return false; }
    });
    Object.defineProperty(document, 'visibilityState', {
        get: function() { return 'visible'; }
    });

    setInterval(function() {
        const video = document.querySelector('video');
        if (video && video.paused && !video.ended) {
            const timeSinceInteraction = Date.now() - lastUserInteraction;
            
            if (timeSinceInteraction < 1500) {
                return;
            }
            
            video.play();
        }
    }, 1000);

    window.addEventListener('blur', function(e) {
        e.stopImmediatePropagation();
    }, true);

    document.addEventListener('visibilitychange', function(e) {
        e.stopImmediatePropagation();
    }, true);
})();

