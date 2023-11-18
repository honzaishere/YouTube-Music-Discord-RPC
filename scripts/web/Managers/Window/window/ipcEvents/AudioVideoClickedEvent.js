module.exports.load = (ipcMain, window) => {
    ipcMain.on("av-clicked", (e, [args]) => {
        if (args === "audio") {
            if (window.isFullScreen()) {
                window.webContents.executeJavaScript(`
                    document.querySelector("#fullscreen-container").style.display = "block"
                ;0`)
            }
        }
        if (args === "video") {
            if (window.isFullScreen()) {
                window.webContents.executeJavaScript(`
                    document.querySelector("#fullscreen-container").style.display = "none"
                ;0`)
            }
        }
    })
}