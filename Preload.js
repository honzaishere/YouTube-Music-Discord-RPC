const { ipcRenderer } = require("electron");
const { waitForSettingsOpen } = require("./HTML/Settings/waitForSettingsOpen");
const { insertTitlebar } = require("./HTML/Titlebar/insertTitlebar");
const { log } = require("./Scripts/logger");

// Preload our adblocker script
require("@cliqz/adblocker-electron-preload/dist/preload.cjs");

setInterval(() => {
    // Removing "Select favorite artists to improve recommendations"
    if (document.querySelector("#contents > ytmusic-tastebuilder-shelf-renderer")) {
        document.querySelector("#contents > ytmusic-tastebuilder-shelf-renderer").remove()
    }

    // Showing "Playback Speed" button
    if (document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer")) {
        document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").hidden = false
    }
}, 1000)

window.onplay = () => {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: "YouTube Music",
        artwork: [
            { src: "https://raw.githubusercontent.com/iwillfightfordream/YouTube-Music/main/Icons/Icon.ico" }
        ]
    })
    navigator.mediaSession.playbackState = "playing"
}

document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("page-content-loaded")
})

window.addEventListener("hashchange", () => {
    ipcRenderer.send("navigation")
})

ipcRenderer.send("preload-loaded")