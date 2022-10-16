const { log } = require("../../Scripts/logger")
const { ipcRenderer } = require("electron")

module.exports.waitForSettingsOpen = () => {
    const menuButton = document.querySelector("#right-content > ytmusic-settings-button")
    menuButton.onclick = () => {
        ipcRenderer.send("show-menu")
    }
}