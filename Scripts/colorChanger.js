const { settingsDatabase, songInfoDatabase, playerDatabase } = require("./databaseManager")
const { log } = require("./logger")

module.exports.changeColors = (window, launchedNow) => {
    if (!settingsDatabase.get("ColorChanger") || !settingsDatabase.get("ColorChanger") == true) return
    if (playerDatabase.get("lastSongColorChanged") == songInfoDatabase.get("videoId")) return

    const getPixels = require("get-pixels")

    getPixels(`https://img.youtube.com/vi/${songInfoDatabase.get("videoId")}/maxresdefault.jpg`, async (err, pixels) => {
        if(err) return
        const array = []
        array.push(pixels.data[0])
        array.push(pixels.data[1])
        array.push(pixels.data[2])

        const chroma = require("chroma-js")
        const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()

        window.webContents.insertCSS(`body {background-color:${darkerColor} !important} html {--ytmusic-brand-background-solid:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;--ytmusic-general-background-c:${darkerColor} !important} ytmusic-tabs.stuck { background-color:${darkerColor} !important;} ytmusic-dialog {background-color: ${darkerColor} !important;border: 2px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;border-radius: 25px !important;} .category-menu-item.iron-selected.ytmusic-settings-page { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important } .category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important } ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important } ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:rgb(${array[0]}, ${array[1]}, ${array[2]}, 96) !important} yt-confirm-dialog-renderer[dialog][dialog][dialog] {background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;} tp-yt-paper-toast {background-color:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;} tp-yt-paper-dialog {background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important} ytmusic-nerd-stats { background-color: rgb(${array[0]}, ${array[1]}, ${array[2]}) !important}`)
        log(`colorChanger: CSS inserted for Audio track`)
    })
    playerDatabase.set("lastSongColorChanged", songInfoDatabase.get("videoId"))
    log(`colorChanger: Color picked from song https://music.youtube.com/watch?v=${songInfoDatabase.get("videoId")}/`)

    if (launchedNow == true) {
        if (!window.isVisible()) {
            window.show()
        }
    }
}

module.exports.changeColorsForPrivateSong = (window, launchedNow) => {
    if (!settingsDatabase.get("ColorChanger") || !settingsDatabase.get("ColorChanger") == true) return
    if (playerDatabase.get("lastSongColorChanged") == songInfoDatabase.get("videoId")) return

    const getPixels = require("get-pixels")
    const hexToHSL = require("hex-to-hsl")

    getPixels(songInfoDatabase.get("thumbnail"), (err, pixels) => {
        if(err) return
        const array = []
        array.push(pixels.data[0])
        array.push(pixels.data[1])
        array.push(pixels.data[2])

        const chroma = require("chroma-js")
        const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()

        const hexColor = chroma(array[0], array[1], array[2]).hex()
        const HSL = hexToHSL(hexColor)
        if (HSL[1] < 60 && HSL[2] > 67) {
            window.webContents.insertCSS(`body {background-color:#030303 !important} html {--ytmusic-brand-background-solid: rgb(12, 12, 12) !important;--ytmusic-general-background-c: #000000 !important;} ytmusic-tabs.stuck { background-color:#030303 !important;} ytmusic-dialog {background-color: #333 !important;border: 2px solid transparent !important;border-radius: 25px !important;} .category-menu-item.iron-selected.ytmusic-settings-page { background: #4e4e4e !important} .category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#4e4e4e !important } ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #4e4e4e !important } yt-confirm-dialog-renderer[dialog][dialog][dialog] {background:#4e4e4e !important;} tp-yt-paper-toast {background-color:#4e4e4e !important;} tp-yt-paper-dialog {background:var(--paper-dialog-background-color, var(--primary-background-color)) !important} ytmusic-nerd-stats { background-color: #4e4e4e !important}`)
            playerDatabase.set("lastSongColorChanged", songInfoDatabase.get("videoId"))
            log(`colorChanger: Color picked from private song https://music.youtube.com/watch?v=${songInfoDatabase.get("videoId")}/`)
            return
        }

        window.webContents.insertCSS(`body {background-color:${darkerColor} !important} html {--ytmusic-brand-background-solid:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;--ytmusic-general-background-c:${darkerColor} !important} ytmusic-tabs.stuck { background-color:${darkerColor} !important;} ytmusic-dialog {background-color: ${darkerColor} !important;border: 2px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;border-radius: 25px !important;} .category-menu-item.iron-selected.ytmusic-settings-page { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important } .category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important } ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important } ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:rgb(${array[0]}, ${array[1]}, ${array[2]}, 96) !important} yt-confirm-dialog-renderer[dialog][dialog][dialog] {background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;} tp-yt-paper-toast {background-color:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;} tp-yt-paper-dialog {background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important} ytmusic-nerd-stats { background-color: rgb(${array[0]}, ${array[1]}, ${array[2]}) !important}`)
        log(`colorChanger: CSS inserted for Private Audio track`)
    })
    playerDatabase.set("lastSongColorChanged", songInfoDatabase.get("videoId"))
    log(`colorChanger: Color picked from private song https://music.youtube.com/watch?v=${songInfoDatabase.get("videoId")}/`)

    if (launchedNow == true) {
        if (!window.isVisible()) {
            window.show()
        }
    }
}

