const {get, set} = require("../../scripts/database/PluginManager");
module.exports.plugin = {
    name: "Premium Features",
}

module.exports.handle = () => {
    if (get("show-premium-tag") === false) {
        set("show-premium-tag", true)
        const electron = require("electron")
        electron.dialog.showMessageBox({ title: "YouTube Music", message: "Relaunching of the app is recommended." })
        return
    }
    if (get("show-premium-tag") === true) {
        set("show-premium-tag", false)
        const electron = require("electron")
        electron.dialog.showMessageBox({ title: "YouTube Music", message: "Relaunching of the app is recommended." })
    }
}