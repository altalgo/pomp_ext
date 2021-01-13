// local에서 false인지 true인지 받아오기
chrome.storage.local.get('switch', (data) => {
    // 스위치가 꺼져있으면 아무것도 하지 않음
    if (!data.switch) return;

    if (document.querySelectorAll('.freebirdFormviewerViewNavigationNoSubmitButton').length == 2)
        // 이전 다음
        document.querySelectorAll('.freebirdFormviewerViewNavigationNoSubmitButton').forEach((ele, idx) => {
            if (idx == 0) {
                ele.onclick = () => {
                    chrome.storage.local.set({
                        ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                    }, () => {

                    });

                    alert('going back')
                }
                ele.addEventListener('keyup', (e) => {
                    // Enter 키나 Space 키 눌릴 때
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        chrome.storage.local.set({
                            ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                        }, () => {

                        });
                        alert('going back')
                    }
                })
            } else {
                ele.onclick = () => {
                    chrome.storage.local.set({
                        ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                    }, () => {

                    });

                    alert('going next')
                }
                ele.addEventListener('keyup', (e) => {
                    // Enter 키나 Space 키 눌릴 때
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        chrome.storage.local.set({
                            ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                        }, () => {

                        });
                        alert('going next')
                    }
                })
            }
        })
    else if (!document.querySelector('.appsMaterialWizButtonPaperbuttonFilled')) {
        // 첫 페이지 다음
        document.querySelector('.freebirdFormviewerViewNavigationNoSubmitButton').onclick = () => {
            chrome.storage.local.set({
                ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
            }, () => {

            });
            alert('going next')
        }
        document.querySelector('.freebirdFormviewerViewNavigationNoSubmitButton').addEventListener('keyup', (e) => {
            // Enter 키나 Space 키 눌릴 때
            if (e.keyCode === 13 || e.keyCode === 32) {
                chrome.storage.local.set({
                    ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                }, () => {

                });
                alert('going next')
            }
        })
    }
    else if (!document.querySelector('.freebirdFormviewerViewNavigationNoSubmitButton') && document.querySelector('.appsMaterialWizButtonPaperbuttonFilled')) {
        document.querySelector('.appsMaterialWizButtonPaperbuttonFilled').onclick = () => {
            // "https://drive.google.com/u/0/uc?id=" + getParam(document.querySelector('.freebirdMaterialWidgetsChipChip').getAttribute('data-view-file-link'), 'id') + "&export=download"

            chrome.storage.local.set({
                ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
            }, () => {

            });

            let formKey = document.location.href.split('/')[document.location.href.split('/').length - 2];
            let toSendKey;
            chrome.storage.local.get(null, function (items) {
                toSendKey = new Array(Object.keys(items).length);

                Object.keys(items).filter((val, idx) => {
                    if (val.indexOf(formKey) !== -1) {
                        toSendKey[idx] = 1;
                    }
                })
            })

            let toSendVal = {}, uuid;
            chrome.storage.local.get(null, function (items) {
                // uuid 저장
                uuid = items.uuid;

                Object.values(items).map((val, idx) => {
                    if (toSendKey[idx] === 1) {
                        toSendVal[idx] = val;
                    }
                })
            })
            alert('submit');
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
            });
        }
        document.querySelector('.appsMaterialWizButtonPaperbuttonFilled').addEventListener('keyup', (e) => {
            // Enter 키나 Space 키 눌릴 때
            if (e.keyCode === 13 || e.keyCode === 32) {
                chrome.storage.local.set({
                    ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                }, () => {

                });

                let formKey = document.location.href.split('/')[document.location.href.split('/').length - 2];
                let toSendKey;
                chrome.storage.local.get(null, function (items) {
                    toSendKey = new Array(Object.keys(items).length);

                    Object.keys(items).filter((val, idx) => {
                        if (val.indexOf(formKey) !== -1) {
                            toSendKey[idx] = 1;
                        }
                    })
                })

                let toSendVal = {}, uuid;
                chrome.storage.local.get(null, function (items) {
                    // uuid 저장
                    uuid = items.uuid;

                    Object.values(items).map((val, idx) => {
                        if (toSendKey[idx] === 1) {
                            toSendVal[idx] = val;
                        }
                    })
                })
                console.log(toSendKey, toSendVal);
                alert('submit');
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
    } else {
        // 이전 제출
        document.querySelector('.freebirdFormviewerViewNavigationNoSubmitButton').onclick = () => {
            chrome.storage.local.set({
                ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
            }, () => {

            });

            alert('going back')
        }
        document.querySelector('.appsMaterialWizButtonPaperbuttonFilled').onclick = () => {

            // "https://drive.google.com/u/0/uc?id=" + getParam(document.querySelector('.freebirdMaterialWidgetsChipChip').getAttribute('data-view-file-link'), 'id') + "&export=download"

            chrome.storage.local.set({
                ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
            }, () => {

            });

            let formKey = document.location.href.split('/')[document.location.href.split('/').length - 2];
            let toSendKey;
            chrome.storage.local.get(null, function (items) {
                toSendKey = new Array(Object.keys(items).length);

                Object.keys(items).filter((val, idx) => {
                    if (val.indexOf(formKey) !== -1) {
                        toSendKey[idx] = 1;
                    }
                })
            })

            let toSendVal = {}, uuid, cnt = 0;
            chrome.storage.local.get(null, function (items) {
                // uuid 저장
                uuid = items.uuid;

                Object.values(items).map((val, idx) => {
                    if (toSendKey[idx] === 1) {
                        toSendVal[cnt++] = val;
                    }
                })
            })
            alert('submit');
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
            });
        }

        document.querySelector('.freebirdFormviewerViewNavigationNoSubmitButton').addEventListener('keyup', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                chrome.storage.local.set({
                    ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                }, () => {

                });

                alert('going back')
            }
        });
        document.querySelector('.appsMaterialWizButtonPaperbuttonFilled').addEventListener('keyup', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                chrome.storage.local.set({
                    ["docs-" + document.location.href.split('/')[document.location.href.split('/').length - 2] + "-" + document.getElementsByName('pageHistory')[0].value]: document.querySelector('body').outerHTML
                }, () => {

                });

                let formKey = document.location.href.split('/')[document.location.href.split('/').length - 2];
                let toSendKey;
                chrome.storage.local.get(null, function (items) {
                    toSendKey = new Array(Object.keys(items).length);

                    Object.keys(items).filter((val, idx) => {
                        if (val.indexOf(formKey) !== -1) {
                            toSendKey[idx] = 1;
                        }
                    })
                })

                let toSendVal = {}, uuid;
                chrome.storage.local.get(null, function (items) {
                    // uuid 저장
                    uuid = items.uuid;

                    Object.values(items).map((val, idx) => {
                        if (toSendKey[idx] === 1) {
                            toSendVal[idx] = val;
                        }
                    })
                })
                alert('submit');
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
    }

});