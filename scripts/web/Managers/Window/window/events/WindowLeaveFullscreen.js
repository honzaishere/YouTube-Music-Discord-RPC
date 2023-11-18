module.exports.load = (window) => {
    window.on("leave-full-screen", () => {
        window.webContents.executeJavaScript("document.querySelector('#titlebar').classList.remove('hidden')")
    })
}