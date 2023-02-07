chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({ url: 'index.html' });
});

chrome.runtime.onMessage.addListener((message, sender, response) => {
    switch (message.type) {
        case "CHECK_FB_LOGIN":
            try {
                fetch('https://mbasic.facebook.com')
                    .then((response) => response)
                    .then((data) => {
                        const reader = data.body.getReader().read().then((data) => {
                            console.log(data)
                        })
                    });
            } catch (error) {}
            break;
        default:
            break;
    }
    return true;
});

