const {handleURLChange} = require("../../windowManager");

module.exports.load = (window) => {
    window.webContents.on("did-start-navigation", (e, url) => {
        handleURLChange(window, url)
    })
}