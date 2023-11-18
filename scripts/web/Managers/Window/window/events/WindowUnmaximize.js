module.exports.load = (window) => {
    window.on("unmaximize", () => {
        window.webContents.executeJavaScript(`document.body.classList.remove('maximized')`);
        window.webContents.executeJavaScript(`document.querySelector("ytmusic-app-layout").setAttribute("not-maximized", "")`)
    })
}