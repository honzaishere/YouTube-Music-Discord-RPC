module.exports.titlebarControls = () => {
    const { ipcMain, app } = require("electron")
    const { browserWindow } = require("../../Index")
    const { log } = require("../logger")

    log(`titlebarControls: Event loaded`)
    ipcMain.on("minimize", () => {
        browserWindow.minimize()
    })

    ipcMain.on("maximize", () => {
        browserWindow.maximize()
    })

    ipcMain.on("restore", () => {
        browserWindow.unmaximize()
    })

    ipcMain.on("close", () => {
        app.quit()
    })

    function handler() {
        if (browserWindow.isMaximized()) {
            browserWindow.webContents.executeJavaScript(`document.body.classList.add('maximized')`);
        } else {
            browserWindow.webContents.executeJavaScript(`document.body.classList.remove('maximized')`);
        }
    }

    browserWindow.on("maximize", () => {
        handler()
    })

    browserWindow.on("unmaximize", () => {
        handler()
    })
}