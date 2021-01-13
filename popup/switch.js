document.querySelector('.switch--container').onclick = () => {
    let ele = document.querySelector('.switch--container');
    let eleSpan = document.querySelector('.switch--container .switch--status');
    let eleStick = document.querySelector('.switch--container .switch--stick');
    let eleBall = document.querySelector('.switch--container .switch--ball');

    if (ele.classList.contains('on')) {
        console.log('on -> off')
        eleSpan.textContent = "OFF";
        chrome.storage.local.set({ switch: false }, (result) => { });
        ele.classList.toggle('on');
        ele.classList.toggle('off');
        eleStick.classList.toggle('off--stick');
        eleStick.classList.toggle('on--stick');
        eleBall.classList.toggle('off--ball');
        eleBall.classList.toggle('on--ball');
    } else {
        console.log('off -> on')
        eleSpan.textContent = "ON";
        chrome.storage.local.set({ switch: true }, (result) => { });
        ele.classList.toggle('on');
        ele.classList.toggle('off');
        eleStick.classList.toggle('off--stick');
        eleStick.classList.toggle('on--stick');
        eleBall.classList.toggle('off--ball');
        eleBall.classList.toggle('on--ball');
    }
    // background에 client에 hover event 발생시키라고 메세지
    
}
