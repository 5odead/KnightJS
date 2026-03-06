const toggle = document.getElementById("toggle-knight");

toggle.addEventListener("change", function() {
    const isEnabled = toggle.checked;
    console.log("Toggle changed, isEnabled:", isEnabled);
    chrome.runtime.sendMessage({action: "setEnabled", value: isEnabled})
//send message about toggle state
    chrome.storage.local.set({ enabled: isEnabled});
})

chrome.storage.local.get("enabled", function(result) {
    toggle.checked = result.enabled !== false;
//check the toggle for its state if it it was nothing then set it as true
});
