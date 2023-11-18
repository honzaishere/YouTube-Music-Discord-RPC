module.exports = {
    handle: (setting) => {
        const PluginSetting = require("./handlers/" + setting)
        PluginSetting()
    },
    enable: () => {
        const electron = require("electron")
        const path = require("path");
        electron.dialog.showMessageBox({ title: "YouTube Music", message: "Relaunching of the app is recommended.", icon: path.join(__dirname, "..", "..", "icons", "tray.png") })
    },
    disable: () => {
        const electron = require("electron")
        const path = require("path");
        electron.dialog.showMessageBox({ title: "YouTube Music", message: "Relaunching of the app is recommended.", icon: path.join(__dirname, "..", "..", "icons", "tray.png") })
    },
    preload: () => {}
}