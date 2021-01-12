chrome.runtime.sendMessage({ msg: "loadForms" }, (res) => {
    console.log('done')
})
