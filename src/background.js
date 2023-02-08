chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({ url: 'index.html' });
});
chrome.declarativeNetRequest.updateDynamicRules(
    {
        addRules: [{
            "id": 1,
            "priority": 1,
            "action": {
                type: 'modifyHeaders',
                requestHeaders: [
                    { header: 'origin', operation: 'set', value: "https://www.facebook.com" }
                ],
            },
            "condition": { "urlFilter": "facebook.com", "resourceTypes": ["xmlhttprequest"] }
        }
        ],
        removeRuleIds: [1]
    },
)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
    if (changeInfo.url.indexOf("https://www.facebook.com/connect/login_success.html") == 0) {
        var params = changeInfo.url.split("#")[1];
        var accessToken = params.split("&")[0].replace("access_token=", "");
        console.log(accessToken)
    }
    if (changeInfo.url.indexOf("http://dev-1.primedistribution.asia") >= 0) {
        chrome.scripting
            .registerContentScripts([{
                id: "session-script",
                js: ["src/scripts/subscription.js"],
                matches: ["*://dev-1.primedistribution.asia/*"]
            }])
            .then(() => console.log("registration complete"))
            .catch((err) => console.warn("unexpected error", err))
    }
})
chrome.runtime.onMessage.addListener((message, sender, response) => {
    switch (message.type) {
        case "CHECK_FB_LOGIN":
            try {
                fetch('https://mbasic.facebook.com')
                    .then((response) => response.text())
                    .then((data) => {
                        response(data)
                    });
            } catch (error) {}
            break;
        case "GET_LIST_POST":
            try {
                const formData = new FormData()
                formData.append("fb_dtsg", "NAcPi4TdMZe7qzRZXrfojOJgN9V4TWC4pK4qyz7cpe2NXKrr0rKBhCw:15:1675220164")
                formData.append("variables", JSON.stringify({"count":8,"cursor":null,"imageSize":128,"pageID":"104477239232466","sortBy":{"direction":"DESC","event":"CREATE","metric":"TIME"},"timeRange":{"type":"LAST_28D"}}))
                formData.append("doc_id", "5730078257046869")
                fetch('https://www.facebook.com/api/graphql/', {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => response.json())
                    .then((data) => {
                        response(data)
                    });
            } catch (error) {}
            break;
        case "GET_POST_DETAIL":
            try {
                const formData = new FormData()
                formData.append("fb_dtsg", "NAcNU_LXtn7I5xcjF3JOGp4HWCe-EDMb210l1m_OUcG7etOpUb10mgQ:15:1675220164")
                formData.append("variables", JSON.stringify({"storyID":"UzpfSTEwMDA4NjM0NDYxNDIxMjoxNTQxODc5Mzc0NjkzNTk6MTU0MTg3OTM3NDY5MzU5"}))
                formData.append("doc_id", "6581710508523557")
                fetch('https://www.facebook.com/api/graphql/', {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => response.json())
                    .then((data) => {
                        response(data)
                    });
            } catch (error) {}
            break;
        case "SUBSCRIPTION":
            chrome.tabs.create({ url: 'http://dev-1.primedistribution.asia' })
            break;
        default:
            break;
    }
    return true;
});

