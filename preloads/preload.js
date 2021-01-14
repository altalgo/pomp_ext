document.querySelectorAll('.appsMaterialWizButtonPaperbuttonFilled').forEach((ele, idx) => {
    chrome.storage.local.get('switch', (data) => {
        // 스위치가 꺼져있다면 return;
        if (!data.switch) return;
        // 클릭하면
        ele.onclick = () => {
            // 마지막 페이지 HTML 저장
            chrome.storage.local.set({
                ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
            });

            let formKey = document.location.href.split('/')[document.location.href.split('/').length - 2];
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
            chrome.storage.local.get(null, function (items) {
                uuid = items.uuid;
                Object.values(items).map((val, idx) => {
                    if (toSendKey[idx] === 1) {
                        toSendVal[idx] = val;
                    }
                })
            })
            alert("Save on Pomp")
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
                        question: toSendVal
                    }));
                } catch (err) {
                    alert(err)
                }
            })
        }

        // Enter 키나 Space 키 눌릴 때
        ele.addEventListener('keyup', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                // 마지막 페이지 HTML 저장
                chrome.storage.local.set({
                    ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                });

                let formKey = document.location.href.split('/')[document.location.href.split('/').length - 2];
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
                chrome.storage.local.get(null, function (items) {
                    uuid = items.uuid;
                    Object.values(items).map((val, idx) => {
                        if (toSendKey[idx] === 1) {
                            toSendVal[idx] = val;
                        }
                    })
                })
                alert("Save on Pomp")
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
                            question: toSendVal
                        }));
                    } catch (err) {
                        alert(err)
                    }
                })
            }
        })
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