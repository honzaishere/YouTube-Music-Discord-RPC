const {get, set} = require("../../../scripts/database/PluginManager");
const path = require("path");

module.exports = () => {
    const {browserWindow} = require("../../../Index");
    if (get("adblocker") === true) {
        set("adblocker", false)
        const electron = require("electron")
        electron.dialog.showMessageBox({title: "YouTube Music", message: "Please reload the app to disable adBlocker.", icon: path.join(__dirname, "..", "..", "..", "..", "icons", "tray.png")})
    } else {
        set("adblocker", true)
        this.load(browserWindow)
        const electron = require("electron")
        electron.dialog.showMessageBox({title: "YouTube Music", message: "Please reload the app to enable adBlocker.", icon: path.join(__dirname, "..", "..", "..", "..", "icons", "tray.png")})
    }
}