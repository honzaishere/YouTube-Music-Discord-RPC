module.exports.settingsOpen = () => {
    const { ipcMain } = require("electron")
    const { browserWindow } = require("../../Index")
    const { log } = require("../logger")

    log(`settingsOpen: Event loaded`)
    ipcMain.on("show-menu", () => {
        log(`settingsOpen: Caught "show-menu" request`)
    })
}