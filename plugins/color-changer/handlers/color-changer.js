const {get, set} = require("../../../scripts/database/PluginManager");

module.exports = () => {
    if (get("color-changer") === false) {
        set("color-changer", true)
        const {updateColors} = require("../functions/updateColors");
        updateColors()
        return
    }
    if (get("color-changer") === true) {
        set("color-changer", false)
        const {clearColors} = require("../functions/clearColors")
        clearColors()
    }
}