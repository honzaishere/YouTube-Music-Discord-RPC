module.exports.load = (ipcMain, window) => {
    ipcMain.on("maximize", () => {
        window.maximize()
        window.webContents.executeJavaScript(`document.body.classList.add('maximized')`);
        window.webContents.executeJavaScript(`document.querySelector("ytmusic-app-layout").removeAttribute("not-maximized")`)
    })
}