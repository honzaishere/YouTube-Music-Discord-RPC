const {get} = require("../../scripts/database/PluginManager")
const enableMiniplayer = require("./functions/enableMiniplayer")
const enablePremium = require("./functions/enablePremium")

module.exports = {
    handle: (setting) => {
        const PluginSetting = require("./handlers/" + setting)
        PluginSetting()
    },
    preload: () => {},
    enable: () => {
        if (get("disable-miniplayer") === true) {
            const { browserWindow } = require("../../Index")
            enableMiniplayer(browserWindow)
        }
        if (get("disable-premium-upgrade") === true) {
            const { browserWindow } = require("../../Index")
            enablePremium(browserWindow)
        }
    }
}