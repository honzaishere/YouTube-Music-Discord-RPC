const {get, set} = require("../../../scripts/database/PluginManager");
const {updatePresence} = require("../Plugin");

module.exports = () => {
    if (get("discord-show-playback") === false) {
        set("discord-show-playback", true)
        updatePresence()
        return
    }
    if (get("discord-show-playback") === true) {
        set("discord-show-playback", false)
        updatePresence()
    }
}