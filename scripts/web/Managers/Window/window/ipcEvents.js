const { loadIpcEvents } = require("./ipcEvents/ipcEventManager")

module.exports.loadIpcEvents = (ipcMain, window) => { loadIpcEvents(ipcMain, window) }