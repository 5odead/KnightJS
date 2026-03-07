---
title: Message Listener
layout: default
parent: background.js
nav_order: 6
---

# Message Listener

```javascript
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.action === "setEnabled") {
        isEnabled = message.value;
        console.log("Knight: isEnabled set to", isEnabled);
    }
    if (message.action === "isBlacklisted") {
        const result = isBlacklisted(message.url);
        sendResponse({ result: result });
    }
    return true;
});
```

This allows other parts of your extension — like the **popup UI** (what appears when you click the Knight icon) — to send commands and questions to this background script.

Think of it as a walkie-talkie: the popup talks, the background listens and responds.

---

## Supported messages

### `setEnabled` — Toggle protection on/off

```javascript
if (message.action === "setEnabled") {
    isEnabled = message.value;
}
```

The popup sends this when the user flips the toggle switch. `message.value` is either `true` or `false`.

**Example message sent by popup:**
```javascript
chrome.runtime.sendMessage({ action: "setEnabled", value: false });
```

This sets `isEnabled = false` in the background, disabling all blocking.

---

### `isBlacklisted` — Check if a URL is blocked

```javascript
if (message.action === "isBlacklisted") {
    const result = isBlacklisted(message.url);
    sendResponse({ result: result });
}
```

The popup can ask "is the current tab's URL dangerous?". The background checks and sends back the answer.

**Example message sent by popup:**
```javascript
chrome.runtime.sendMessage(
    { action: "isBlacklisted", url: "https://evil.com" },
    function(response) {
        console.log(response.result); // true or false
    }
);
```

---

## Why `return true`?

```javascript
return true;
```

This is **required**. Without it, Chrome closes the message channel before `sendResponse` can be called. Returning `true` tells Chrome: "keep this channel open, I'll respond asynchronously."

{: .warning }
> Removing `return true` would break the `isBlacklisted` check — the popup would never receive a response and would hang or error out.

---

## Summary

| `message.action` | What it does | Sends response? |
|---|---|---|
| `setEnabled` | Turns blocking ON or OFF | No |
| `isBlacklisted` | Checks if a URL is dangerous | Yes — `{ result: true/false }` |
