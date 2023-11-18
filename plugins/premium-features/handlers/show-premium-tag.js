const {get, set} = require("../../../scripts/database/PluginManager");

module.exports = () => {
    if (get("show-premium-tag") === false) {
        set("show-premium-tag", true)
    }
    if (get("show-premium-tag") === true) {
        set("show-premium-tag", false)
    }
}