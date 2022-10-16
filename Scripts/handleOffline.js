module.exports.handleOffline = () => {
    const { playerDatabase } = require("./databaseManager")
    const { wipePresence } = require("./discordManager")
    const { browserWindow } = require("../Index")
    const { log } = require("./logger")
    const path = require("path")

    browserWindow.setAutoHideMenuBar(true)
    browserWindow.loadFile(path.join("HTML", "Offline.html"))

    wipePresence()
    playerDatabase.set("state", "0")
    playerDatabase.delete("lastSongColorChanged")

    log(`handleOffline: Redirected to Offline.html`)
}

module.exports.reloadUnsuccessful = () => {
    const { browserWindow } = require("../Index")
    
    browserWindow.loadFile(path.join("HTML", "ReloadUnsuccessful.html"))
}