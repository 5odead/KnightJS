let blacklist = [];
// empty start

async function loadBlackList() {
    try {
        const response = await fetch("blacklist.json");
        const data = await response.json();
        blacklist = data.domains;
// extract domains
        console.log("Knight: BlackList Loaded", blacklist.length, "Domains");
    }
    catch (error) {
        console.error("Knight: Failed to load blacklist", error)
        blacklist = []
    }
}

loadBlackList();

function isBlacklisted(url) {
    try {
        const hostname = new URL(url).hostname.replace("www.","");
// Disects url and extract hostnames then remove the www. part
        return blacklist.some(domain => hostname === domain || hostname.endsWith("." + domain));
// iterate over every domains and check if its in blacklist or is a subdomain of blacklisted
    }
    catch (error) {
        return false
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
// chrome api with event
    if (details.frameId !== 0) return;

    if (isBlacklisted(details.url)) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(details.url)
// change current tab to blocked.html and encode the phishing url
        });
    }
});
