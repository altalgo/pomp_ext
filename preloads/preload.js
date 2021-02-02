document.querySelectorAll('.appsMaterialWizButtonPaperbuttonFilled').forEach((ele, idx) => {
    // 클릭하면
    ele.onclick = () => {
        chrome.storage.local.get(['switch', 'uuid'], (data) => {
            // 스위치가 꺼져있다면 return;
            if (!data.switch) return;

            // 마지막 페이지 HTML 저장
            chrome.storage.local.set({
                ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
            });
            
            // background에 post요청
            chrome.runtime.sendMessage({ msg: "postHTML", link: location.href })
        })
    }

    // Enter 키나 Space 키 눌릴 때
    ele.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            chrome.storage.local.get(['switch', 'uuid'], (data) => {
                // 스위치가 꺼져있다면 return;
                if (!data.switch) return;

                // 마지막 페이지 HTML 저장
                chrome.storage.local.set({
                    ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                });

                // background에 post요청
                chrome.runtime.sendMessage({ msg: "postHTML", link: location.href })
            })
        }
    })
});

document.querySelectorAll('.freebirdFormviewerViewNavigationNoSubmitButton').forEach((ele, idx) => {
    chrome.storage.local.get('switch', (data) => {
        // 스위치가 꺼져있다면 return;
        if (!data.switch) return;
        // 클릭하면 HTML 저장
        ele.onclick = () => {
            chrome.storage.local.set({
                ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
            });
        }
        // Enter 키나 Space 키 눌릴 때 HTML 저장
        ele.addEventListener('keyup', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                chrome.storage.local.set({
                    ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                });
            }
        })
    })
});