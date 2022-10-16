module.exports.navigatePageBack = () => {
    const { ipcMain } = require("electron")
    const { browserWindow } = require("../../Index")
    const { log } = require("../logger")

    log(`navigatePageBack: Event loaded`)
    ipcMain.on("navigate-page-back", () => {
        log(`navigatePageBack: Caught "navigate-page-back" request`)
        if (browserWindow.webContents.canGoBack() == true) {
            browserWindow.webContents.goBack()
            log(`navigatePageBack: Gone back`)
        }
    })
}