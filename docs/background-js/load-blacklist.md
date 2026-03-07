---
title: Load Blacklist
layout: default
parent: background.js
nav_order: 3
---

# loadBlackList()

```javascript
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
```

This function runs **once when the extension starts**. It reads `blacklist.json` from inside the extension folder and fills the `blacklist` array with domain names.

---

## Line by line

```javascript
async function loadBlackList() {
```
`async` means this function can do things that take time (like reading a file) without freezing everything else. It can use `await` inside.

```javascript
const response = await fetch("blacklist.json");
```
Reads the `blacklist.json` file bundled inside your extension. `await` means "wait here until the file is fully read before moving on."

```javascript
const data = await response.json();
```
Converts the raw file text into a JavaScript object so we can access its contents like `data.domains`.

```javascript
blacklist = data.domains;
```
Pulls out just the array of domain names and saves it to the global `blacklist` variable. Your JSON file should look like:

```json
{
  "domains": [
    "evil.com",
    "phishing-site.net"
  ]
}
```

```javascript
console.log("Knight: BlackList Loaded", blacklist.length, "Domains");
```
Logs a message to the browser console confirming how many domains were loaded. Useful for debugging.

---

## The catch block

```javascript
catch (error) {
    console.error("Knight: Failed to load blacklist", error)
    blacklist = []
}
```

If anything goes wrong (file is missing, JSON is malformed, etc.), the `catch` block runs instead of crashing the extension. It logs the error and sets `blacklist` to an empty array so the extension keeps running — just with no domains to block.

{: .note }
> `try/catch` is a safety net. The code inside `try` is the "attempt", and `catch` is the "fallback if it fails."
