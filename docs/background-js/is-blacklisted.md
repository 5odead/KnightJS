---
title: isBlacklisted()
layout: default
parent: background.js
nav_order: 4
---

# isBlacklisted(url)

```javascript
function isBlacklisted(url) {
    try {
        const hostname = new URL(url).hostname.replace("www.","");
        return blacklist.some(domain => hostname === domain || hostname.endsWith("." + domain));
    }
    catch (error) {
        return false
    }
}
```

Takes a full URL and returns `true` if it's dangerous, `false` if it's safe.

---

## What it does step by step

### Step 1 — Extract the hostname

```javascript
const hostname = new URL(url).hostname.replace("www.","");
```

`new URL(url)` cracks the URL apart into pieces. `.hostname` grabs just the domain.

| Full URL | .hostname result | After .replace() |
|---|---|---|
| `https://www.evil.com/login` | `www.evil.com` | `evil.com` |
| `https://phishing.net/page` | `phishing.net` | `phishing.net` |
| `https://www.google.com` | `www.google.com` | `google.com` |

Removing `www.` makes matching simpler — you only need `evil.com` in the blacklist, not both `evil.com` and `www.evil.com`.

### Step 2 — Check against the blacklist

```javascript
return blacklist.some(domain => hostname === domain || hostname.endsWith("." + domain));
```

`.some()` goes through every domain in the blacklist and returns `true` the moment any check passes.

Two checks happen for each domain:

| Check | Example | What it catches |
|---|---|---|
| `hostname === domain` | `evil.com === evil.com` | Exact match |
| `hostname.endsWith("." + domain)` | `login.evil.com` ends with `.evil.com` | Subdomains |

The subdomain check is important — phishing sites often use subdomains like `secure.evil.com` or `login.evil.com` to look more legitimate.

---

## The catch block

```javascript
catch (error) {
    return false
}
```

If the URL is malformed or unparseable (e.g. `chrome://newtab`), `new URL()` will throw an error. The catch block handles this gracefully by returning `false` — treat it as safe rather than crashing.

---

## Example walkthrough

You visit `https://login.phishing-site.net/steal-creds`

1. `hostname` becomes `login.phishing-site.net`
2. `.some()` loops through the blacklist
3. It finds `phishing-site.net` in the list
4. `login.phishing-site.net`.endsWith(`.phishing-site.net`) → ✅ `true`
5. Function returns `true` → **blocked**
