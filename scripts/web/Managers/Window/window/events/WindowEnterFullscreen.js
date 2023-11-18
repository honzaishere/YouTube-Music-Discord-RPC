module.exports.load = (window) => {
    window.on("enter-full-screen", () => {
        window.webContents.executeJavaScript("document.querySelector('#titlebar').classList.add('hidden')")
    })
}