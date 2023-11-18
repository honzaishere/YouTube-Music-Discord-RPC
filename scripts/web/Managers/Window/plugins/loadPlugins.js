module.exports = (window) => {
    const {get} = require("../../../../database/PluginManager");
    const color_changer = require("../../../../../plugins/color-changer/Plugin");
    const discord_rpc = require("../../../../../plugins/discord-rpc/Plugin");
    const downloader = require("../../../../../plugins/downloader/Plugin");
    const adblocker = require("../../../../../plugins/adblocker/Plugin");
    const bypass_premium_restrictions = require("../../../../../plugins/bypass-premium-restrictions/Plugin");

    // Do not inject until we get the actual YouTube Music page.
    if (window.webContents.getURL().includes("https://music.youtube.com/")) {
        window.webContents.executeJavaScript("ytcfg.data_.IS_SUBSCRIBER").then(isPremium => {
            if (isPremium) {
                const store = require("electron-store")
                const s = new store()
                s.set("app.premium-user", true)
                if (get("show-premium-tag") === true) {
                    window.webContents.on("page-title-updated", () => {
                        window.setTitle(window.getTitle().replace("YouTube Music", "YouTube Music Premium"))
                    })
                }

                if (get("color-changer") === true) color_changer.enable(window);
                if (get("discord-rpc") === true) discord_rpc.enable(window);
                downloader.enable(window);
                return
            }
            if (!isPremium) {
                const store = require("electron-store")
                const s = new store()
                s.set("app.premium-user", false)
                window.setTitle("YouTube Music")
                window.webContents.on("page-title-updated", () => {
                    window.setTitle("YouTube Music")
                })

                if (get("adblocker") === true) adblocker.enable(window);
                if (get("disable-premium-upgrade") === true || get("disable-miniplayer") === true) bypass_premium_restrictions.enable(window);
                if (get("color-changer") === true) color_changer.enable(window);
                if (get("discord-rpc") === true) discord_rpc.enable(window);
                downloader.enable(window);
            }
        })
    }
}