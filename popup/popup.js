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
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pompserver.leed.at/api/auth/logout');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (res) {
        console.log(res);
    };
    xhr.send('');
    // window.close();
    // 크롬 익스텐션 다시시작
    // chrome.runtime.reload();
    document.querySelector('.switch--container').classList.add('hide')
    document.querySelector('.switch--container').classList.remove('show')
    document.querySelector('.logout').classList.remove('show')
    document.querySelector('.logout').classList.add('hide')
    document.querySelector('.login').classList.add('show')
    document.querySelector('.login').classList.remove('hide')
}
chrome.storage.local.get(['uuid', 'switch'], (data) => {
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
    
    let eleSpan = document.querySelector('.switch--container .switch--status');
    if(data.switch){
        console.log('true!')
        eleSpan.textContent = "ON";
        document.querySelector('.switch--container').classList.remove('off');
        document.querySelector('.switch--container').classList.add('on');
        document.querySelector('.switch--stick').classList.add('on--stick');
        document.querySelector('.switch--ball').classList.add('on--ball');
        document.querySelector('.switch--stick').classList.remove('off--stick');
        document.querySelector('.switch--ball').classList.remove('off--ball');
    }else{
        console.log('false!')
        eleSpan.textContent = "OFF";
        document.querySelector('.switch--container').classList.add('off');
        document.querySelector('.switch--container').classList.remove('on');
        document.querySelector('.switch--stick').classList.remove('on--stick');
        document.querySelector('.switch--ball').classList.remove('on--ball');
        document.querySelector('.switch--stick').classList.add('off--stick');
        document.querySelector('.switch--ball').classList.add('off--ball');
    }
})
document.querySelector('.login').onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pompserver.leed.at/api/auth/chkiflogined');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (res) {
        console.log(res.currentTarget.response.uuid)
        const { uuid } = JSON.parse(res.currentTarget.response);
        if (uuid) {
            //지금 서버상으로는 로그인 상태
            chrome.storage.local.set({ uuid: uuid, switch: true }, (result) => { });
            document.querySelector('.login').classList.remove('show')
            document.querySelector('.login').classList.add('hide')
            document.querySelector('.logout').classList.add('show')
            document.querySelector('.logout').classList.remove('hide')
            document.querySelector('.switch--stick').classList.add('on--stick');
            document.querySelector('.switch--ball').classList.add('on--ball');
            document.querySelector('.switch--stick').classList.remove('off--stick');
            document.querySelector('.switch--ball').classList.remove('off--ball');
            document.querySelector('.switch--container').classList.add('show')
            document.querySelector('.switch--container').classList.remove('hide')
        } else {
            // 로그인 해야함
            chrome.runtime.sendMessage({ msg: "openLogin" })
        }
    };
    xhr.send('');
}

