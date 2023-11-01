const {get, set} = require("../../scripts/database/PluginManager")
const path = require("path");

module.exports.plugin = {
    name: "Ad Blocker"
}

module.exports.handle = () => {
    const {browserWindow} = require("../../Index")
    if (get("adblocker") === true) {
        set("adblocker", false)
        const electron = require("electron")
        electron.dialog.showMessageBox({title: "YouTube Music", message: "Please reload the app to disable adBlocker.", icon: path.join(__dirname, "..", "..", "icons", "tray.png")})
    } else {
        set("adblocker", true)
        this.load(browserWindow)
        const electron = require("electron")
        electron.dialog.showMessageBox({title: "YouTube Music", message: "Please reload the app to enable adBlocker.", icon: path.join(__dirname, "..", "..", "icons", "tray.png")})
    }
}

module.exports.preload = (window) => {
    if (get("adblocker") === true) {
        this.load(window)
    } else {
        return
    }
}

module.exports.disable = () => {
    return
}

module.exports.enable = () => {
    return
}

module.exports.load = (window) => {
    const {ElectronBlocker} = require('@cliqz/adblocker-electron')
    const {fetch} = require("node-fetch")
    const fs = require("fs/promises")
    const blocker = ElectronBlocker.fromPrebuiltAdsAndTracking(fetch, {
        path: 'adblocker.bin',
        read: fs.readFile,
        write: fs.writeFile,
    }).then((blocker) => {
        blocker.enableBlockingInSession(window.webContents.session);
        console.log(`[AdBlocker] BlockingInSession from PrebuiltAdsAndTracking enabled.`)
    })
}