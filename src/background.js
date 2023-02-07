chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({ url: '/' });
});
