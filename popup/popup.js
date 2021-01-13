chrome.runtime.onMessage.addListener(
    (req, sender, res) => {
        if (req.msg == "loginedGoogle") {
            alert('google success')
        } else if (req.msg == "loginedKakao") {
            alert('kakao success')
        } else if (req.msg == "loginedLocal") {
            alert('local success')
        } else if (req.msg == "msg") {
            console.log(req.content);
        } else if (req.msg == "reloadPopup") {
            location.reload();
        }
    }
)

document.querySelector('.logout').onclick = () => {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pompserver.leed.at/api/auth/logout');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (res) {
        console.log(res);
        alert('logout success');
    };
    xhr.send('');
    // window.close();
    // 하 ..
    chrome.runtime.reload();
}
chrome.storage.local.get('uuid', (data) => {
    console.log('uuid : ', data.uuid);
    if (data.uuid) {
        document.querySelector('.login').classList.remove('show')
        document.querySelector('.login').classList.add('hide')
        document.querySelector('.logout').classList.add('show')
        document.querySelector('.logout').classList.remove('hide')
        document.querySelector('.switch--container').classList.add('show')
        document.querySelector('.switch--container').classList.remove('hide')
    } else {
        document.querySelector('.login').classList.add('show')
        document.querySelector('.login').classList.remove('hide')
        document.querySelector('.logout').classList.remove('show')
        document.querySelector('.logout').classList.add('hide')
        document.querySelector('.switch--container').classList.remove('show')
        document.querySelector('.switch--container').classList.add('hide')
    }
})
document.querySelector('.login').onclick = () => {
    chrome.runtime.sendMessage({ msg: "openLogin" })
}