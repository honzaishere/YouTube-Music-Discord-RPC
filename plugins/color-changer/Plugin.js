const {clearColors} = require("./functions/clearColors")

module.exports = {
    handle: (setting) => {
        const PluginSetting = require("./handlers/" + setting)
        PluginSetting()
    },
    preload: () => {},
    enable: () => {},
    disable: () => {
        clearColors()
    }
}