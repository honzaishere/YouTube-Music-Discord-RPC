const {get, set} = require("../../../scripts/database/PluginManager");

module.exports = () => {
    if (get("gamer-mode") === false) {
        set("gamer-mode", true)
    }
    if (get("gamer-mode") === true) {
        set("gamer-mode", false)
    }
}