const {get, set} = require("../../../scripts/database/PluginManager");
const {updatePresence} = require("../Plugin");

module.exports = () => {
    if (get("discord-show-time") === false) {
        set("discord-show-time", true)
        updatePresence()
        return
    }
    if (get("discord-show-time") === true) {
        set("discord-show-time", false)
        updatePresence()
    }
}