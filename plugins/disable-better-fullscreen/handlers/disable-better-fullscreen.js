const {get, set} = require("../../../scripts/database/PluginManager");
const { browserWindow } = require("../../../Index")

module.exports = () => {
    if (get("disable-better-fullscreen") === true) {
        set("disable-better-fullscreen", false)
        browserWindow.webContents.executeJavaScript(`document.querySelector("ytmusic-app-layout").removeAttribute("disable-better-fullscreen")`)
    } else {
        set("disable-better-fullscreen", true)
        browserWindow.webContents.executeJavaScript(`document.querySelector("ytmusic-app-layout").setAttribute("disable-better-fullscreen", "")`)
    }
}