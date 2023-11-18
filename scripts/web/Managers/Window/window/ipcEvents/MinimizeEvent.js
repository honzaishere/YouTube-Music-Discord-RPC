const {get, set} = require("../../../../../database/PluginManager");

module.exports.load = (ipcMain, window) => {
    ipcMain.on("minimize", () => {
        window.minimize()
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.add("video-disable-performance") }`)
        window.webContents.executeJavaScript(`document.querySelector("body").classList.add("gamer-mode")`)
        if (get("gamer-mode") === true) {
            set("color-changer", false)
        }
    })
}