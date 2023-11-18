const {get, set} = require("../../../../../database/PluginManager");

module.exports.load = (window) => {
    window.on("focus", () => {
        if (get("gamer-mode") === true) {
            window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.remove("video-disable-performance") }`)
            window.webContents.executeJavaScript(`document.querySelector("body").classList.remove("gamer-mode")`)
            set("color-changer", true)
        }
    })
}