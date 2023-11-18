const {set, get} = require("../../../scripts/database/PluginManager");
const {addTray, destroyTray} = require("../../../scripts/web/Managers/Window/windowManager")
module.exports = () => {
    if (get("disable-tray") === true) {
        set("disable-tray", false)
        addTray(window)
    } else {
        set("disable-tray", true)
        destroyTray()
    }
}