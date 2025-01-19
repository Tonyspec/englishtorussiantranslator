document.addEventListener('DOMContentLoaded', function() {
    // Function to check if translation is active
    function checkTranslationStatus() {
        chrome.storage.local.get(['transcriptionActive'], function(result) {
            let status = result.transcriptionActive ? "ON" : "OFF";
            document.getElementById('status').textContent = `Translation is ${status}`;
        });
    }

    // Event listener for the toggle button
    document.getElementById('toggle').addEventListener('click', function() {
        chrome.storage.local.get(['translationActive'], function(result) {
            let newStatus = !result.transcriptionActive;
            chrome.storage.local.set({transcriptionActive: newStatus}, function() {
                checkTranslationStatus();
                // Notify content script of status change
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "toggleTranslation", value: newStatus});
                });
            });
        });
    });

    // Initial status check when popup loads
    checkTranslationStatus();
});