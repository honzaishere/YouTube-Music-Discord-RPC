const {get, set} = require("../../../scripts/database/PluginManager");

module.exports = () => {
    if (get("disable-yt-sans") === true) {
        set("disable-yt-sans", false)
    } else {
        set("disable-yt-sans", true)
    }
}