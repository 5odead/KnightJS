---
title: State Variables
layout: default
parent: background.js
nav_order: 1
---

# State Variables

These two lines are the first thing in the file. They create the extension's "memory" — values that stay alive for as long as Chrome is running.

```javascript
let isEnabled = true;
let blacklist = [];
```

---

## isEnabled

```javascript
let isEnabled = true;
```

A simple **true/false switch** that controls whether Knight is actively blocking sites.

| Value | Meaning |
|---|---|
| `true` | Protection is ON — Knight will block dangerous sites |
| `false` | Protection is OFF — Knight lets everything through |

It starts as `true`, meaning protection is on by default the moment you install the extension. The popup toggle changes this value via a message (see [Message Listener](../message-listener/)).

---

## blacklist

```javascript
let blacklist = [];
```

An **empty array** (list) that will be filled with dangerous domain names once the extension loads. It starts empty because the domains haven't been read from the file yet.

After `loadBlackList()` runs, it looks something like:

```javascript
blacklist = ["evil.com", "phishing-site.net", "malware.xyz", ...]
```

Every time you visit a URL, Knight checks this list to decide whether to block you.

{: .note }
> `let` means these values can be changed later — which is exactly what happens when you toggle protection or when the blacklist loads.
