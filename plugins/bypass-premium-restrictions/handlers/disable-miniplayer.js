const {get, set} = require("../../../scripts/database/PluginManager");
const {browserWindow} = require("../../../Index");

const enableMiniplayer = require("../functions/enableMiniplayer")
const disableMiniplayer = require("../functions/disableMiniplayer")

module.exports = () => {
    if (get("disable-miniplayer") === true) {
        set("disable-miniplayer", false)
        disableMiniplayer(browserWindow)
        return
    }
    if (get("disable-miniplayer") === false) {
        set("disable-miniplayer", true)
        enableMiniplayer(browserWindow)
    }
}