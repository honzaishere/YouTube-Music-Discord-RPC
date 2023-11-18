const {get, set} = require("../../../../../database/PluginManager");

module.exports.load = (window) => {
    window.on("restore", () => {
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.remove("video-disable-performance") }`)
        window.webContents.executeJavaScript(`document.querySelector("body").classList.remove("gamer-mode")`)
        if (get("gamer-mode") === true) {
            set("color-changer", true)
        }
    })
}