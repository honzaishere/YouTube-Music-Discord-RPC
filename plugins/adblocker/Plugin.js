const {get, set} = require("../../scripts/database/PluginManager")

module.exports.plugin = {
    name: "Ad Blocker",
    options: [
        {
            label: "Enabled",
            type: "checkbox",
            checked: get("adblocker"),
            click: (item) => {
                const { browserWindow } = require("../../Index")
                if(item.checked) {
                    set("adblocker", true)
                    this.load(browserWindow)
                } else {
                    set("adblocker", false)
                    this.disable()
                    const electron = require("electron")
                    electron.dialog.showMessageBox({ title: "YouTube Music", message: "Please reload the app to enable adBlocker." })
                }
            }
        }
    ]
}

module.exports.preload = (window) => {
    if(get("adblocker") === true) {
        this.load(window)
    } else {
        return
    }
}

module.exports.disable = () => {
    const electron = require("electron")
    electron.dialog.showMessageBox({ title: "YouTube Music", message: "Please reload the app to disable adBlocker." })
}

module.exports.enable = () => { return }

module.exports.load = (window) => {
    const { ElectronBlocker } = require('@cliqz/adblocker-electron')
    const { fetch } = require("node-fetch")
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