const loadAdblocker = require("./functions/load")
const {get} = require("../../scripts/database/PluginManager");

module.exports = {
    handle: (setting) => {
        const PluginSetting = require("./handlers/" + setting)
        PluginSetting()
    },
    enable: (window) => {
        loadAdblocker(window)
    },
    disable: () => {},
    preload: (window) => {
        if(get("adblocker") === true) loadAdblocker(window)
    }
}