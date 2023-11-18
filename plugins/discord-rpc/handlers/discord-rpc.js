const {get, set} = require("../../../scripts/database/PluginManager");
const {enable, disable} = require("../Plugin")

module.exports = () => {
    if (get("discord-rpc") === false) {
        set("discord-rpc", true)
        const {browserWindow} = require("../../../Index");
        enable(browserWindow)
        return
    }
    if (get("discord-rpc") === true) {
        set("discord-rpc", false)
        disable()
    }
}