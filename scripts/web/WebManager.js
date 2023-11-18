const {injectConsentStyles, injectAllStyles} = require("./Managers/Window/cssManager");
const {executeAllScripts} = require("./Managers/Window/jsManager");
const {loadPlugins} = require("./Managers/Window/pluginManager");
const {loadEvents} = require("./Managers/Window/window/events");
const {loadIpcEvents} = require("./Managers/Window/window/ipcEvents");
const {ipcMain} = require("electron");

module.exports.finishWebLoad = (window) => {
    // Do not inject until we get the actual YouTube Music page.
    if (!window.webContents.getURL().includes("https://music.youtube.com/")) {
        injectConsentStyles(window)
    }

    // Inject when we get the actual YouTube Music page.
    if (window.webContents.getURL().includes("https://music.youtube.com")) {
        injectAllStyles(window)
        executeAllScripts(window)

        loadPlugins(window)
    }

    loadIpcEvents(ipcMain, window)
    loadEvents(window)
}

module.exports.redoFinishWebLoad = (window) => {
    // Do not inject until we get the actual YouTube Music page.
    if (!window.webContents.getURL().includes("https://music.youtube.com/")) {
        injectConsentStyles(window)
    }

    // Inject when we get the actual YouTube Music page.
    if (window.webContents.getURL().includes("https://music.youtube.com")) {
        injectAllStyles(window)
        executeAllScripts(window)

        loadPlugins(window)
    }
}