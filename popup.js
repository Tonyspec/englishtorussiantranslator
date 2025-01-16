let isTranslationActive = true;

document.getElementById('toggle').addEventListener('click', function() {
    isTranslationActive = !isTranslationActive;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {active: isTranslationActive});
    });
    this.textContent = isTranslationActive ? 'Disable Translation' : 'Enable Translation';
});

// Send the current state to the content script when the popup opens
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {active: isTranslationActive});
});