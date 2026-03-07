---
title: Keep Alive
layout: default
parent: background.js
nav_order: 2
---

# Keep Service Worker Alive

```javascript
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20000);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();
```

---

## The problem

Chrome extensions run their background logic inside something called a **Service Worker**. Chrome is aggressive about shutting these down after ~30 seconds of inactivity to save memory and battery.

If the Service Worker dies, Knight stops watching URLs — meaning phishing sites could slip through.

---

## The fix

This code keeps the Service Worker awake by doing a tiny harmless thing every 20 seconds.

### Line by line

```javascript
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20000);
```
Defines a function called `keepAlive`. When called, it starts a repeating timer that fires every **20,000 milliseconds (20 seconds)**. Each tick calls `chrome.runtime.getPlatformInfo` — which just asks Chrome "what OS am I running on?". It does nothing useful, but it counts as activity, keeping the worker alive.

```javascript
chrome.runtime.onStartup.addListener(keepAlive);
```
Tells Chrome: "Every time the browser starts up, run `keepAlive` again." This ensures the heartbeat is restarted after a full browser restart.

```javascript
keepAlive();
```
Runs `keepAlive` right now immediately — not waiting for a restart event.

---

{: .warning }
> Without this code, Knight would silently stop working after ~30 seconds of you not browsing anywhere. You'd think you're protected but you wouldn't be.
