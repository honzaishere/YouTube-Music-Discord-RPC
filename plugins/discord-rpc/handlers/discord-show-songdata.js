const {get, set} = require("../../../scripts/database/PluginManager");
const {updatePresence} = require("../Plugin");

module.exports = () => {
    if (get("discord-show-songdata") === false) {
        set("discord-show-songdata", true)
        updatePresence()
        return
    }
    if (get("discord-show-songdata") === true) {
        set("discord-show-songdata", false)
        updatePresence()
    }
}