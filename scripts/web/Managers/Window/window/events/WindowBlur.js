const {get, set} = require("../../../../../database/PluginManager");

module.exports.load = (window) => {
    window.on("blur", () => {
        if (get("gamer-mode") === true) {
            console.log(`[Window] Video is hidden now to increase performance`)
            window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.add("video-disable-performance") }`)
            window.webContents.executeJavaScript(`document.querySelector("body").classList.add("gamer-mode")`)
            set("color-changer", false)
        }
    })
}