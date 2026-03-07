---
title: Home
layout: home
nav_order: 1
---

# Knight Extension Docs

Knight is a Chrome extension that silently watches every page you visit and blocks known phishing and malicious domains before the page even loads.

---

## How it works

1. On startup, Knight loads a list of dangerous domains from `blacklist.json`
2. Every time you navigate to a URL, it checks the domain against the list
3. If the domain is blacklisted — you get redirected to a safe block page instead
4. You can toggle protection ON/OFF from the extension popup at any time

---

## Files in this extension

| File | What it does |
|---|---|
| `background.js` | The brain — runs silently in the background |
| `blacklist.json` | The list of dangerous domains to block |
| `blocked.html` | The page shown when a site is blocked |
| `popup.html` | The UI when you click the extension icon |

---

## Quick links

- [background.js breakdown](./background-js/)
- [State Variables](./background-js/state-variables/)
- [Keep Alive](./background-js/keep-alive/)
- [Load Blacklist](./background-js/load-blacklist/)
- [isBlacklisted function](./background-js/is-blacklisted/)
- [Navigation Listener](./background-js/navigation-listener/)
- [Message Listener](./background-js/message-listener/)
