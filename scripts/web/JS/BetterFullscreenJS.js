module.exports.load = (window) => {
    window.webContents.executeJavaScript(`document.querySelector("#layout").setAttribute("disable-better-fullscreen", "")`)
}