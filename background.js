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
        blacklist = data.domains; // extract domains
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
        // Disects url and extract hostnames then remove the www. part
        return blacklist.some(domain => hostname === domain || hostname.endsWith("." + domain));
        // iterate over every domains and check if its in blacklist or is a subdomain of blacklisted
    }
    catch (error) {
        return false
    }
}

//navigation listener
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.frameId !== 0) return;
    console.log("Knight: isEnabled is", isEnabled);
    if (!isEnabled) {
        console.log("Knight: protection is off, allowing URL");
        return;
    }
    if (isBlacklisted(details.url)) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(details.url)
        // change current tab to blocked.html and encode the phishing url
        });
    }
});

//message Listener
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
