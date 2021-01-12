chrome.runtime.onMessage.addListener(
    (req, sender, res) => {
        if (req.msg == "loginedGoogle") {
            alert('google success')
        } else if (req.msg == "loginedKakao") {
            alert('kakao success')
        } else if (req.msg == "loginedLocal") {
            alert('local success')
        } else if(req.msg == "msg"){
            console.log(req.content);
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