chrome.runtime.onMessage.addListener(
    function (req, sender, res) {
        if (req.msg == "loadForms") {
            chrome.tabs.executeScript({
                file: './toggleBodyClass.js'
            });
            res({ msg: "done" })
        }else if(req.msg == "openLogin"){
            chrome.windows.create({
                // url: chrome.runtime.getURL("https://naver.com"),
                url: "https://pomp.leed.at/extlogin",
                type: "popup",
                height: 800,
                width: 580
            }, function (win) {
            });
        }
    }
);

chrome.runtime.onMessageExternal.addListener(
    function (req, sender, res) {
        // uuid 저장
        if (req.msg == "loginedGoogle") {
            console.log('loginedGoogle')
            chrome.storage.local.set({ uuid: req.uuid }, (result) => { });
            chrome.browserAction.setPopup({
                popup: chrome.extension.getURL('index.html')
            }, function (tab) {

            });
        } else if (req.msg == "loginedKakao") {
            chrome.storage.local.set({ uuid: req.uuid }, (result) => { });
            chrome.browserAction.setPopup({
                popup: chrome.extension.getURL('index.html')
            }, function (tab) {

            });
        } else if (req.msg == "loginedLocal") {
            chrome.storage.local.set({ uuid: req.uuid }, (result) => { });
            chrome.browserAction.setPopup({
                popup: chrome.extension.getURL('index.html')
            }, function (tab) {

            });
        }
    }
);

// If you define default_popup, you can't have a listener for browserAction.onClicked
// The event browserAction.onClicked only fires, if no popup is defined for the browser action button. 
// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.windows.create({
//         // url: chrome.runtime.getURL("https://naver.com"),
//         url: "https://pomp.leed.at/extlogin",
//         type: "popup",
//         height: 800,
//         width: 580  
//     }, function (win) {
//     });
// });
// key.pem
// https://stackoverflow.com/questions/21497781/how-to-change-chrome-packaged-app-id-or-why-do-we-need-key-field-in-the-manifest/21500707#21500707