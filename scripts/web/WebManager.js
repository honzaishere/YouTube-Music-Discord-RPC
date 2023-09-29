const fs = require("fs")
const {get} = require("../database/PluginManager");
const electron = require("electron");
const adblocker = require("../../plugins/adblocker/Plugin");
const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin");
const color_changer = require("../../plugins/color-changer/Plugin");
const discord_rpc = require("../../plugins/discord-rpc/Plugin");
const downloader = require("../../plugins/downloader/Plugin");

let menu = []

module.exports.finishWebLoad = (window) => {
    const ColorChangerCSS = require("./CSS/ColorChangerCSS")
    const HomepageCSS = require("./CSS/HomepageCSS")
    const PlayerCSS = require("./CSS/PlayerCSS")
    const PlaylistsCSS = require("./CSS/PlaylistsCSS")
    const WhiteColorCSS = require("./CSS/WhiteColorCSS")
    const YouTubeSansCSS = require("./CSS/YouTubeSansCSS")

    ColorChangerCSS.load(window)
    HomepageCSS.load(window)
    PlayerCSS.load(window)
    PlaylistsCSS.load(window)
    WhiteColorCSS.load(window)
    YouTubeSansCSS.load(window)
}

module.exports.loadPlugins = (window) => {
    const adblocker = require("../../plugins/adblocker/Plugin")
    const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin")
    const color_changer = require("../../plugins/color-changer/Plugin")
    const discord_rpc = require("../../plugins/discord-rpc/Plugin")
    const downloader = require("../../plugins/downloader/Plugin")

    if(get("adblocker") === true) { adblocker.enable(window) }
    if(get("bypass-premium-restrictions") === true) { bypass_premium_restrictions.enable(window) }
    if(get("color-changer") === true) color_changer.enable(window)
    if(get("discord-rpc") === true) discord_rpc.enable(window)
    downloader.enable(window)

    menu.push({
        label: adblocker.plugin.name,
        type: "submenu",
        submenu: adblocker.plugin.options
    })
    menu.push({
        label: bypass_premium_restrictions.plugin.name,
        type: "submenu",
        submenu: bypass_premium_restrictions.plugin.options
    })
    menu.push({
        label: color_changer.plugin.name,
        type: "submenu",
        submenu: color_changer.plugin.options
    })
    menu.push({
        label: discord_rpc.plugin.name,
        type: "submenu",
        submenu: discord_rpc.plugin.options
    })
    menu.push({
        label: downloader.plugin.name,
        type: "submenu",
        submenu: downloader.plugin.options
    })

    this.setApplicationMenu(window)
}

module.exports.preloadPlugins = (window) => {
    const adblocker = require("../../plugins/adblocker/Plugin")
    const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin")
    const color_changer = require("../../plugins/color-changer/Plugin")
    const discord_rpc = require("../../plugins/discord-rpc/Plugin")
    const downloader = require("../../plugins/downloader/Plugin")

    if(get("adblocker") === true) { adblocker.preload(window) }
    if(get("bypass-premium-restrictions") === true) { bypass_premium_restrictions.preload(window) }
    if(get("color-changer") === true) color_changer.preload(window)
    if(get("discord-rpc") === true) discord_rpc.preload(window)
    downloader.preload(window)
}

module.exports.setApplicationMenu = (window) => {
    const actualMenu = electron.Menu.buildFromTemplate(
        [
            {
                label: "Plugins",
                submenu: menu
            },
            {
                label: "Dev Tools",
                accelerator: "Ctrl+Shift+I",
                click: () => {
                    window.webContents.openDevTools({ mode: "detach" })
                }
            }
        ]
    )
    electron.Menu.setApplicationMenu(actualMenu)
    console.log(`[Window] Application menu set`)
}