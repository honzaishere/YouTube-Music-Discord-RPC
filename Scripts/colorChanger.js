const { settingsDatabase, songInfoDatabase, playerDatabase } = require("./databaseManager")

module.exports.changeColors = (window) => {
    if (!settingsDatabase.get("ColorChanger") || !settingsDatabase.get("ColorChanger") == true) return
    if (playerDatabase.get("lastSongColorChanged") == songInfoDatabase.get("videoId")) return

    const getPixels = require("get-pixels")

    getPixels(`https://img.youtube.com/vi/${songInfoDatabase.get("videoId")}/maxresdefault.jpg`, (err, pixels) => {
        const array = []
        array.push(pixels.data[0])
        array.push(pixels.data[1])
        array.push(pixels.data[2])

        const chroma = require("chroma-js")
        const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()

        window.webContents.insertCSS(`body {background-color:${darkerColor} !important}`)
        window.webContents.insertCSS(`html {--ytmusic-brand-background-solid:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;--ytmusic-general-background-c:${darkerColor} !important}`)
        window.webContents.insertCSS(`ytmusic-tabs.stuck { background-color:${darkerColor} !important;}`)
        window.webContents.insertCSS(`ytmusic-dialog {background-color: ${darkerColor} !important;border: 2px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;border-radius: 25px !important;}`)
        window.webContents.insertCSS(`.category-menu-item.iron-selected.ytmusic-settings-page { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important }`)
        window.webContents.insertCSS(`.category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important }`)
        window.webContents.insertCSS(`ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important }`)
        window.webContents.insertCSS(`ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:rgb(${array[0]}, ${array[1]}, ${array[2]}, 96) !important}`)
    })
    playerDatabase.set("lastSongColorChanged", songInfoDatabase.get("videoId"))
}

module.exports.changeColorsForPrivateSong = (window) => {
    if (!settingsDatabase.get("ColorChanger") || !settingsDatabase.get("ColorChanger") == true) return
    if (playerDatabase.get("lastSongColorChanged") == songInfoDatabase.get("videoId")) return

    const getPixels = require("get-pixels")

    getPixels(songInfoDatabase.get("thumbnail"), (err, pixels) => {
        const array = []
        array.push(pixels.data[0])
        array.push(pixels.data[1])
        array.push(pixels.data[2])

        const chroma = require("chroma-js")
        const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()

        window.webContents.insertCSS(`body {background-color:${darkerColor} !important}`)
        window.webContents.insertCSS(`html {--ytmusic-brand-background-solid:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;--ytmusic-general-background-c:${darkerColor} !important}`)
        window.webContents.insertCSS(`ytmusic-tabs.stuck { background-color:${darkerColor} !important;}`)
        window.webContents.insertCSS(`ytmusic-dialog {background-color: ${darkerColor} !important;border: 2px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;border-radius: 25px !important;}`)
        window.webContents.insertCSS(`.category-menu-item.iron-selected.ytmusic-settings-page { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important }`)
        window.webContents.insertCSS(`.category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important }`)
        window.webContents.insertCSS(`ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid rgb(${array[0]}, ${array[1]}, ${array[2]}) !important }`)
        window.webContents.insertCSS(`ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:rgb(${array[0]}, ${array[1]}, ${array[2]}, 96) !important}`)
    })
    playerDatabase.set("lastSongColorChanged", songInfoDatabase.get("videoId"))
}

module.exports.wipeColorsMusicVideo = (window) => {
    window.webContents.insertCSS(`body {background-color:#030303 !important}`)
    window.webContents.insertCSS(`html {--ytmusic-brand-background-solid: var(--ytmusic-color-black1) !important;--ytmusic-general-background-c: var(--ytmusic-color-black4) !important}`)
    window.webContents.insertCSS(`ytmusic-tabs.stuck { background-color:#030303 !important;}`)
    window.webContents.insertCSS(`.av-toggle.ytmusic-av-toggle {background-color:var(--ytmusic-color-black1) !important}`)
    window.webContents.insertCSS(`ytmusic-dialog {background-color: #333 !important;border: 2px solid transparent !important;border-radius: 25px !important;}`)
    window.webContents.insertCSS(`.category-menu-item.iron-selected.ytmusic-settings-page { background: #4e4e4e !important}`)
    window.webContents.insertCSS(`.category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#4e4e4e !important }`)
    window.webContents.insertCSS(`ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #4e4e4e !important }`)
    playerDatabase.set("lastSongColorChanged", songInfoDatabase.get("videoId"))
}

module.exports.wipeColors = (window) => {
    window.webContents.insertCSS(`body {background-color:#030303 !important}`)
    window.webContents.insertCSS(`html {--ytmusic-brand-background-solid: var(--ytmusic-color-black1) !important;--ytmusic-general-background-c: var(--ytmusic-color-black4) !important}`)
    window.webContents.insertCSS(`ytmusic-tabs.stuck { background-color:#030303 !important;}`)
    window.webContents.insertCSS(`.av-toggle.ytmusic-av-toggle {background-color:var(--ytmusic-color-black1) !important}`)
    window.webContents.insertCSS(`ytmusic-dialog {background-color: #333 !important;border: 2px solid transparent !important;border-radius: 25px !important;}`)
    window.webContents.insertCSS(`.category-menu-item.iron-selected.ytmusic-settings-page { background: #4e4e4e !important}`)
    window.webContents.insertCSS(`.category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#4e4e4e !important }`)
    window.webContents.insertCSS(`ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #4e4e4e !important }`)
    playerDatabase.delete("lastSongColorChanged")
}