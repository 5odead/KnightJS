---
title: Navigation Listener
layout: default
parent: background.js
nav_order: 5
---

# Navigation Listener

```javascript
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.frameId !== 0) return;
    console.log("Knight: isEnabled is", isEnabled);
    if (!isEnabled) {
        console.log("Knight: protection is off, allowing URL");
        return;
    }
    if (isBlacklisted(details.url)) {
        chrome.tabs.update(details.tabId, {
            url: chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(details.url)
        });
    }
});
```

This is the **most important part of the extension**. It fires every single time Chrome is about to navigate to any URL — and decides whether to allow or block it.

---

## How it works

### Gate 1 — Ignore sub-frames

```javascript
if (details.frameId !== 0) return;
```

Web pages often contain iframes — smaller embedded pages within a page (ads, YouTube videos, etc.). This line ignores all of those. `frameId === 0` means it's the **main page**, which is the only one we care about.

### Gate 2 — Check if protection is on

```javascript
if (!isEnabled) {
    console.log("Knight: protection is off, allowing URL");
    return;
}
```

If the user turned off protection from the popup, exit immediately and allow the navigation.

### Gate 3 — Check the blacklist

```javascript
if (isBlacklisted(details.url)) {
```

Calls the [isBlacklisted()](../is-blacklisted/) function. If it returns `true`, the site is dangerous.

### The block

```javascript
chrome.tabs.update(details.tabId, {
    url: chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(details.url)
});
```

Redirects the current tab to `blocked.html` before the dangerous page loads.

| Part | What it does |
|---|---|
| `chrome.tabs.update(details.tabId, ...)` | Changes the current tab's URL |
| `chrome.runtime.getURL("blocked.html")` | Gets the full path to your block page inside the extension |
| `+ "?url=" + encodeURIComponent(...)` | Attaches the dangerous URL as a query parameter so the block page can display it |

{: .note }
> `encodeURIComponent` converts special characters in the URL (like `://`, `?`, `=`) into safe encoded versions so they don't break the query string. For example `https://evil.com` becomes `https%3A%2F%2Fevil.com`.

---

## Decision flow

```
URL navigation detected
        │
        ▼
Is it a sub-frame? ──YES──► Ignore, do nothing
        │ NO
        ▼
Is isEnabled false? ──YES──► Allow navigation
        │ NO
        ▼
Is URL blacklisted? ──NO───► Allow navigation
        │ YES
        ▼
Redirect to blocked.html
```
