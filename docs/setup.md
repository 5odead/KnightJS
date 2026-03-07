---
title: Setup Guide
layout: default
nav_order: 3
---

# Setting up GitHub Pages

Follow these steps to get your documentation site live.

---

## Step 1 — Add the docs folder to your repo

Copy the entire `docs/` folder into the root of your `KnightJS` repo. Your repo should look like:

```
KnightJS/
├── docs/              ← add this whole folder
│   ├── _config.yml
│   ├── index.md
│   ├── background-js.md
│   └── background-js/
│       ├── state-variables.md
│       ├── keep-alive.md
│       ├── load-blacklist.md
│       ├── is-blacklisted.md
│       ├── navigation-listener.md
│       └── message-listener.md
├── background.js
├── blacklist.json
├── manifest.json
└── ...
```

---

## Step 2 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Set branch to `main`, folder to `/docs`
6. Click **Save**

---

## Step 3 — Wait ~2 minutes

GitHub will build and deploy your site. Once done, it will show you the URL at the top of the Pages settings — it will look like:

```
https://5odead.github.io/KnightJS/
```

That's it. Your docs are live. ✅

---

## Updating the docs

To update any page, just edit the `.md` file and push to GitHub. The site rebuilds automatically within a minute or two.

{: .note }
> Markdown is very simple — it's just text with some formatting symbols. `**bold**`, `# Heading`, ` ```code``` `. You don't need to know HTML.
