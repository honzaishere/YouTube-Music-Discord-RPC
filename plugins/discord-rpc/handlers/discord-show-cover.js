const {get, set} = require("../../../scripts/database/PluginManager");
const {updatePresence} = require("../Plugin");

module.exports = () => {
    if (get("discord-show-cover") === false) {
        set("discord-show-cover", true)
        updatePresence()
        return
    }
    if (get("discord-show-cover") === true) {
        set("discord-show-cover", false)
        updatePresence()
    }
}