module.exports.wipeColorsMusicVideo = (window, launchedNow) => {
    if (playerDatabase.get("lastSongColorChanged") == songInfoDatabase.get("videoId")) return
    window.webContents.insertCSS(`body {background-color:#000000 !important} html {--ytmusic-brand-background-solid: rgb(12, 12, 12) !important;--ytmusic-general-background-c: #000000 !important;} ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:rgb(12, 12, 12, 96) !important} ytmusic-tabs.stuck { background-color:#000000 !important;} ytmusic-dialog {background-color: #000000 !important;border: 2px solid transparent !important;border-radius: 25px !important;} .category-menu-item.iron-selected.ytmusic-settings-page { background: #000000 !important} .category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#000000 !important } ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #000000 !important } ytmusic-nerd-stats { background-color: #000000 !important}`)
    log(`colorChanger: CSS inserted for Video`)
    playerDatabase.set("lastSongColorChanged", songInfoDatabase.get("videoId"))
    log(`colorChanger: Colors wiped because of video https://music.youtube.com/watch?v=${songInfoDatabase.get("videoId")}/`)

    if (launchedNow == true) {
        if (!window.isVisible()) {
            window.show()
        }
    }
}

module.exports.wipeColors = (window) => {
    window.webContents.insertCSS(`body {background-color:#000000 !important} html {--ytmusic-brand-background-solid:#0e0e0e !important;--ytmusic-general-background-c:#000000 !important} ytmusic-tabs.stuck { background-color:#000000 !important;} ytmusic-dialog {background-color: #000000 !important;border: 2px solid #0e0e0e !important;border-radius: 25px !important;} .category-menu-item.iron-selected.ytmusic-settings-page { background:#0e0e0e !important } .category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#0e0e0e !important } ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #0e0e0e !important } ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:#0e0e0e !important} yt-confirm-dialog-renderer[dialog][dialog][dialog] {background:#0e0e0e !important;} tp-yt-paper-toast {background-color:#0e0e0e !important;} tp-yt-paper-dialog {background:#0e0e0e !important} ytmusic-nerd-stats { background-color: #0e0e0e !important}`)
    log(`colorChanger: CSS inserted to wipe colors`)
    playerDatabase.delete("lastSongColorChanged")
    log(`colorChanger: Colors wiped`)
}

module.exports.changeColorsForLastVideo = (window) => {
    const { decideColor } = require("./songInfoManager")
    playerDatabase.delete("lastSongColorChanged")
    decideColor(window, true)
}