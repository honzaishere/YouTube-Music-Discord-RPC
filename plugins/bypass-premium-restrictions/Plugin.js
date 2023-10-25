const {get, set} = require("../../scripts/database/PluginManager")
const electron = require("electron");
const {browserWindow} = require("../../Index");

module.exports.plugin = {
    name: "Bypass Premium Restrictions",
}

module.exports.handle = (p) => {
    const {browserWindow} = require("../../Index")
    if (p === "disable-miniplayer") {
        if (get("disable-miniplayer") === true) {
            set("disable-miniplayer", false)
            this.disableMiniplayer(browserWindow)
            return
        }
        if (get("disable-miniplayer") === false) {
            set("disable-miniplayer", true)
            this.enableMiniplayer(browserWindow)
            return
        }
    }
    if (p === "disable-premium-upgrade") {
        if (get("disable-premium-upgrade") === true) {
            set("disable-premium-upgrade", false)
            this.disablePremium(browserWindow)
            return
        }
        if (get("disable-premium-upgrade") === false) {
            set("disable-premium-upgrade", true)
            this.enablePremium(browserWindow)
        }
    }
}

module.exports.preload = () => {
    return
}

module.exports.enable = (window) => {
    if (get("disable-miniplayer") === true) {
        this.enableMiniplayer(window)
    }
    if (get("disable-premium-upgrade") === true) {
        this.enablePremium(window)
    }
}

module.exports.enableMiniplayer = (window) => {
    const code = [
        "document.querySelector('#player').removeAttribute('mini-player-required')",
        "",
        "document.querySelector('#player > div.song-media-controls.style-scope.ytmusic-player > div > tp-yt-paper-icon-button.player-close-button.style-scope.ytmusic-player').onclick = () => {",
        "document.querySelector('#player').removeAttribute('player-ui-state')",
        "};0"
    ].join("\n")

    console.log(`[Miniplayer] Applied JS`)
    window.webContents.executeJavaScript(code)
}

module.exports.disableMiniplayer = (window) => {
    const code = [
        "document.querySelector('#player').setAttribute('mini-player-required', '')",
        "",
        "document.querySelector('#player').setAttribute('player-ui-state', 'MINIPLAYER')",
        "document.querySelector('#player > div.song-media-controls.style-scope.ytmusic-player > div > tp-yt-paper-icon-button.player-close-button.style-scope.ytmusic-player').onclick = () => {",
        "return",
        "};0"
    ].join("\n")

    console.log(`[Miniplayer] Applied JS to disable`)
    window.webContents.executeJavaScript(code)
}

module.exports.enablePremium = (window) => {
    const code = [
        "if(!document.querySelector(\"#items > ytmusic-guide-entry-renderer:nth-child(4) > tp-yt-paper-item\")) {\n",
        "    ipcRenderer.send(\"premium\")\n",
        "}",
        "document.querySelector(\"#items > ytmusic-guide-entry-renderer:nth-child(4) > tp-yt-paper-item\").setAttribute('hidden', '')",
        "document.querySelector(\"#mini-guide-renderer > #sections > ytmusic-guide-section-renderer > #items > ytmusic-guide-entry-renderer:nth-child(4) > tp-yt-paper-item\").setAttribute('hidden', '')",
        "document.querySelector(\"#right-content > ytmusic-settings-button\").onclick = () => {",
        "if(document.querySelector(\"#items > ytd-compact-link-renderer:nth-child(2) > a\").href === 'https://music.youtube.com/music_premium') {",
        "document.querySelector(\"#items > ytd-compact-link-renderer:nth-child(2)\").setAttribute('hidden', '')",
        "}",
        "};0"
    ].join("\n")

    console.log(`[Premium] Removed all Upgrade elements`)
    window.webContents.executeJavaScript(code)
}

module.exports.disablePremium = (window) => {
    const code = [
        "document.querySelector(\"#items > ytmusic-guide-entry-renderer:nth-child(4) > tp-yt-paper-item\").removeAttribute('hidden')",
        "document.querySelector(\"#right-content > ytmusic-settings-button\").onclick = () => {",
        "if(document.querySelector(\"#items > ytd-compact-link-renderer:nth-child(2) > a\").href === 'https://music.youtube.com/music_premium') {",
        "document.querySelector(\"#items > ytd-compact-link-renderer:nth-child(2)\").removeAttribute('hidden')",
        "document.querySelector(\"#mini-guide-renderer > #sections > ytmusic-guide-section-renderer > #items > ytmusic-guide-entry-renderer:nth-child(4) > tp-yt-paper-item\").removeAttribute('hidden')",
        "}",
        "};0"
    ].join("\n")

    console.log(`[Premium] Added all Upgrade elements`)
    window.webContents.executeJavaScript(code)
}