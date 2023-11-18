const {get, set} = require("../../../scripts/database/PluginManager");
const {browserWindow} = require("../../../Index");

const disablePremium = require("../functions/disablePremium")
const enablePremium = require("../functions/enablePremium")

module.exports = () => {
    if (get("disable-premium-upgrade") === true) {
        set("disable-premium-upgrade", false)
        disablePremium(browserWindow)
        return
    }
    if (get("disable-premium-upgrade") === false) {
        set("disable-premium-upgrade", true)
        enablePremium(browserWindow)
    }
}