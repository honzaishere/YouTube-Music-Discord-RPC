const {set, get} = require("../../../scripts/database/PluginManager");

module.exports = () => {
    if (get("close-background") === true) {
        set("close-background", false)
    } else {
        set("close-background", true)
    }
}