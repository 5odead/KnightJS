---
title: background.js
layout: default
nav_order: 2
has_children: true
---

# background.js

This is the core file of the Knight extension. It runs silently in the background whenever Chrome is open — you never see it, but it's watching every URL you visit.

## Full source

```javascript
//state
let isEnabled = true;
let blacklist = [];

//keep Service Worker alive
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20000);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

//load blacklist
async function loadBlackList() {
    try {
        const response = await fetch("blacklist.json");
        const data = await response.json();
        blacklist = data.domains;
        console.log("Knight: BlackList Loaded", blacklist.length, "Domains");
    }
    catch (error) {
        console.error("Knight: Failed to load blacklist", error)
        blacklist = []
    }
}
loadBlackList();

//Check if URL is Blacklisted
function isBlacklisted(url) {
    try {
        const hostname = new URL(url).hostname.replace("www.","");
        return blacklist.some(domain => hostname === domain || hostname.endsWith("." + domain));
    }
    catch (error) {
        return false
    }
}

//navigation listener
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.frameId !== 0) return;
    if (!isEnabled) return;
    if (isBlacklisted(details.url)) {
        chrome.tabs.update(details.tabId, {
            url: chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(details.url)
        });
    }
});

//message Listener
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.action === "setEnabled") {
        isEnabled = message.value;
    }
    if (message.action === "isBlacklisted") {
        const result = isBlacklisted(message.url);
        sendResponse({ result: result });
    }
    return true;
});
```

## Sections

Browse each part of the file explained in plain English:

- [State Variables](./state-variables/) — the two memory slots
- [Keep Alive](./keep-alive/) — stops Chrome killing the extension
- [Load Blacklist](./load-blacklist/) — reads the blocked domains from file
- [isBlacklisted()](./is-blacklisted/) — checks if a URL is dangerous
- [Navigation Listener](./navigation-listener/) — the actual blocker
- [Message Listener](./message-listener/) — lets the popup talk to the background
