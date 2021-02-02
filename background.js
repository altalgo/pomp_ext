chrome.runtime.onMessage.addListener(
    function (req, sender, res) {
        if (req.msg == "openLogin") {
            chrome.windows.create({
                // url: chrome.runtime.getURL("https://naver.com"),
                url: "https://pomp.leed.at/extlogin",
                type: "popup",
                height: 800,
                width: 580
            }, function (win) {
            });
        } else if (req.msg == "loginedLocal") {
            chrome.storage.local.set({ uuid: req.uuid, switch: true }, (result) => { });
            chrome.browserAction.setPopup({
                popup: chrome.extension.getURL('index.html')
            }, function (tab) {

            });
            res.msg = "receivedLocal";
        } else if (req.msg === "postHTML") {
            // console.log('received postHTML msg');
            postHTML(req.link);
        }
    }
);

chrome.runtime.onMessageExternal.addListener(
    function (req, sender, res) {
        // uuid 저장
        if (req.msg == "loginedGoogle") {
            console.log('loginedGoogle')
            chrome.storage.local.set({ uuid: req.uuid, switch: true }, (result) => { });
            chrome.runtime.sendMessage({ msg: "reloadPopup" })
            chrome.browserAction.setPopup({
                popup: chrome.extension.getURL('index.html')
            });
        } else if (req.msg === "loginedKakao") {
            chrome.storage.local.set({ uuid: req.uuid, switch: true }, (result) => { });
            chrome.runtime.sendMessage({ msg: "reloadPopup" })
            chrome.browserAction.setPopup({
                popup: chrome.extension.getURL('index.html')
            });

        } else if (req.msg === "loginedLocal") {
            chrome.storage.local.set({ uuid: req.uuid, switch: true }, (result) => { });

            chrome.runtime.sendMessage({ msg: "reloadPopup" })
            chrome.browserAction.setPopup({
                popup: chrome.extension.getURL('index.html')
            });
        } else if (req.msg === "logoutBrowser") {
            chrome.storage.local.clear(function () {
                const error = chrome.runtime.lastError;
                if (error) {
                    console.error(error);
                }
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

function postHTML(href) {

    let formKey = href.split('/')[href.split('/').length - 2];
    let toSendKey;
    // 현재 FORM에 해당하는 HTML의 key만 가져옴
    chrome.storage.local.get(null, function (items) {
        toSendKey = new Array(Object.keys(items).length);
        Object.keys(items).filter((val, idx) => {
            if (val.indexOf(formKey) !== -1) {
                toSendKey[idx] = 1;
            }
        })
    })

    // 현재 FORM에 해당하는 HTML의 value와 uuid 가져옴
    let toSendVal = {}, uuid;
    chrome.storage.local.get(null, async function (items) {
        uuid = items.uuid;
        Object.values(items).map((val, idx) => {
            if (toSendKey[idx] === 1) {
                toSendVal[idx] = val;
            }
        })
    })

    // 서버로 전송
    setTimeout(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://leed.at:3003/get');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            // location.href = xhr.responseText;
            // $.redirect('../register', xhr.response);
        };
        try {
            xhr.send(JSON.stringify({
                uuid: uuid,
                formUrl: href,
                question: toSendVal
            }));
        } catch (err) {
            alert(err)
        }
    }, 2000)
}