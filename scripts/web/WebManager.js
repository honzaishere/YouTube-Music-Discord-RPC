const {get} = require("../database/PluginManager");
const electron = require("electron");
const PluginsMenuJS = require("./JS/PluginsMenuJS");
const adblocker = require("../../plugins/adblocker/Plugin");
const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin");
const color_changer = require("../../plugins/color-changer/Plugin");
const discord_rpc = require("../../plugins/discord-rpc/Plugin");
const downloader = require("../../plugins/downloader/Plugin");
const gaming_mode = require("../../plugins/gaming-mode/Plugin");
const ColorChangerCSS = require("./CSS/ColorChangerCSS");
const HomepageCSS = require("./CSS/HomepageCSS");
const PlayerCSS = require("./CSS/PlayerCSS");
const PlaylistsCSS = require("./CSS/PlaylistsCSS");
const PluginsMenuCSS = require("./CSS/PluginsMenuCSS");
const WhiteColorCSS = require("./CSS/WhiteColorCSS");
const YouTubeSansCSS = require("./CSS/YouTubeSansCSS");
const GamerModeCSS = require("./CSS/GamerModeCSS");

let menu = []

module.exports.finishWebLoad = (window) => {
    // Do not inject until we get the actual YouTube Music page.
    if(!window.webContents.getURL().includes("https://music.youtube.com/")) {
        const ConsentCSS = require("./CSS/ConsentCSS")
        ConsentCSS.load(window); console.log(`[ConsentCSS] Enabled`)
    }

    // Do not inject until we get the actual YouTube Music page.
    if(window.webContents.getURL().includes("https://music.youtube.com")) {
        const ColorChangerCSS = require("./CSS/ColorChangerCSS")
        const HomepageCSS = require("./CSS/HomepageCSS")
        const PlayerCSS = require("./CSS/PlayerCSS")
        const PlaylistsCSS = require("./CSS/PlaylistsCSS")
        const PluginsMenuCSS = require("./CSS/PluginsMenuCSS")
        const WhiteColorCSS = require("./CSS/WhiteColorCSS")
        const YouTubeSansCSS = require("./CSS/YouTubeSansCSS")
        const GamerModeCSS = require("./CSS/GamerModeCSS")
        const PluginsMenuJS = require("./JS/PluginsMenuJS")

        ColorChangerCSS.load(window); console.log(`[ColorChangerCSS] Enabled`)
        HomepageCSS.load(window); console.log(`[HomepageCSS] Enabled`)
        PlayerCSS.load(window); console.log(`[PlayerCSS] Enabled`)
        PlaylistsCSS.load(window); console.log(`[PlaylistsCSS] Enabled`)
        PluginsMenuCSS.load(window); console.log(`[PluginsMenuCSS] Enabled`)
        WhiteColorCSS.load(window); console.log(`[WhiteColorCSS] Enabled`)
        YouTubeSansCSS.load(window); console.log(`[YouTubeSansCSS] Enabled`)
        GamerModeCSS.load(window); console.log(`[GamerModeCSS] Enabled`)
        PluginsMenuJS.load(window); console.log(`[PluginsMenuJS] Enabled`)

        this.loadPlugins(window)
    }
}

module.exports.injectMenu = (window) => {
    const adblocker = require("../../plugins/adblocker/Plugin")
    const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin")
    const color_changer = require("../../plugins/color-changer/Plugin")
    const discord_rpc = require("../../plugins/discord-rpc/Plugin")
    const downloader = require("../../plugins/downloader/Plugin")
    const gaming_mode = require("../../plugins/gaming-mode/Plugin")
    function push(pl) {
        menu.push({
            label: pl.plugin.name,
            submenu: pl.plugin.options
        })
    }

    push(adblocker)
    push(bypass_premium_restrictions)
    push(color_changer)
    push(discord_rpc)
    push(downloader)
    push(gaming_mode)

    this.setApplicationMenu(window)
}

module.exports.loadPlugins = (window) => {
    const adblocker = require("../../plugins/adblocker/Plugin")
    const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin")
    const color_changer = require("../../plugins/color-changer/Plugin")
    const discord_rpc = require("../../plugins/discord-rpc/Plugin")
    const downloader = require("../../plugins/downloader/Plugin")

    if(get("adblocker") === true) adblocker.enable(window); console.log(`[adblocker] Enabled`)

    // Do not inject until we get the actual YouTube Music page.
    if(window.webContents.getURL().includes("https://music.youtube.com/")) {
        if (get("disable-premium-upgrade") === true || get("disable-miniplayer") === true) bypass_premium_restrictions.enable(window); console.log(`[bypass-premium-restrictions] Enabled`)
        if (get("color-changer") === true) color_changer.enable(window); console.log(`[color-changer] Enabled`)
        if (get("discord-rpc") === true) discord_rpc.enable(window); console.log(`[discord-rpc] Enabled`)
        downloader.enable(window); console.log(`[downloader] Enabled`)
    }
}

module.exports.preloadPlugins = (window) => {
    const adblocker = require("../../plugins/adblocker/Plugin")
    const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin")
    const color_changer = require("../../plugins/color-changer/Plugin")
    const discord_rpc = require("../../plugins/discord-rpc/Plugin")
    const downloader = require("../../plugins/downloader/Plugin")

    if(get("adblocker") === true) adblocker.preload(window); console.log(`[adblocker] Preloaded`)
    if(get("bypass-premium-restrictions") === true) bypass_premium_restrictions.preload(window); console.log(`[bypass-premium-restrictions] Preloaded`)
    if(get("color-changer") === true) color_changer.preload(window); console.log(`[color-changer] Preloaded`)
    if(get("discord-rpc") === true) discord_rpc.preload(window); console.log(`[discord-rpc] Preloaded`)
    downloader.preload(window); console.log(`[downloader] Preloaded`)
}

module.exports.setApplicationMenu = (window) => {
    const actualMenu = electron.Menu.buildFromTemplate(
        [
            {
                label: "Plugins",
                submenu: menu
            }
        ]
    )
    electron.Menu.setApplicationMenu(actualMenu)
    console.log(`[Window] Application menu set`)
}