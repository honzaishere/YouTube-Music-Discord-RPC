module.exports = (window) => {
    const adblocker = require("../../../../../plugins/adblocker/Plugin");
    const bypass_premium_restrictions = require("../../../../../plugins/bypass-premium-restrictions/Plugin");
    const color_changer = require("../../../../../plugins/color-changer/Plugin");
    const discord_rpc = require("../../../../../plugins/discord-rpc/Plugin");
    const downloader = require("../../../../../plugins/downloader/Plugin");

    const {get} = require("../../../../database/PluginManager");

    if (get("adblocker") === true) adblocker.preload(window);
    if (get("bypass-premium-restrictions") === true) bypass_premium_restrictions.preload(window);
    if (get("color-changer") === true) color_changer.preload(window);
    if (get("discord-rpc") === true) discord_rpc.preload(window);
    downloader.preload(window);
}