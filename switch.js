document.querySelector('.switch--container').onclick = () => {
    let ele = document.querySelector('.switch--container');
    let eleSpan = document.querySelector('.switch--container .switch--status');
    let eleStick = document.querySelector('.switch--container .switch--stick');
    let eleBall = document.querySelector('.switch--container .switch--ball');

    if (ele.classList.contains('on')) {
        eleSpan.textContent = "OFF";

        ele.classList.toggle('on');
        ele.classList.toggle('off');
        eleStick.classList.toggle('off--stick');
        eleStick.classList.toggle('on--stick');
        eleBall.classList.toggle('off--ball');
        eleBall.classList.toggle('on--ball');
    } else {
        eleSpan.textContent = "ON";

        ele.classList.toggle('on');
        ele.classList.toggle('off');
        eleStick.classList.toggle('off--stick');
        eleStick.classList.toggle('on--stick');
        eleBall.classList.toggle('off--ball');
        eleBall.classList.toggle('on--ball');
    }

}