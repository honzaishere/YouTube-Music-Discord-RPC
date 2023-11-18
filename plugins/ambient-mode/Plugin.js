module.exports = {
    handle: (setting) => {
        const PluginSetting = require("./handlers/" + setting)
        PluginSetting.handle()
    },
    preload: () => {},
    enable: () => {},
    disable: () => {}
}